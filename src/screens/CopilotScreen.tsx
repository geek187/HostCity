import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { initialChatMessages, ChatMessage } from '../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 72) / 2;

const images = {
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM0hnT3fLVXDv5Np8A1OD3ZJzd0gPuzSjfZS5028YuguuxJQkwqsOKJTuO79z2C0t5a4C2Ddx_v703Iaa78aSx-ZO-hN6Tw_05VZNFxzywu1KDXuIV46y6AALDT8AvnkgDABAF95KMjQ8sjCvxgoKgWdy36D8Utg7EqyzBVraMorFnk40uiBe7JBpNQb8XScZINoXVgi1JaXvBMTw04Fiy9tviBOK04e_oqX4tVSFCk80SalzCzYN_xVRV9k49_JeBnm-z5iLUrtc',
  assistant: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnZL1QFzt1v8j49FLc3RlbqrjRWwrJvSYcGYykfp8VGXMPXUYReDEKAnH3dGA4Ow6QEzXSkPvofrh3HSyuZSqRx2G_Vhol9Rcl3v-UlN7CQ3hs2ud8vE_S_bQofUJyW44Vn8a2-s21FsKIfjxm2RIZ2__rnQTp80SBWmqCXGp0oNVIf-VhcCbqtM8vbooNi_nwcTZsBx2x9aj4aJCQK4sv0AlfqjR6CaLdkNv5b8MVY96vEPmA68yrGoG76esM2fgfY1m3-f6XVvc',
  places: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLKLWLqPA6KBiTbCVHvwqcsJRf7UwpoqtwtdscxUlWQns6AHjjG40-PznTPYAwGUVo6q9gGv5rpt_OYvRM-efv3hWGG6llv_b3foACmvBqUnG6o0Zx8LcQf0TMfcXKeUlU0-MwmaTgzEBp-bAqZYoKqrelrw4xaJSB8hs6-7Z8w46WVFgIrX_fiVrW_quNiahDK8Ay93Lbei8r4dnYf8H9pHYXKL1a611THuAl7m6Urd_BySEFjPkSGtpqIuMs8HPldjO5ttzWRc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDBM5Tj47u1UUcqYPIbc9Fzrf3IsxiaKjZIPf1QEd8ZP5xP3ID-ZaiQOudM8zvotAibpOTjNpeAnp-DJ15-1gRdbauzlzsjgSa3U7YurZWcHb6EZR5Zei6LpRo8sowcTZh7xOUph77n9tRP_N4KO_LYLOowHbFzXt7vrI9iH8nelM_g_YBwrDq82jucGly01NS2GTxZ_YWyCeqCioavwLDtZHdZ-0egQ7wkKD3p5CbWBVPihnCGw49mmqAmmc69NNbac_-NZLYJEUI',
  ],
};

export function CopilotScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMessage: ChatMessage = { id: String(Date.now()), type: 'user', message: inputText.trim(), timestamp: 'Just now' };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = { id: String(Date.now() + 1), type: 'assistant', message: generateResponse(inputText.trim()), timestamp: 'Just now' };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('bar') || q.includes('watch')) {
      return `Great question! Here are the top sports bars near MetLife Stadium:\n\n🍺 Stadium Sports Bar - 0.3mi\n🍻 Goal Line Grill - 0.5mi\n🍷 Fan Zone Pub - 0.7mi`;
    }
    if (q.includes('route') || q.includes('stadium')) {
      return `Here's the best route:\n\n🚶 Walk to Secaucus Junction (8 min)\n🚇 NJ Transit to Meadowlands (12 min)\n\n⏱️ Total: ~25 minutes`;
    }
    return `I can help with routes, crowds, safety, and places in NY/NJ!`;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.blurOrange} />

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
        <Text style={styles.label}>AI ASSISTANT</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Fan Guide</Text>
          <View style={styles.onlineIndicator}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
      </View>

      {/* Chat */}
      <ScrollView ref={scrollViewRef} style={styles.chatArea} contentContainerStyle={styles.chatContent} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageRow, msg.type === 'user' && styles.messageRowUser]}>
            {msg.type === 'assistant' && <Image source={{ uri: images.assistant }} style={styles.messageAvatar} />}
            <View style={[styles.messageBubble, msg.type === 'user' ? styles.bubbleUser : styles.bubbleAssistant]}>
              <Text style={[styles.messageText, msg.type === 'user' && styles.messageTextUser]}>{msg.message}</Text>
              <Text style={[styles.messageTime, msg.type === 'user' && styles.messageTimeUser]}>{msg.timestamp}</Text>
            </View>
          </View>
        ))}

        {/* Place Recommendations */}
        {messages.length > 1 && (
          <View style={styles.placeCards}>
            {[{ name: 'Stadium Sports Bar', type: 'Sports Bar', rating: '4.8' }, { name: 'Goal Line Grill', type: 'Restaurant', rating: '4.6' }].map((place, i) => (
              <TouchableOpacity key={i} style={styles.placeCard} activeOpacity={0.95}>
                <Image source={{ uri: images.places[i] }} style={styles.placeImage} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.placeGradient} />
                <View style={styles.placeContent}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <View style={styles.placeLocation}>
                    <Ionicons name="location" size={10} color="#D1D5DB" />
                    <Text style={styles.placeType}>{place.type}</Text>
                  </View>
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>{place.rating}</Text>
                  <Ionicons name="star" size={10} color="#FBBF24" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {isTyping && (
          <View style={styles.messageRow}>
            <Image source={{ uri: images.assistant }} style={styles.messageAvatar} />
            <View style={[styles.messageBubble, styles.bubbleAssistant]}>
              <View style={styles.typingDots}>
                <View style={[styles.typingDot, { opacity: 0.4 }]} />
                <View style={[styles.typingDot, { opacity: 0.6 }]} />
                <View style={[styles.typingDot, { opacity: 0.8 }]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Suggestions */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestions} contentContainerStyle={styles.suggestionsContent}>
        {['Best bars nearby', 'Route to stadium', 'Safety info'].map((label, i) => (
          <TouchableOpacity key={i} style={styles.suggestionChip} onPress={() => setInputText(label)}>
            <Text style={styles.suggestionText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything..."
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic-outline" size={22} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} onPress={handleSend} disabled={!inputText.trim()}>
          <Ionicons name="arrow-forward" size={20} color={inputText.trim() ? 'white' : '#9CA3AF'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  blurOrange: { position: 'absolute', top: 80, right: -64, width: 256, height: 256, borderRadius: 128, backgroundColor: 'rgba(249, 115, 22, 0.1)' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 16 },
  headerButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarContainer: { position: 'relative' },
  avatar: { width: 40, height: 40, borderRadius: 12, borderWidth: 2, borderColor: 'white' },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#F97316', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'white' },
  badgeText: { fontSize: 10, fontWeight: '700', color: 'white' },
  titleSection: { paddingHorizontal: 24, marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '500', color: '#6B7280', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 30, fontWeight: '700', color: '#111827' },
  onlineIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  onlineText: { fontSize: 12, color: '#22C55E', fontWeight: '500' },
  chatArea: { flex: 1 },
  chatContent: { padding: 24, paddingBottom: 32 },
  messageRow: { flexDirection: 'row', marginBottom: 16 },
  messageRowUser: { justifyContent: 'flex-end' },
  messageAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8, borderWidth: 2, borderColor: 'white' },
  messageBubble: { maxWidth: '75%', padding: 12, borderRadius: 16 },
  bubbleUser: { backgroundColor: '#F97316', borderBottomRightRadius: 4 },
  bubbleAssistant: { backgroundColor: 'white', borderBottomLeftRadius: 4, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 }, android: { elevation: 2 } }) },
  messageText: { fontSize: 14, color: '#4B5563', marginBottom: 4, lineHeight: 20 },
  messageTextUser: { color: 'white' },
  messageTime: { fontSize: 10, color: '#9CA3AF' },
  messageTimeUser: { color: 'rgba(255,255,255,0.6)' },
  placeCards: { flexDirection: 'row', gap: 12, marginTop: 12, marginBottom: 16 },
  placeCard: { width: CARD_WIDTH, height: 180, borderRadius: 16, overflow: 'hidden', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 }, android: { elevation: 4 } }) },
  placeImage: { width: '100%', height: '100%' },
  placeGradient: { ...StyleSheet.absoluteFillObject },
  placeContent: { position: 'absolute', bottom: 12, left: 12 },
  placeName: { fontSize: 14, fontWeight: '700', color: 'white', marginBottom: 2 },
  placeLocation: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  placeType: { fontSize: 10, color: '#D1D5DB' },
  ratingBadge: { position: 'absolute', bottom: 12, right: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, gap: 2 },
  ratingText: { fontSize: 10, fontWeight: '700', color: 'white' },
  typingDots: { flexDirection: 'row', gap: 4, paddingVertical: 4 },
  typingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#9CA3AF' },
  suggestions: { borderTopWidth: 1, borderTopColor: '#E5E7EB', backgroundColor: 'white' },
  suggestionsContent: { padding: 12, gap: 8 },
  suggestionChip: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#F3F4F6', borderRadius: 9999, marginRight: 8 },
  suggestionText: { fontSize: 14, color: '#4B5563' },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 24, paddingTop: 8, gap: 8, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  inputRow: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#F3F4F6', borderRadius: 16, paddingHorizontal: 12, paddingVertical: Platform.OS === 'ios' ? 8 : 0, minHeight: 48 },
  textInput: { flex: 1, fontSize: 14, color: '#111827', maxHeight: 100, paddingVertical: Platform.OS === 'ios' ? 0 : 8 },
  micButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  sendButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center', ...Platform.select({ ios: { shadowColor: '#F97316', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }, android: { elevation: 4 } }) },
  sendButtonDisabled: { backgroundColor: '#E5E7EB' },
});
