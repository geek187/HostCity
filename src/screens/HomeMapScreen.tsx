import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Circle, G, Rect } from 'react-native-svg';
import { places, getNearbyPlaces, Place } from '../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 160;
const CARD_HEIGHT = 224;
const FESTIVAL_CARD_WIDTH = SCREEN_WIDTH - 48;

const images = {
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM0hnT3fLVXDv5Np8A1OD3ZJzd0gPuzSjfZS5028YuguuxJQkwqsOKJTuO79z2C0t5a4C2Ddx_v703Iaa78aSx-ZO-hN6Tw_05VZNFxzywu1KDXuIV46y6AALDT8AvnkgDABAF95KMjQ8sjCvxgoKgWdy36D8Utg7EqyzBVraMorFnk40uiBe7JBpNQb8XScZINoXVgi1JaXvBMTw04Fiy9tviBOK04e_oqX4tVSFCk80SalzCzYN_xVRV9k49_JeBnm-z5iLUrtc',
  fans: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBq-vTSTFfUKQia_rgRjPqsN-VAE0tENYvbtashqk-tR0bRtRmab6dJKz6OPY7AzzoLe_FitGCpqgqPjoqlgbzROpHjYhGb8tUxHfUs_GadW9oYcK_LPQaNfXQBp7GFpnqvkSjqoGXDGW9Wmd-z3SPE5641hSBhGAWz_4pML5hGdM0X0KciqZ7GcNkF-3sUqWsluaJHP0QS-R16C295X0mW1xvsESdg1HSr6WDWLZcWrj29bywppXbiUsYp7JWR-7q52vqAL7ktxcA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAXNg2L6bRq5Updj71QIrBu3n82N12zel7RWI1iPtGwpSG3do0_p6ck40t6q4JKfOEvJj03zXa54CmJogBnXR6IGWCDzrlDSYNVoCOcpv6x7v_hO_RIX4XRBd2DtgEyBfdWPCG1m3lKqnkUTphEsrztFx4yp4tpJ9C3-ZWelkYEgLKANXnjwT4TYGFQltpmtJz_xOTkZjjCn171I9k9t8aSm4NaqJchqCV7ekI5-Cjrp3l2EfLvoNBn7tfMT3a3rql5j85T_78U2EE',
  ],
  chatUser: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnZL1QFzt1v8j49FLc3RlbqrjRWwrJvSYcGYykfp8VGXMPXUYReDEKAnH3dGA4Ow6QEzXSkPvofrh3HSyuZSqRx2G_Vhol9Rcl3v-UlN7CQ3hs2ud8vE_S_bQofUJyW44Vn8a2-s21FsKIfjxm2RIZ2__rnQTp80SBWmqCXGp0oNVIf-VhcCbqtM8vbooNi_nwcTZsBx2x9aj4aJCQK4sv0AlfqjR6CaLdkNv5b8MVY96vEPmA68yrGoG76esM2fgfY1m3-f6XVvc',
  places: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLKLWLqPA6KBiTbCVHvwqcsJRf7UwpoqtwtdscxUlWQns6AHjjG40-PznTPYAwGUVo6q9gGv5rpt_OYvRM-efv3hWGG6llv_b3foACmvBqUnG6o0Zx8LcQf0TMfcXKeUlU0-MwmaTgzEBp-bAqZYoKqrelrw4xaJSB8hs6-7Z8w46WVFgIrX_fiVrW_quNiahDK8Ay93Lbei8r4dnYf8H9pHYXKL1a611THuAl7m6Urd_BySEFjPkSGtpqIuMs8HPldjO5ttzWRc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDBM5Tj47u1UUcqYPIbc9Fzrf3IsxiaKjZIPf1QEd8ZP5xP3ID-ZaiQOudM8zvotAibpOTjNpeAnp-DJ15-1gRdbauzlzsjgSa3U7YurZWcHb6EZR5Zei6LpRo8sowcTZh7xOUph77n9tRP_N4KO_LYLOowHbFzXt7vrI9iH8nelM_g_YBwrDq82jucGly01NS2GTxZ_YWyCeqCioavwLDtZHdZ-0egQ7wkKD3p5CbWBVPihnCGw49mmqAmmc69NNbac_-NZLYJEUI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCDivwxH0FxztlOcORfKtH-aIlHIWlWIRO2wWtspOaqlnInF1LnITWJcBCefAhtH42D6Tz8LlfKsoBAvRI6vuG6EP2c_J8bNu3xG--2zPqqvD6JtnY4-7ayIWB7TeaINb0bHI7fUxcmeQDONucRjnanvuv1gZvg0jvWt1ELw37sHL8SbFTYBGQ2IZEQIZ7xsXgasx5yMEKHhxTWzm9HcSmlqb7S10VbVwgAb73X3qulTb1kPu47cXPF_btZkUaR-1tKumcK4rIGNLY',
  ],
};

// Festival zones with routes - synced with map
const festivalZones = [
  {
    id: 'times-square',
    title: 'Fan Festival Zone',
    name: 'Times Square Hub',
    subtitle: 'Manhattan, NY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFCBOZNeg-CeYbjQMQv_kx0mY0SEZrDlUZA7soRXsBcdofKNpzRG65oiom6POFhUDv5gEpyglnLQffb-2Fq76YdVfq_kUbhQUyQe207S21YsCK59V_r7YosPdoMpDvhaUaV4PZd47ab3B1S8Ovtvw3tVM8VP2KTOcvrd_o8yfkl8vYnc1caLTkmzIIKYs7-YzzyY3xVEkLHpSOYF0uHmtxMB9HHeAJdFpo1ra4fL_k0pE-eVBbZkOX1NaOCI5srHRnr2FtYYdhSv4',
    wind: '12m/s',
    temp: '+24°C',
    fans: 9,
    routePath: 'M 80,320 L 100,280 L 180,300 L 260,200 L 320,240 L 400,140',
    startPoint: { x: 80, y: 320 },
    endPoint: { x: 400, y: 140 },
  },
  {
    id: 'metlife',
    title: 'Group B Matches',
    name: 'MetLife Stadium',
    subtitle: 'East Rutherford, NJ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLKLWLqPA6KBiTbCVHvwqcsJRf7UwpoqtwtdscxUlWQns6AHjjG40-PznTPYAwGUVo6q9gGv5rpt_OYvRM-efv3hWGG6llv_b3foACmvBqUnG6o0Zx8LcQf0TMfcXKeUlU0-MwmaTgzEBp-bAqZYoKqrelrw4xaJSB8hs6-7Z8w46WVFgIrX_fiVrW_quNiahDK8Ay93Lbei8r4dnYf8H9pHYXKL1a611THuAl7m6Urd_BySEFjPkSGtpqIuMs8HPldjO5ttzWRc',
    wind: '8m/s',
    temp: '+22°C',
    fans: 15,
    routePath: 'M 80,320 L 80,280 L 140,240 L 200,280 L 300,180 L 380,100',
    startPoint: { x: 80, y: 320 },
    endPoint: { x: 380, y: 100 },
  },
  {
    id: 'central-park',
    title: 'Group C Watch Party',
    name: 'Central Park',
    subtitle: 'Manhattan, NY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBM5Tj47u1UUcqYPIbc9Fzrf3IsxiaKjZIPf1QEd8ZP5xP3ID-ZaiQOudM8zvotAibpOTjNpeAnp-DJ15-1gRdbauzlzsjgSa3U7YurZWcHb6EZR5Zei6LpRo8sowcTZh7xOUph77n9tRP_N4KO_LYLOowHbFzXt7vrI9iH8nelM_g_YBwrDq82jucGly01NS2GTxZ_YWyCeqCioavwLDtZHdZ-0egQ7wkKD3p5CbWBVPihnCGw49mmqAmmc69NNbac_-NZLYJEUI',
    wind: '5m/s',
    temp: '+26°C',
    fans: 20,
    routePath: 'M 80,320 L 90,260 L 160,220 L 220,280 L 280,180 L 360,150',
    startPoint: { x: 80, y: 320 },
    endPoint: { x: 360, y: 150 },
  },
];

export function HomeMapScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const nearbyPlaces = getNearbyPlaces(4);
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const festivalListRef = useRef<FlatList>(null);

  const activeZone = festivalZones[activeZoneIndex];

  const handlePlacePress = useCallback((place: Place) => {
    navigation.navigate('PlaceDetails', { placeId: place.id });
  }, [navigation]);

  const handleChatPress = useCallback(() => {
    navigation.navigate('Copilot' as never);
  }, [navigation]);

  const handleFestivalCardScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / FESTIVAL_CARD_WIDTH);
    if (index !== activeZoneIndex && index >= 0 && index < festivalZones.length) {
      setActiveZoneIndex(index);
    }
  };

  // Full-bleed map with fading edges - synced with active zone
  const renderMapWithRoute = () => (
    <Svg width="100%" height="100%" viewBox="0 0 480 400" preserveAspectRatio="xMidYMid slice">
      <Defs>
        <SvgGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#F97316" stopOpacity={1} />
          <Stop offset="100%" stopColor="#FDBA74" stopOpacity={0.9} />
        </SvgGradient>
        <SvgGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#E8F4F8" stopOpacity={1} />
          <Stop offset="100%" stopColor="#E8F4F8" stopOpacity={0} />
        </SvgGradient>
        <SvgGradient id="fadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#E8F4F8" stopOpacity={0} />
          <Stop offset="100%" stopColor="#E8F4F8" stopOpacity={1} />
        </SvgGradient>
        <SvgGradient id="fadeTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#E8F4F8" stopOpacity={1} />
          <Stop offset="100%" stopColor="#E8F4F8" stopOpacity={0} />
        </SvgGradient>
        <SvgGradient id="fadeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#E8F4F8" stopOpacity={0} />
          <Stop offset="100%" stopColor="#E8F4F8" stopOpacity={1} />
        </SvgGradient>
      </Defs>
      
      <Rect x="0" y="0" width="480" height="400" fill="#E8F4F8" />
      
      {/* Terrain shapes */}
      <Path d="M0,180 Q60,140 120,160 T240,120 T360,140 T480,100 V400 H0 Z" fill="#DCE8EC" opacity={0.7} />
      <Path d="M0,240 Q80,200 160,230 T320,180 T440,210 T480,170 V400 H0 Z" fill="#D0E2E8" opacity={0.5} />
      <Path d="M0,300 Q100,260 200,290 T380,240 T480,270 V400 H0 Z" fill="#C4DAE0" opacity={0.4} />
      
      {/* Water/Fjord lines */}
      <Path d="M240,0 Q220,60 250,120 Q230,180 260,240 Q240,300 270,360 L280,400" stroke="#B8CDD4" strokeWidth={2.5} fill="none" opacity={0.6} />
      <Path d="M120,40 Q150,90 130,150 Q160,210 140,270 Q170,330 150,400" stroke="#B8CDD4" strokeWidth={2} fill="none" opacity={0.5} />
      <Path d="M360,20 Q390,80 370,140 Q400,200 380,260 Q410,320 390,380" stroke="#B8CDD4" strokeWidth={2} fill="none" opacity={0.5} />
      
      {/* Terrain detail */}
      <Path d="M40,100 Q70,80 100,100 Q130,80 160,95" stroke="#C4D8DE" strokeWidth={1.5} fill="none" opacity={0.4} />
      <Path d="M300,60 Q340,40 380,65 Q420,45 460,70" stroke="#C4D8DE" strokeWidth={1.5} fill="none" opacity={0.4} />
      <Path d="M180,320 Q220,290 260,320 Q300,290 340,315" stroke="#C4D8DE" strokeWidth={1.5} fill="none" opacity={0.3} />
      
      {/* The orange route line - synced with activeZone */}
      <Path
        d={activeZone.routePath}
        stroke="url(#routeGradient)"
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Start point - Your location */}
      <G>
        <Circle cx={activeZone.startPoint.x} cy={activeZone.startPoint.y} r={24} fill="#F97316" opacity={0.12} />
        <Circle cx={activeZone.startPoint.x} cy={activeZone.startPoint.y} r={16} fill="#F97316" opacity={0.2} />
        <Circle cx={activeZone.startPoint.x} cy={activeZone.startPoint.y} r={10} fill="#F97316" />
        <Circle cx={activeZone.startPoint.x} cy={activeZone.startPoint.y} r={4} fill="white" />
      </G>
      
      {/* End point - Destination */}
      <G>
        <Circle cx={activeZone.endPoint.x} cy={activeZone.endPoint.y} r={12} fill="#FDBA74" opacity={0.4} />
        <Circle cx={activeZone.endPoint.x} cy={activeZone.endPoint.y} r={8} fill="#F97316" />
      </G>
      
      {/* Fade overlays */}
      <Rect x="0" y="0" width="60" height="400" fill="url(#fadeLeft)" />
      <Rect x="420" y="0" width="60" height="400" fill="url(#fadeRight)" />
      <Rect x="0" y="0" width="480" height="40" fill="url(#fadeTop)" />
      <Rect x="0" y="360" width="480" height="40" fill="url(#fadeBottom)" />
    </Svg>
  );

  // Render a single festival card
  const renderFestivalCard = ({ item, index }: { item: typeof festivalZones[0]; index: number }) => (
    <View style={styles.festivalCardWrapper}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.dots}>
            {festivalZones.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeZoneIndex && styles.dotActive]} />
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={() => places[0] && handlePlacePress(places[0])}
          activeOpacity={0.95}
        >
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          
          <View style={styles.imageBottomContent}>
            <Text style={styles.imageTitle}>{item.name}</Text>
            <View style={styles.imageLocation}>
              <Ionicons name="navigate" size={14} color="white" />
              <Text style={styles.imageLocationText}>{item.subtitle}</Text>
            </View>
          </View>

          <View style={styles.avatarStack}>
            {images.fans.map((uri, i) => (
              <Image 
                key={i} 
                source={{ uri }} 
                style={[styles.stackAvatar, { marginLeft: i > 0 ? -8 : 0, zIndex: 10 - i }]} 
              />
            ))}
            <View style={styles.stackCount}>
              <Text style={styles.stackCountText}>{item.fans}+</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <View style={styles.statsLeft}>
            <View style={styles.stat}>
              <Ionicons name="water-outline" size={20} color="#60A5FA" />
              <Text style={styles.statText}>{item.wind}</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="sunny" size={20} color="#FBBF24" />
              <Text style={styles.statText}>{item.temp}</Text>
            </View>
          </View>
          <View style={styles.statsRight}>
            <TouchableOpacity style={styles.statButton}>
              <Ionicons name="chatbubble-outline" size={22} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.statButton}>
              <Ionicons name="bookmark-outline" size={22} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.label}>HOST CITY GUIDE</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>New York City</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-down" size={24} color="#F97316" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Swipeable Festival Zone Cards */}
        <FlatList
          ref={festivalListRef}
          data={festivalZones}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={FESTIVAL_CARD_WIDTH}
          decelerationRate="fast"
          onScroll={handleFestivalCardScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.festivalCardsContainer}
          keyExtractor={(item) => item.id}
          renderItem={renderFestivalCard}
          style={styles.festivalList}
        />

        {/* Route Map Section - Full bleed with fading edges */}
        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <Text style={styles.routeLabel}>Your location</Text>
            <Text style={styles.routeTitle}>{activeZone.name}</Text>
          </View>
          
          {/* Full-bleed Map - synced with festival card */}
          <View style={styles.mapContainer}>
            {renderMapWithRoute()}
          </View>
        </View>

        {/* Recommended Section */}
        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsScroll}
          >
            {nearbyPlaces.map((place, index) => (
              <TouchableOpacity
                key={place.id}
                style={styles.placeCard}
                onPress={() => handlePlacePress(place)}
                activeOpacity={0.95}
              >
                <Image source={{ uri: images.places[index % 3] }} style={styles.placeImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.placeGradient}
                />
                <View style={styles.placeContent}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <View style={styles.placeLocation}>
                    <Ionicons name="location" size={10} color="#D1D5DB" />
                    <Text style={styles.placeType}>{place.categoryLabel}</Text>
                  </View>
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>{place.rating}</Text>
                  <Ionicons name="star" size={10} color="#FBBF24" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Chat Preview */}
        <View style={styles.section}>
          <View style={styles.chatRow}>
            <Image source={{ uri: images.chatUser }} style={styles.chatAvatar} />
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>
                Hey! Any recommendations for best sports bars near the stadium?
              </Text>
            </View>
          </View>
          <View style={styles.chatButtonRow}>
            <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
              <Text style={styles.chatButtonText}>Join Fan Chat</Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#F97316',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
  titleSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  // Festival Cards
  festivalList: {
    marginBottom: 24,
  },
  festivalCardsContainer: {
    paddingHorizontal: 24,
  },
  festivalCardWrapper: {
    width: FESTIVAL_CARD_WIDTH,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 40,
      },
      android: { elevation: 8 },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  dots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#F97316',
  },
  imageContainer: {
    height: 192,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  imageBottomContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  imageLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  imageLocationText: {
    fontSize: 12,
    color: '#E5E7EB',
  },
  avatarStack: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  stackCount: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
    borderWidth: 2,
    borderColor: 'white',
  },
  stackCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsRight: {
    flexDirection: 'row',
    gap: 12,
  },
  statButton: {
    padding: 4,
  },
  // Map Section
  mapSection: {
    marginBottom: 32,
  },
  mapHeader: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  routeLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  routeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  mapContainer: {
    height: 280,
    width: '100%',
  },
  // Recommended Section
  recommendedSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F97316',
  },
  cardsScroll: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  placeCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  placeGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  placeContent: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  placeName: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  placeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  placeType: {
    fontSize: 10,
    color: '#D1D5DB',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
  // Chat
  chatRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 12,
  },
  chatBubble: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    borderTopLeftRadius: 0,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  chatText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  chatButtonRow: {
    alignItems: 'flex-end',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F97316',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#F97316',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: { elevation: 8 },
    }),
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});
