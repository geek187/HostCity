import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { places, offers } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';

type PlaceDetailsRouteProp = RouteProp<RootStackParamList, 'PlaceDetails'>;

const images = {
  place: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFCBOZNeg-CeYbjQMQv_kx0mY0SEZrDlUZA7soRXsBcdofKNpzRG65oiom6POFhUDv5gEpyglnLQffb-2Fq76YdVfq_kUbhQUyQe207S21YsCK59V_r7YosPdoMpDvhaUaV4PZd47ab3B1S8Ovtvw3tVM8VP2KTOcvrd_o8yfkl8vYnc1caLTkmzIIKYs7-YzzyY3xVEkLHpSOYF0uHmtxMB9HHeAJdFpo1ra4fL_k0pE-eVBbZkOX1NaOCI5srHRnr2FtYYdhSv4',
  fans: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
  ],
};

const crowdConfig: Record<string, { label: string; color: string }> = {
  quiet: { label: 'Low Crowd', color: '#22C55E' },
  moderate: { label: 'Moderate', color: '#F59E0B' },
  busy: { label: 'Busy Now', color: '#F59E0B' },
  packed: { label: 'Very Busy', color: '#EF4444' },
};

export function PlaceDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<PlaceDetailsRouteProp>();
  const insets = useSafeAreaInsets();
  const { placeId } = route.params;

  const place = useMemo(() => places.find((p) => p.id === placeId), [placeId]);

  if (!place) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="alert-circle" size={48} color="#9CA3AF" />
        <Text style={styles.errorText}>Place not found</Text>
        <TouchableOpacity style={styles.errorButton} onPress={() => navigation.goBack()}>
          <Text style={styles.errorButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const crowd = crowdConfig[place.crowdStatus];

  const handleDirections = () => {
    Linking.openURL(`https://maps.google.com/?q=${place.latitude},${place.longitude}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: images.place }} style={styles.heroImage} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.heroGradient} />
          
          {/* Nav */}
          <View style={[styles.heroNav, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <Ionicons name="share-outline" size={22} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Avatar stack */}
          <View style={styles.avatarStack}>
            {images.fans.map((uri, i) => (
              <Image key={i} source={{ uri }} style={[styles.stackAvatar, { marginLeft: i > 0 ? -8 : 0 }]} />
            ))}
            <View style={styles.stackCount}>
              <Text style={styles.stackCountText}>15+</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.heroContent}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{place.categoryLabel}</Text>
            </View>
            <Text style={styles.heroTitle}>{place.name}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="white" />
              <Text style={styles.locationText}>{place.address}</Text>
            </View>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.section}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: crowd.color + '15' }]}>
                <View style={[styles.crowdDot, { backgroundColor: crowd.color }]} />
              </View>
              <Text style={[styles.statValue, { color: crowd.color }]}>{crowd.label}</Text>
              <Text style={styles.statLabel}>Now</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="star" size={18} color="#FBBF24" />
              </View>
              <Text style={styles.statValue}>{place.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="walk" size={18} color="#F97316" />
              </View>
              <Text style={styles.statValue}>{place.walkTime}</Text>
              <Text style={styles.statLabel}>Walk</Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>{place.vibe}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Info</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="time" size={18} color="#F97316" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Hours</Text>
                <Text style={styles.infoValue}>{place.openHours}</Text>
              </View>
            </View>
            <View style={styles.infoRowBorder} />
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="location" size={18} color="#F97316" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{place.address}</Text>
              </View>
            </View>
            {place.hasScreens && (
              <>
                <View style={styles.infoRowBorder} />
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="tv" size={18} color="#F97316" />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Showing</Text>
                    <Text style={styles.infoValue}>{place.matchesShown.join(', ')}</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Action Bar */}
      <View style={[styles.actionBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleDirections}>
          <Text style={styles.primaryButtonText}>Get Directions</Text>
          <Ionicons name="navigate" size={18} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButtonLg}>
          <Ionicons name="bookmark-outline" size={22} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollView: { flex: 1 },
  errorContainer: { justifyContent: 'center', alignItems: 'center', gap: 12 },
  errorText: { fontSize: 14, color: '#6B7280' },
  errorButton: { paddingHorizontal: 24, paddingVertical: 12, backgroundColor: '#F97316', borderRadius: 9999 },
  errorButtonText: { fontSize: 14, fontWeight: '500', color: 'white' },
  heroContainer: { height: 320, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroGradient: { ...StyleSheet.absoluteFillObject },
  heroNav: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24 },
  navButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8 }, android: { elevation: 4 } }) },
  avatarStack: { position: 'absolute', top: 80, right: 24, flexDirection: 'row', alignItems: 'center' },
  stackAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'white' },
  stackCount: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1F2937', alignItems: 'center', justifyContent: 'center', marginLeft: -8, borderWidth: 2, borderColor: 'white' },
  stackCountText: { fontSize: 10, fontWeight: '700', color: 'white' },
  heroContent: { position: 'absolute', bottom: 24, left: 24, right: 24 },
  categoryBadge: { backgroundColor: '#F97316', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
  categoryText: { fontSize: 10, fontWeight: '600', color: 'white' },
  heroTitle: { fontSize: 24, fontWeight: '700', color: 'white', marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  statsCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 16, padding: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 40 }, android: { elevation: 8 } }) },
  statItem: { flex: 1, alignItems: 'center' },
  statIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  crowdDot: { width: 12, height: 12, borderRadius: 6 },
  statValue: { fontSize: 14, fontWeight: '600', color: '#111827' },
  statLabel: { fontSize: 12, color: '#9CA3AF' },
  statDivider: { width: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  aboutCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 }, android: { elevation: 2 } }) },
  aboutText: { fontSize: 14, color: '#4B5563', lineHeight: 22 },
  infoCard: { backgroundColor: 'white', borderRadius: 16, overflow: 'hidden', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 }, android: { elevation: 2 } }) },
  infoRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  infoRowBorder: { height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 16 },
  infoIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(249,115,22,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 2 },
  infoValue: { fontSize: 14, color: '#111827' },
  actionBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 12, gap: 12, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  primaryButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F97316', paddingVertical: 14, borderRadius: 9999, gap: 8, ...Platform.select({ ios: { shadowColor: '#F97316', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16 }, android: { elevation: 8 } }) },
  primaryButtonText: { fontSize: 14, fontWeight: '500', color: 'white' },
  iconButtonLg: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
});
