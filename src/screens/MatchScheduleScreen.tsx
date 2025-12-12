import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { matches, Match } from '../data/mockData';

const images = {
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM0hnT3fLVXDv5Np8A1OD3ZJzd0gPuzSjfZS5028YuguuxJQkwqsOKJTuO79z2C0t5a4C2Ddx_v703Iaa78aSx-ZO-hN6Tw_05VZNFxzywu1KDXuIV46y6AALDT8AvnkgDABAF95KMjQ8sjCvxgoKgWdy36D8Utg7EqyzBVraMorFnk40uiBe7JBpNQb8XScZINoXVgi1JaXvBMTw04Fiy9tviBOK04e_oqX4tVSFCk80SalzCzYN_xVRV9k49_JeBnm-z5iLUrtc',
  stadium: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
  fans: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop',
  ],
};

const generateDates = () => {
  const dates = [];
  const today = new Date('2026-06-15');
  for (let i = 0; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      number: date.getDate(),
      isToday: i === 0,
      hasMatches: matches.some((m) => m.date === date.toISOString().split('T')[0]),
    });
  }
  return dates;
};

export function MatchScheduleScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState('2026-06-15');
  const dates = useMemo(() => generateDates(), []);
  const filteredMatches = useMemo(() => matches.filter((m) => m.date === selectedDate), [selectedDate]);
  const nextMatch = filteredMatches[0];

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
          <Text style={styles.label}>FIFA WORLD CUP 2026</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Matches</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-down" size={24} color="#F97316" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll} contentContainerStyle={styles.dateContent}>
          {dates.map((date) => (
            <TouchableOpacity
              key={date.date}
              style={[styles.dateItem, selectedDate === date.date && styles.dateItemActive]}
              onPress={() => setSelectedDate(date.date)}
            >
              <Text style={[styles.dateDay, selectedDate === date.date && styles.dateDayActive]}>
                {date.isToday ? 'TODAY' : date.day}
              </Text>
              <Text style={[styles.dateNumber, selectedDate === date.date && styles.dateNumberActive]}>
                {date.number}
              </Text>
              {date.hasMatches && <View style={[styles.dateDot, selectedDate === date.date && styles.dateDotActive]} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Match */}
        {nextMatch && (
          <View style={styles.section}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Next Match</Text>
                <View style={styles.dots}>
                  <View style={[styles.dot, styles.dotActive]} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </View>

              <TouchableOpacity style={styles.imageContainer} activeOpacity={0.95}>
                <Image source={{ uri: images.stadium }} style={styles.cardImage} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.imageGradient} />
                
                <View style={styles.matchContent}>
                  <View style={styles.matchTeams}>
                    <View style={styles.team}>
                      <Text style={styles.flag}>{nextMatch.homeFlag}</Text>
                      <Text style={styles.teamName}>{nextMatch.homeTeam}</Text>
                    </View>
                    <View style={styles.vs}>
                      <Text style={styles.matchTime}>{nextMatch.time}</Text>
                      <Text style={styles.vsText}>VS</Text>
                    </View>
                    <View style={styles.team}>
                      <Text style={styles.flag}>{nextMatch.awayFlag}</Text>
                      <Text style={styles.teamName}>{nextMatch.awayTeam}</Text>
                    </View>
                  </View>
                  <View style={styles.venueRow}>
                    <Ionicons name="location" size={12} color="white" />
                    <Text style={styles.venueText}>{nextMatch.venue}</Text>
                  </View>
                </View>

                <View style={styles.avatarStack}>
                  {images.fans.map((uri, i) => (
                    <Image key={i} source={{ uri }} style={[styles.stackAvatar, { marginLeft: i > 0 ? -8 : 0 }]} />
                  ))}
                  <View style={styles.stackCount}>
                    <Text style={styles.stackCountText}>5k+</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.statsRow}>
                <View style={styles.stageBadge}>
                  <Text style={styles.stageText}>{nextMatch.stage}</Text>
                </View>
                <View style={styles.statsRight}>
                  <TouchableOpacity style={styles.statButton}>
                    <Ionicons name="notifications-outline" size={22} color="#9CA3AF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.statButton}>
                    <Ionicons name="bookmark-outline" size={22} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Other Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Matches</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {filteredMatches.slice(1).map((match) => (
            <TouchableOpacity key={match.id} style={styles.matchCard} activeOpacity={0.9}>
              <View style={styles.matchCardTeams}>
                <View style={styles.matchCardTeam}>
                  <Text style={styles.matchCardFlag}>{match.homeFlag}</Text>
                  <Text style={styles.matchCardName}>{match.homeTeam}</Text>
                </View>
                <View style={styles.matchCardVs}>
                  <Text style={styles.matchCardTime}>{match.time}</Text>
                </View>
                <View style={styles.matchCardTeam}>
                  <Text style={styles.matchCardFlag}>{match.awayFlag}</Text>
                  <Text style={styles.matchCardName}>{match.awayTeam}</Text>
                </View>
              </View>
              <View style={styles.matchCardFooter}>
                <Text style={styles.matchCardVenue}>{match.venue}</Text>
                <View style={styles.matchCardBadge}>
                  <Text style={styles.matchCardStage}>{match.stage}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Get Match Alerts</Text>
            <Ionicons name="notifications" size={16} color="white" />
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
  dateScroll: { marginBottom: 24 },
  dateContent: { paddingHorizontal: 24 },
  dateItem: { width: 52, height: 72, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: 'white', marginRight: 12, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 }, android: { elevation: 2 } }) },
  dateItemActive: { backgroundColor: '#F97316' },
  dateDay: { fontSize: 10, fontWeight: '500', color: '#9CA3AF' },
  dateDayActive: { color: 'rgba(255,255,255,0.8)' },
  dateNumber: { fontSize: 20, fontWeight: '700', color: '#111827', marginVertical: 4 },
  dateNumberActive: { color: 'white' },
  dateDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#F97316' },
  dateDotActive: { backgroundColor: 'white' },
  section: { paddingHorizontal: 24, marginBottom: 32 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 40 }, android: { elevation: 8 } }) },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1D5DB' },
  dotActive: { backgroundColor: '#F97316' },
  imageContainer: { height: 200, borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  cardImage: { width: '100%', height: '100%' },
  imageGradient: { ...StyleSheet.absoluteFillObject },
  matchContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 },
  matchTeams: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  team: { flex: 1, alignItems: 'center' },
  flag: { fontSize: 32, marginBottom: 4 },
  teamName: { fontSize: 14, fontWeight: '600', color: 'white' },
  vs: { alignItems: 'center' },
  matchTime: { fontSize: 18, fontWeight: '700', color: 'white' },
  vsText: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  venueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  venueText: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  avatarStack: { position: 'absolute', top: 16, right: 16, flexDirection: 'row', alignItems: 'center' },
  stackAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'white' },
  stackCount: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1F2937', alignItems: 'center', justifyContent: 'center', marginLeft: -8, borderWidth: 2, borderColor: 'white' },
  stackCountText: { fontSize: 10, fontWeight: '700', color: 'white' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stageBadge: { backgroundColor: 'rgba(249,115,22,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  stageText: { fontSize: 10, fontWeight: '600', color: '#F97316' },
  statsRight: { flexDirection: 'row', gap: 12 },
  statButton: { padding: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  seeAll: { fontSize: 12, fontWeight: '600', color: '#F97316' },
  matchCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 }, android: { elevation: 4 } }) },
  matchCardTeams: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  matchCardTeam: { flex: 1, alignItems: 'center' },
  matchCardFlag: { fontSize: 28, marginBottom: 4 },
  matchCardName: { fontSize: 14, fontWeight: '600', color: '#111827' },
  matchCardVs: { paddingHorizontal: 16 },
  matchCardTime: { fontSize: 18, fontWeight: '700', color: '#111827' },
  matchCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  matchCardVenue: { fontSize: 12, color: '#6B7280' },
  matchCardBadge: { backgroundColor: 'rgba(249,115,22,0.1)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  matchCardStage: { fontSize: 10, fontWeight: '600', color: '#F97316' },
  ctaButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F97316', paddingVertical: 12, borderRadius: 9999, gap: 8, ...Platform.select({ ios: { shadowColor: '#F97316', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20 }, android: { elevation: 8 } }) },
  ctaButtonText: { fontSize: 14, fontWeight: '500', color: 'white' },
});
