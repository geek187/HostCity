import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radii, shadows } from '../theme/spacing';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Snap points as percentages of screen height
const SNAP_POINTS = {
  peek: 0.15,   // Just showing the handle and a peek
  half: 0.45,   // Half screen
  full: 0.85,   // Almost full screen
};

interface BottomSheetProps {
  children: React.ReactNode;
  initialSnap?: 'peek' | 'half' | 'full';
  style?: ViewStyle;
}

export function BottomSheet({
  children,
  initialSnap = 'peek',
  style,
}: BottomSheetProps) {
  const translateY = React.useRef(
    new Animated.Value(SCREEN_HEIGHT * (1 - SNAP_POINTS[initialSnap]))
  ).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dy) > 5;
        },
        onPanResponderMove: (_, gestureState) => {
          const newY = Math.max(
            SCREEN_HEIGHT * (1 - SNAP_POINTS.full),
            Math.min(
              SCREEN_HEIGHT * (1 - SNAP_POINTS.peek),
              gestureState.dy + translateY._value
            )
          );
          translateY.setValue(newY);
        },
        onPanResponderRelease: (_, gestureState) => {
          const currentY = translateY._value;
          const velocity = gestureState.vy;

          // Determine which snap point to animate to
          let targetSnap: number;
          if (velocity < -0.5) {
            // Fast swipe up
            targetSnap = SCREEN_HEIGHT * (1 - SNAP_POINTS.full);
          } else if (velocity > 0.5) {
            // Fast swipe down
            targetSnap = SCREEN_HEIGHT * (1 - SNAP_POINTS.peek);
          } else {
            // Find closest snap point
            const snapValues = [
              SCREEN_HEIGHT * (1 - SNAP_POINTS.full),
              SCREEN_HEIGHT * (1 - SNAP_POINTS.half),
              SCREEN_HEIGHT * (1 - SNAP_POINTS.peek),
            ];
            targetSnap = snapValues.reduce((prev, curr) =>
              Math.abs(curr - currentY) < Math.abs(prev - currentY)
                ? curr
                : prev
            );
          }

          Animated.spring(translateY, {
            toValue: targetSnap,
            useNativeDriver: true,
            tension: 50,
            friction: 10,
          }).start();
        },
      }),
    [translateY]
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
        style,
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * SNAP_POINTS.full + 50,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    ...shadows.lg,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: radii.full,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.base,
  },
});

