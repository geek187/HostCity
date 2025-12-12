import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            onPress={marker.onPress}
            pinColor={marker.color}
          />
        ))}
      </MapView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  map: {
    flex: 1,
    borderRadius: radii.lg,
    overflow: 'hidden',
    margin: spacing.base,
  },
  header: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
    position: 'absolute',
    top: spacing.base,
    left: spacing.base,
    right: spacing.base,
    backgroundColor: 'transparent',
  },
  headerLabel: { ...typography.meta, color: colors.textSecondary, marginBottom: 4 },
  headerTitle: { ...typography.h2, color: colors.textPrimary },
  cardContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    gap: spacing.md,
    marginBottom: spacing.lg,
    position: 'absolute',
    bottom: spacing.base,
    left: spacing.base,
    right: spacing.base,
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
});
