import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { offers } from '../data/mockData';

const CARD_WIDTH = 160;
const CARD_HEIGHT = 224;

const images = {
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM0hnT3fLVXDv5Np8A1OD3ZJzd0gPuzSjfZS5028YuguuxJQkwqsOKJTuO79z2C0t5a4C2Ddx_v703Iaa78aSx-ZO-hN6Tw_05VZNFxzywu1KDXuIV46y6AALDT8AvnkgDABAF95KMjQ8sjCvxgoKgWdy36D8Utg7EqyzBVraMorFnk40uiBe7JBpNQb8XScZINoXVgi1JaXvBMTw04Fiy9tviBOK04e_oqX4tVSFCk80SalzCzYN_xVRV9k49_JeBnm-z5iLUrtc',
  featured: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
  offers: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop',
  ],
  fans: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
  ],
};

export function OffersScreen() {
  const insets = useSafeAreaInsets();
  const featuredOffer = offers[0];

  return (
    <View style={styles.container}>
      <View style={styles.blurOrange} />
      <View style={styles.blurBlue} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image source={{ uri: images.avatar }} style={styles.avatar} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.label}>MATCH DAY SPECIALS</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Deals & Offers</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-down" size={24} color="#F97316" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Card */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Today's Special</Text>
              <View style={styles.dots}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>

            <TouchableOpacity style={styles.imageContainer} activeOpacity={0.95}>
              <Image source={{ uri: images.featured }} style={styles.cardImage} />
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']} style={styles.imageGradient} />
              
              <View style={styles.imageBottomContent}>
                <View style={styles.dealBadge}>
                  <Text style={styles.dealBadgeText}>50% OFF</Text>
                </View>
                <Text style={styles.imageTitle}>{featuredOffer.title}</Text>
                <View style={styles.imageLocation}>
                  <Ionicons name="location" size={14} color="white" />
                  <Text style={styles.imageLocationText}>{featuredOffer.placeName}</Text>
                </View>
              </View>

              <View style={styles.avatarStack}>
                {images.fans.map((uri, i) => (
                  <Image key={i} source={{ uri }} style={[styles.stackAvatar, { marginLeft: i > 0 ? -8 : 0 }]} />
                ))}
                <View style={styles.stackCount}>
                  <Text style={styles.stackCountText}>12+</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.statsRow}>
              <View style={styles.statsLeft}>
                <View style={styles.stat}>
                  <Ionicons name="time-outline" size={20} color="#F97316" />
                  <Text style={styles.statText}>Ends {featuredOffer.endsAt}</Text>
                </View>
              </View>
              <View style={styles.statsRight}>
                <TouchableOpacity style={styles.statButton}>
                  <Ionicons name="share-outline" size={22} color="#9CA3AF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.statButton}>
                  <Ionicons name="bookmark-outline" size={22} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* All Deals */}
        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Deals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
            {offers.slice(1).map((offer, index) => (
              <TouchableOpacity key={offer.id} style={styles.placeCard} activeOpacity={0.95}>
                <Image source={{ uri: images.offers[index % 3] }} style={styles.placeImage} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.placeGradient} />
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{offer.category}</Text>
                </View>
                <View style={styles.placeContent}>
                  <Text style={styles.placeName} numberOfLines={2}>{offer.title}</Text>
                  <View style={styles.placeLocation}>
                    <Ionicons name="location" size={10} color="#D1D5DB" />
                    <Text style={styles.placeType}>{offer.placeName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* CTA */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>View All Deals</Text>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  blurOrange: { position: 'absolute', top: 80, right: -64, width: 256, height: 256, borderRadius: 128, backgroundColor: 'rgba(249, 115, 22, 0.1)' },
  blurBlue: { position: 'absolute', bottom: 160, left: -48, width: 192, height: 192, borderRadius: 96, backgroundColor: 'rgba(59, 130, 246, 0.1)' },
  scrollView: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 16 },
  headerButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarContainer: { position: 'relative' },
  avatar: { width: 40, height: 40, borderRadius: 12, borderWidth: 2, borderColor: 'white' },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#F97316', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white' },
  badgeText: { fontSize: 10, fontWeight: '700', color: 'white' },
  titleSection: { paddingHorizontal: 24, marginBottom: 24 },
  label: { fontSize: 12, fontWeight: '500', color: '#6B7280', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 30, fontWeight: '700', color: '#111827' },
  section: { paddingHorizontal: 24, marginBottom: 32 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 40 }, android: { elevation: 8 } }) },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1D5DB' },
  dotActive: { backgroundColor: '#F97316' },
  imageContainer: { height: 192, borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  cardImage: { width: '100%', height: '100%' },
  imageGradient: { ...StyleSheet.absoluteFillObject },
  imageBottomContent: { position: 'absolute', bottom: 16, left: 16 },
  dealBadge: { backgroundColor: '#F97316', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
  dealBadgeText: { fontSize: 10, fontWeight: '700', color: 'white' },
  imageTitle: { fontSize: 18, fontWeight: '700', color: 'white', marginBottom: 4 },
  imageLocation: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  imageLocationText: { fontSize: 12, color: '#E5E7EB' },
  avatarStack: { position: 'absolute', top: 16, right: 16, flexDirection: 'row', alignItems: 'center' },
  stackAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'white' },
  stackCount: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1F2937', alignItems: 'center', justifyContent: 'center', marginLeft: -8, borderWidth: 2, borderColor: 'white' },
  stackCountText: { fontSize: 10, fontWeight: '700', color: 'white' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statsLeft: { flexDirection: 'row', gap: 16 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 14, color: '#6B7280' },
  statsRight: { flexDirection: 'row', gap: 12 },
  statButton: { padding: 4 },
  recommendedSection: { marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  seeAll: { fontSize: 12, fontWeight: '600', color: '#F97316' },
  cardsScroll: { paddingHorizontal: 24, paddingBottom: 16 },
  placeCard: { width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 16, overflow: 'hidden', marginRight: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 }, android: { elevation: 4 } }) },
  placeImage: { width: '100%', height: '100%' },
  placeGradient: { ...StyleSheet.absoluteFillObject },
  categoryTag: { position: 'absolute', top: 12, left: 12, backgroundColor: '#F97316', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  categoryTagText: { fontSize: 10, fontWeight: '600', color: 'white' },
  placeContent: { position: 'absolute', bottom: 12, left: 12, right: 12 },
  placeName: { fontSize: 14, fontWeight: '700', color: 'white', marginBottom: 2 },
  placeLocation: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  placeType: { fontSize: 10, color: '#D1D5DB' },
  ctaButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F97316', paddingVertical: 12, borderRadius: 9999, gap: 8, ...Platform.select({ ios: { shadowColor: '#F97316', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20 }, android: { elevation: 8 } }) },
  ctaButtonText: { fontSize: 14, fontWeight: '500', color: 'white' },
});
