import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, sizing, radii, shadows } from '../theme/spacing';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void; // For navigation to Copilot
  showMic?: boolean;
  onMicPress?: () => void;
  editable?: boolean;
  style?: ViewStyle;
}

export function SearchBar({
  placeholder = 'Search or ask HostCity…',
  value,
  onChangeText,
  onPress,
  showMic = true,
  onMicPress,
  editable = true,
  style,
}: SearchBarProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? 'Open search' : undefined}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
      </View>
      {onPress ? (
        <Text style={styles.placeholder}>{placeholder}</Text>
      ) : (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          returnKeyType="search"
          accessibilityLabel="Search input"
        />
      )}
      {showMic && (
        <TouchableOpacity
          style={styles.micButton}
          onPress={onMicPress}
          accessibilityLabel="Voice search"
          accessibilityRole="button"
        >
          <Text style={styles.micIcon}>🎤</Text>
        </TouchableOpacity>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.base,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: sizing.touchTarget,
    paddingHorizontal: spacing.base,
    ...shadows.sm,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  searchIcon: {
    fontSize: sizing.iconMd,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    paddingVertical: spacing.md,
  },
  placeholder: {
    flex: 1,
    ...typography.body,
    color: colors.textTertiary,
    paddingVertical: spacing.md,
  },
  micButton: {
    width: sizing.touchTargetSmall,
    height: sizing.touchTargetSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  micIcon: {
    fontSize: sizing.iconMd,
  },
});

