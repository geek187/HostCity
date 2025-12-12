import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, radii } from '../theme/spacing';

type BubbleType = 'assistant' | 'user';

interface ChatBubbleProps {
  message: string;
  type: BubbleType;
  timestamp?: string;
  showAvatar?: boolean;
  style?: ViewStyle;
}

export function ChatBubble({
  message,
  type,
  timestamp,
  showAvatar = true,
  style,
}: ChatBubbleProps) {
  const isAssistant = type === 'assistant';

  return (
    <View
      style={[
        styles.container,
        isAssistant ? styles.containerAssistant : styles.containerUser,
        style,
      ]}
      accessibilityLabel={`${isAssistant ? 'Assistant' : 'You'}: ${message}`}
    >
      {isAssistant && showAvatar && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>HC</Text>
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isAssistant ? styles.bubbleAssistant : styles.bubbleUser,
        ]}
      >
        <Text
          style={[
            styles.message,
            isAssistant ? styles.messageAssistant : styles.messageUser,
          ]}
        >
          {message}
        </Text>
        {timestamp && (
          <Text
            style={[
              styles.timestamp,
              isAssistant ? styles.timestampAssistant : styles.timestampUser,
            ]}
          >
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
}

// Typing indicator component
export function TypingIndicator() {
  return (
    <View style={[styles.container, styles.containerAssistant]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>HC</Text>
      </View>
      <View style={[styles.bubble, styles.bubbleAssistant, styles.typingBubble]}>
        <View style={styles.typingDots}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: spacing.xs,
    paddingHorizontal: spacing.base,
  },
  containerAssistant: {
    justifyContent: 'flex-start',
  },
  containerUser: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '600',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderRadius: radii.lg,
  },
  bubbleAssistant: {
    backgroundColor: colors.surfaceAlt,
    borderTopLeftRadius: radii.sm,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderTopRightRadius: radii.sm,
  },
  message: {
    ...typography.body,
  },
  messageAssistant: {
    color: colors.textPrimary,
  },
  messageUser: {
    color: colors.textInverse,
  },
  timestamp: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  timestampAssistant: {
    color: colors.textTertiary,
  },
  timestampUser: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typingBubble: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textTertiary,
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 0.8,
  },
});

