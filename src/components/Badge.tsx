import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, radii } from '../theme/spacing';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'small' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = 'default',
  size = 'default',
  icon,
  style,
}: BadgeProps) {
  const containerStyles: ViewStyle[] = [
    styles.container,
    styles[`container_${variant}`],
    styles[`container_${size}`],
    style,
  ].filter(Boolean) as ViewStyle[];

  return (
    <View style={containerStyles} accessibilityLabel={label}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.label,
          styles[`label_${variant}`],
          styles[`label_${size}`],
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
  },
  container_default: {
    backgroundColor: colors.surfaceAlt,
  },
  container_primary: {
    backgroundColor: colors.primaryLight,
  },
  container_success: {
    backgroundColor: colors.successLight,
  },
  container_warning: {
    backgroundColor: colors.warningLight,
  },
  container_danger: {
    backgroundColor: colors.dangerLight,
  },
  container_info: {
    backgroundColor: colors.infoLight,
  },
  container_small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  label: {
    ...typography.meta,
  },
  label_default: {
    color: colors.textSecondary,
  },
  label_primary: {
    color: colors.primary,
  },
  label_success: {
    color: colors.success,
  },
  label_warning: {
    color: colors.warning,
  },
  label_danger: {
    color: colors.danger,
  },
  label_info: {
    color: colors.info,
  },
  label_small: {
    fontSize: 11,
  },
  icon: {
    marginRight: spacing.xs,
  },
});

