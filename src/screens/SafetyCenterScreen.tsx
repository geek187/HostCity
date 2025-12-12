import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { safetyAlerts } from '../data/mockData';

const images = {
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM0hnT3fLVXDv5Np8A1OD3ZJzd0gPuzSjfZS5028YuguuxJQkwqsOKJTuO79z2C0t5a4C2Ddx_v703Iaa78aSx-ZO-hN6Tw_05VZNFxzywu1KDXuIV46y6AALDT8AvnkgDABAF95KMjQ8sjCvxgoKgWdy36D8Utg7EqyzBVraMorFnk40uiBe7JBpNQb8XScZINoXVgi1JaXvBMTw04Fiy9tviBOK04e_oqX4tVSFCk80SalzCzYN_xVRV9k49_JeBnm-z5iLUrtc',
  safety: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&h=400&fit=crop',
  fans: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
  ],
  chatUser: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop',
};

const quickActions = [
  { id: 'police', title: 'Police', icon: 'shield', distance: '0.3 mi' },
  { id: 'hospital', title: 'Hospital', icon: 'medkit', distance: '4.2 mi' },
  { id: 'help', title: 'Help Point', icon: 'help-buoy', distance: '0.1 mi' },
];

export function SafetyCenterScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleEmergencyCall = () => {
    Alert.alert('Call 911?', 'This will dial emergency services.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call 911', style: 'destructive', onPress: () => Linking.openURL('tel:911') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.blurOrange} />
      <View style={styles.blurBlue} />

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
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
          <Text style={styles.label}>NY / NJ AREA</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Safety Center</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-down" size={24} color="#F97316" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Card */}
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Current Status</Text>
              <View style={styles.dots}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>

            <TouchableOpacity style={styles.imageContainer} activeOpacity={0.95}>
              <Image source={{ uri: images.safety }} style={styles.cardImage} />
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.imageGradient} />
              
              <View style={styles.imageBottomContent}>
                <View style={styles.statusBadge}>
                  <Ionicons name="shield-checkmark" size={14} color="#22C55E" />
                  <Text style={styles.statusBadgeText}>All Clear</Text>
                </View>
                <Text style={styles.imageTitle}>No Major Incidents</Text>
                <View style={styles.imageLocation}>
                  <Ionicons name="location" size={14} color="white" />
                  <Text style={styles.imageLocationText}>MetLife Stadium Area</Text>
                </View>
              </View>

              <View style={styles.avatarStack}>
                {images.fans.map((uri, i) => (
                  <Image key={i} source={{ uri }} style={[styles.stackAvatar, { marginLeft: i > 0 ? -8 : 0 }]} />
                ))}
                <View style={styles.stackCount}>
                  <Text style={styles.stackCountText}>2k+</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <View style={styles.liveDot} />
                <Text style={styles.statText}>Live updates</Text>
              </View>
              <View style={styles.statsRight}>
                <TouchableOpacity style={styles.statButton}>
                  <Ionicons name="notifications-outline" size={22} color="#9CA3AF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.statButton}>
                  <Ionicons name="share-outline" size={22} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Emergency Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall} activeOpacity={0.9}>
            <View style={styles.emergencyIcon}>
              <Ionicons name="call" size={24} color="white" />
            </View>
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Emergency: 911</Text>
              <Text style={styles.emergencySubtitle}>Tap to call immediately</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickScroll}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickCard} activeOpacity={0.9}>
                <View style={styles.quickIcon}>
                  <Ionicons name={action.icon as any} size={24} color="#F97316" />
                </View>
                <Text style={styles.quickTitle}>{action.title}</Text>
                <Text style={styles.quickDistance}>{action.distance}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Crowd Chart */}
        <View style={styles.section}>
          <Text style={styles.chartLabel}>Crowd Density</Text>
          <Text style={styles.chartTitle}>Stadium Area</Text>
          
          <View style={styles.chartCard}>
            <View style={styles.chartContent}>
              <Svg width="100%" height={80} viewBox="0 0 300 80">
                <Defs>
                  <SvgGradient id="safetyGrad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="#22C55E" stopOpacity={0.2} />
                    <Stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </SvgGradient>
                </Defs>
                <Path d="M0,60 Q50,55 100,40 T200,50 T300,30 V80 H0 Z" fill="url(#safetyGrad)" />
                <Path d="M0,60 Q50,55 100,40 T200,50 T300,30" stroke="#22C55E" strokeWidth={3} fill="none" strokeLinecap="round" />
              </Svg>
            </View>
            <View style={styles.chartBadge}>
              <Text style={styles.chartBadgeText}>Low density</Text>
            </View>
          </View>
        </View>

        {/* Chat Preview */}
        <View style={styles.section}>
          <View style={styles.chatRow}>
            <Image source={{ uri: images.chatUser }} style={styles.chatAvatar} />
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>Is there a first aid station near Gate B?</Text>
            </View>
          </View>
          <View style={styles.chatButtonRow}>
            <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Copilot' as never)}>
              <Text style={styles.chatButtonText}>Ask Safety Guide</Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
          </View>
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
  imageContainer: { height: 180, borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  cardImage: { width: '100%', height: '100%' },
  imageGradient: { ...StyleSheet.absoluteFillObject },
  imageBottomContent: { position: 'absolute', bottom: 16, left: 16 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(34, 197, 94, 0.15)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, gap: 4, marginBottom: 8 },
  statusBadgeText: { fontSize: 10, fontWeight: '600', color: '#22C55E' },
  imageTitle: { fontSize: 18, fontWeight: '700', color: 'white', marginBottom: 4 },
  imageLocation: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  imageLocationText: { fontSize: 12, color: '#E5E7EB' },
  avatarStack: { position: 'absolute', top: 16, right: 16, flexDirection: 'row', alignItems: 'center' },
  stackAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'white' },
  stackCount: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1F2937', alignItems: 'center', justifyContent: 'center', marginLeft: -8, borderWidth: 2, borderColor: 'white' },
  stackCountText: { fontSize: 10, fontWeight: '700', color: 'white' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  statText: { fontSize: 14, color: '#6B7280' },
  statsRight: { flexDirection: 'row', gap: 12 },
  statButton: { padding: 4 },
  emergencyButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DC2626', borderRadius: 16, padding: 16, ...Platform.select({ ios: { shadowColor: '#DC2626', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16 }, android: { elevation: 8 } }) },
  emergencyIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  emergencyContent: { flex: 1 },
  emergencyTitle: { fontSize: 18, fontWeight: '700', color: 'white' },
  emergencySubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  recommendedSection: { marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  seeAll: { fontSize: 12, fontWeight: '600', color: '#F97316' },
  quickScroll: { paddingHorizontal: 24 },
  quickCard: { width: 120, backgroundColor: 'white', borderRadius: 16, padding: 16, alignItems: 'center', marginRight: 12, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 }, android: { elevation: 4 } }) },
  quickIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(249,115,22,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  quickTitle: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 2 },
  quickDistance: { fontSize: 12, color: '#9CA3AF' },
  chartLabel: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  chartTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 8 },
  chartCard: { height: 120, borderRadius: 16, backgroundColor: 'white', borderWidth: 1, borderColor: '#F3F4F6', padding: 16, justifyContent: 'flex-end', position: 'relative' },
  chartContent: { flex: 1, justifyContent: 'flex-end' },
  chartBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(34,197,94,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  chartBadgeText: { fontSize: 10, fontWeight: '600', color: '#22C55E' },
  chatRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  chatAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'white', marginRight: 12 },
  chatBubble: { flex: 1, backgroundColor: 'white', borderRadius: 16, borderTopLeftRadius: 0, padding: 12, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 }, android: { elevation: 2 } }) },
  chatText: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  chatButtonRow: { alignItems: 'flex-end' },
  chatButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F97316', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 9999, gap: 8, ...Platform.select({ ios: { shadowColor: '#F97316', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20 }, android: { elevation: 8 } }) },
  chatButtonText: { fontSize: 14, fontWeight: '500', color: 'white' },
});
