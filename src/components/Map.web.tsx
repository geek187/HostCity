import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, radii } from '../theme/spacing';

interface MapComponentProps {
  initialRegion: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
  markers?: Array<{ id: string; latitude: number; longitude: number; title: string; description: string; color: string; onPress?: () => void }>;
  style?: any;
}

const placeImages = [
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop',
];

export function Map({ initialRegion, markers = [], style }: MapComponentProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Map Placeholder with Route */}
      <View style={styles.mapBackground}>
        {/* Grid pattern */}
        <View style={styles.grid}>
          {[...Array(12)].map((_, i) => (
            <View key={`h${i}`} style={[styles.gridLine, styles.gridH, { top: `${(i + 1) * 8}%` }]} />
          ))}
          {[...Array(12)].map((_, i) => (
            <View key={`v${i}`} style={[styles.gridLine, styles.gridV, { left: `${(i + 1) * 8}%` }]} />
          ))}
        </View>

        {/* Route Line */}
        <View style={styles.routeContainer}>
          <View style={styles.routeLine}>
            <View style={[styles.routeDot, styles.routeDotStart]} />
            <View style={styles.routePath} />
            <View style={styles.routeDot} />
            <View style={styles.routePath} />
            <View style={[styles.routeDot, styles.routeDotEnd]} />
          </View>
        </View>
      </View>

      {/* Location Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Your location</Text>
        <Text style={styles.headerTitle}>NY / NJ Area</Text>
      </View>

      {/* Place Cards */}
      {markers.length > 0 && (
        <View style={styles.cardContainer}>
          {markers.slice(0, 3).map((marker, i) => (
            <TouchableOpacity key={marker.id} style={styles.placeCard} onPress={marker.onPress} activeOpacity={0.9}>
              <Image source={{ uri: placeImages[i % placeImages.length] }} style={styles.placeImage} />
              <View style={styles.placeOverlay}>
                <Text style={styles.placeName} numberOfLines={1}>{marker.title}</Text>
                <View style={styles.placeLocation}>
                  <Ionicons name="navigate" size={10} color={colors.white} />
                  <Text style={styles.placeCity}>{marker.description}</Text>
                </View>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingNumber}>4.8</Text>
                <Ionicons name="star" size={10} color={colors.accent} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Notice */}
      <View style={styles.notice}>
        <Ionicons name="phone-portrait-outline" size={14} color={colors.textTertiary} />
        <Text style={styles.noticeText}>Full map available on mobile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  mapBackground: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    position: 'relative',
    borderRadius: radii.lg,
    overflow: 'hidden',
    margin: spacing.base,
  },
  grid: { ...StyleSheet.absoluteFillObject, opacity: 0.5 },
  gridLine: { position: 'absolute', backgroundColor: colors.border },
  gridH: { left: 0, right: 0, height: 1 },
  gridV: { top: 0, bottom: 0, width: 1 },
  routeContainer: {
    position: 'absolute',
    top: '40%',
    left: spacing.xl,
    right: spacing.xl,
  },
  routeLine: { flexDirection: 'row', alignItems: 'center' },
  routeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accent },
  routeDotStart: { width: 14, height: 14, borderRadius: 7 },
  routeDotEnd: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.textTertiary },
  routePath: { flex: 1, height: 3, backgroundColor: colors.accent, marginHorizontal: spacing.xs },
  header: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  headerLabel: { ...typography.meta, color: colors.textSecondary, marginBottom: 4 },
  headerTitle: { ...typography.h2, color: colors.textPrimary },
  cardContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  placeCard: {
    flex: 1,
    height: 160,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
      android: { elevation: 4 },
      default: {},
    }),
  },
  placeImage: { width: '100%', height: '100%', backgroundColor: colors.border },
  placeOverlay: { position: 'absolute', top: spacing.sm, left: spacing.sm },
  placeName: { fontSize: 12, fontWeight: '700', color: colors.white, marginBottom: 2 },
  placeLocation: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  placeCity: { fontSize: 10, color: colors.white, opacity: 0.9 },
  ratingBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.full,
    gap: 2,
  },
  ratingNumber: { fontSize: 10, color: colors.textPrimary, fontWeight: '700' },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  noticeText: { ...typography.meta, color: colors.textTertiary },
});
