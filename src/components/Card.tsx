import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radii, shadows } from '../theme/spacing';

type CardVariant = 'default' | 'elevated' | 'outlined';
type CardPadding = 'none' | 'small' | 'default' | 'large';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function Card({
  children,
  variant = 'default',
  padding = 'default',
  onPress,
  style,
  accessibilityLabel,
}: CardProps) {
  const cardStyles: ViewStyle[] = [
    styles.container,
    styles[`variant_${variant}`],
    styles[`padding_${padding}`],
    style,
  ].filter(Boolean) as ViewStyle[];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyles} accessibilityLabel={accessibilityLabel}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.base,
    overflow: 'hidden',
  },
  variant_default: {
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  variant_elevated: {
    ...shadows.md,
  },
  variant_outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  padding_none: {
    padding: 0,
  },
  padding_small: {
    padding: spacing.sm,
  },
  padding_default: {
    padding: spacing.base,
  },
  padding_large: {
    padding: spacing.xl,
  },
});

