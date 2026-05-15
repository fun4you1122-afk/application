import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from '../theme';
import { WethinkContent } from '../data/content';
import { ScreenBackground } from '../components/ScreenBackground';
import { GlassCard } from '../components/GlassCard';

const { width } = Dimensions.get('window');

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
};

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(
    WethinkContent.chatMessages as Message[]
  );
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const typingDot1 = useRef(new Animated.Value(0.3)).current;
  const typingDot2 = useRef(new Animated.Value(0.3)).current;
  const typingDot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isTyping) {
      const animateDot = (anim: Animated.Value, delay: number) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
          ])
        ).start();
      };
      animateDot(typingDot1, 0);
      animateDot(typingDot2, 150);
      animateDot(typingDot3, 300);
    }
  }, [isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponses = [
        'I\'m analyzing your request... WeThink\'s AI systems are processing over 50M data points daily across our enterprise clients.',
        'Based on current metrics, our cloud infrastructure maintains 99.9% uptime across all UAE datacenters. Should I prepare a detailed report?',
        'Our cybersecurity suite has flagged and neutralized 0 threats this month. Compliance status: fully certified.',
        'The latest AI model deployment shows 98.3% accuracy. Recommend reviewing the validation dataset before final release.',
      ];
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  const quickActions = ['Project Status', 'Analytics', 'Security Alert', 'Team Update'];

  return (
    <ScreenBackground showParticles={false} showOrbs variant="purple">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.aiAvatar}>
            <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.aiAvatarGrad}>
              <Text style={styles.aiAvatarIcon}>🤖</Text>
            </LinearGradient>
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>WeThink AI</Text>
            <Text style={styles.headerStatus}>● Online • Powered by GPT-Enterprise</Text>
          </View>
          <TouchableOpacity style={styles.menuBtn}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messages}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {/* AI intro card */}
          <View style={styles.introCard}>
            <LinearGradient
              colors={['rgba(139,92,246,0.15)', 'rgba(139,92,246,0.04)']}
              style={styles.introCardGrad}
            >
              <Text style={styles.introEmoji}>🚀</Text>
              <Text style={styles.introTitle}>WeThink AI Assistant</Text>
              <Text style={styles.introText}>
                Enterprise intelligence at your fingertips. Ask about projects, analytics, AI deployments, or anything tech.
              </Text>
            </LinearGradient>
          </View>

          {messages.map((msg, i) => (
            <MessageBubble key={msg.id} message={msg} index={i} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <View style={styles.typingRow}>
              <View style={styles.typingAvatar}>
                <Text style={{ fontSize: 14 }}>🤖</Text>
              </View>
              <View style={styles.typingBubble}>
                {[typingDot1, typingDot2, typingDot3].map((dot, i) => (
                  <Animated.View key={i} style={[styles.typingDot, { opacity: dot, transform: [{ scale: dot }] }]} />
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick actions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickActions}
          contentContainerStyle={styles.quickActionsContent}
        >
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action}
              style={styles.quickChip}
              onPress={() => setInput(action)}
            >
              <Text style={styles.quickChipText}>{action}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <View style={styles.inputWrap}>
            <TextInput
              ref={inputRef}
              value={input}
              onChangeText={setInput}
              placeholder="Ask WeThink AI..."
              placeholderTextColor={Colors.whiteAlpha30}
              style={styles.input}
              multiline
              maxLength={500}
              onSubmitEditing={handleSend}
            />
          </View>
          <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
            <LinearGradient colors={['#00D4FF', '#0066FF']} style={styles.sendBtnGrad}>
              <Text style={styles.sendIcon}>↑</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
};

const MessageBubble: React.FC<{ message: Message; index: number }> = ({ message, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(message.sender === 'user' ? 20 : -20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 10, useNativeDriver: true }),
    ]).start();
  }, []);

  const isUser = message.sender === 'user';

  return (
    <Animated.View
      style={[
        styles.bubbleRow,
        isUser ? styles.bubbleRowUser : styles.bubbleRowAI,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      {!isUser && (
        <View style={styles.bubbleAvatar}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.bubbleAvatarGrad}>
            <Text style={{ fontSize: 12 }}>🤖</Text>
          </LinearGradient>
        </View>
      )}
      <View style={styles.bubbleMain}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
          {isUser ? (
            <LinearGradient colors={['#00D4FF', '#0066FF']} style={styles.userBubbleGrad}>
              <Text style={styles.bubbleTextUser}>{message.text}</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.bubbleTextAI}>{message.text}</Text>
          )}
        </View>
        <Text style={[styles.bubbleTime, isUser && styles.bubbleTimeUser]}>{message.time}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: Spacing.md,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  aiAvatar: { position: 'relative' },
  aiAvatarGrad: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  aiAvatarIcon: { fontSize: 22 },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.darkBg,
  },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.white },
  headerStatus: { fontSize: 11, color: Colors.success, marginTop: 2 },
  menuBtn: { padding: 8 },
  menuIcon: { fontSize: 20, color: Colors.whiteAlpha50 },
  messages: { flex: 1 },
  messagesContent: { padding: 16, paddingBottom: 8 },
  introCard: { borderRadius: Radius.lg, overflow: 'hidden', marginBottom: 20 },
  introCardGrad: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.2)',
  },
  introEmoji: { fontSize: 32, marginBottom: 8 },
  introTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 6 },
  introText: { fontSize: 13, color: Colors.whiteAlpha60, textAlign: 'center', lineHeight: 20 },
  bubbleRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-end', gap: 8 },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleRowAI: { justifyContent: 'flex-start' },
  bubbleAvatar: { width: 32, height: 32 },
  bubbleAvatarGrad: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  bubbleMain: { maxWidth: width * 0.7 },
  bubble: { borderRadius: 18, overflow: 'hidden' },
  bubbleUser: { borderBottomRightRadius: 6 },
  bubbleAI: {
    backgroundColor: Colors.glassMid,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubbleGrad: { paddingHorizontal: 14, paddingVertical: 10 },
  bubbleTextUser: { fontSize: 14, color: Colors.white, lineHeight: 20 },
  bubbleTextAI: { fontSize: 14, color: Colors.whiteAlpha90, lineHeight: 20 },
  bubbleTime: { fontSize: 10, color: Colors.whiteAlpha30, marginTop: 4, marginLeft: 4 },
  bubbleTimeUser: { textAlign: 'right', marginRight: 4 },
  typingRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 16 },
  typingAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.glassMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingBubble: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: Colors.glassMid,
    borderRadius: 18,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.neonPurple,
  },
  quickActions: { maxHeight: 44, marginBottom: 8 },
  quickActionsContent: { paddingHorizontal: 16, gap: 8 },
  quickChip: {
    backgroundColor: Colors.glassHigh,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  quickChipText: { fontSize: 12, color: Colors.neonPurple, fontWeight: '600' },
  inputBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: Colors.glassBorder,
    alignItems: 'flex-end',
  },
  inputWrap: {
    flex: 1,
    backgroundColor: Colors.glassMid,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  input: { color: Colors.white, fontSize: 14, lineHeight: 20 },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendBtnGrad: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: { fontSize: 20, color: '#fff', fontWeight: '700' },
});
