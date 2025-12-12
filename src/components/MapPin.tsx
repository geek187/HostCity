import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { sizing, radii } from '../theme/spacing';

export type PinCategory = 'venue' | 'fanZone' | 'stadium' | 'safety' | 'transit';

interface MapPinProps {
  category: PinCategory;
  label?: string;
  selected?: boolean;
}

// Icon characters for each category (using Unicode symbols for simplicity)
const categoryIcons: Record<PinCategory, string> = {
  venue: '🍽',
  fanZone: '⚽',
  stadium: '🏟',
  safety: '🛡',
  transit: '🚇',
};

const categoryColors: Record<PinCategory, string> = {
  venue: colors.mapPin.venue,
  fanZone: colors.mapPin.fanZone,
  stadium: colors.mapPin.stadium,
  safety: colors.mapPin.safety,
  transit: colors.mapPin.transit,
};

// Pin shapes for accessibility (not color-only differentiation)
const categoryShapes: Record<PinCategory, 'circle' | 'diamond' | 'shield' | 'square'> = {
  venue: 'circle',
  fanZone: 'diamond',
  stadium: 'square',
  safety: 'shield',
  transit: 'circle',
};

export function MapPin({ category, label, selected = false }: MapPinProps) {
  const pinColor = categoryColors[category];
  const shape = categoryShapes[category];

  return (
    <View
      style={[
        styles.container,
        shape === 'diamond' && styles.diamond,
        shape === 'shield' && styles.shield,
        shape === 'square' && styles.square,
        { backgroundColor: pinColor },
        selected && styles.selected,
      ]}
      accessibilityLabel={`${category} pin${label ? `: ${label}` : ''}`}
    >
      <Text style={styles.icon}>{categoryIcons[category]}</Text>
      {selected && (
        <View style={[styles.pointer, { borderTopColor: pinColor }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: sizing.mapPinSize,
    height: sizing.mapPinSize,
    borderRadius: sizing.mapPinSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  diamond: {
    borderRadius: radii.sm,
    transform: [{ rotate: '45deg' }],
  },
  shield: {
    borderRadius: radii.sm,
    borderBottomLeftRadius: sizing.mapPinSize / 2,
    borderBottomRightRadius: sizing.mapPinSize / 2,
  },
  square: {
    borderRadius: radii.sm,
  },
  selected: {
    width: sizing.mapPinSize + 8,
    height: sizing.mapPinSize + 8,
    borderWidth: 3,
  },
  icon: {
    fontSize: 16,
    transform: [{ rotate: '0deg' }], // Counter-rotate for diamond
  },
  pointer: {
    position: 'absolute',
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

