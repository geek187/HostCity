import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, sizing, radii } from '../theme/spacing';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function Chip({
  label,
  selected = false,
  onPress,
  icon,
  disabled = false,
  style,
  accessibilityLabel,
}: ChipProps) {
  const containerStyles: ViewStyle[] = [
    styles.container,
    selected ? styles.containerSelected : styles.containerUnselected,
    disabled && styles.containerDisabled,
    style,
  ].filter(Boolean) as ViewStyle[];

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ selected, disabled }}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelUnselected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// Scrollable chip row component
interface ChipRowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ChipRow({ children, style }: ChipRowProps) {
  return <View style={[styles.row, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: sizing.chipHeight,
    paddingHorizontal: spacing.base,
    borderRadius: radii.full,
    minWidth: sizing.touchTargetSmall,
  },
  containerSelected: {
    backgroundColor: colors.primary,
  },
  containerUnselected: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: spacing.xs,
  },
  label: {
    ...typography.chip,
  },
  labelSelected: {
    color: colors.textInverse,
    fontWeight: '600',
  },
  labelUnselected: {
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});

