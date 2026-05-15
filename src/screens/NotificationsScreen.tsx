import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from '../theme';
import { WethinkContent } from '../data/content';
import { ScreenBackground } from '../components/ScreenBackground';

const typeConfig = {
  success: { color: Colors.success, icon: '✓', label: 'Success' },
  info: { color: Colors.electricBlue, icon: 'ℹ', label: 'Info' },
  warning: { color: Colors.warning, icon: '⚠', label: 'Warning' },
  error: { color: Colors.error, icon: '✕', label: 'Error' },
};

export const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(WethinkContent.notifications);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <ScreenBackground showParticles={false} showOrbs orbColor={Colors.teal} variant="teal">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerOpacity, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <View>
            <Text style={styles.title}>Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount} unread</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Notification items */}
        {notifications.map((notif, i) => (
          <NotifCard
            key={notif.id}
            notif={notif}
            index={i}
            onPress={() => {
              setNotifications((prev) =>
                prev.map((n) => n.id === notif.id ? { ...n, read: true } : n)
              );
            }}
          />
        ))}

        {/* Empty state placeholder */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>All notifications loaded</Text>
          <View style={styles.footerLine} />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </ScreenBackground>
  );
};

const NotifCard: React.FC<{
  notif: typeof WethinkContent.notifications[0];
  index: number;
  onPress: () => void;
}> = ({ notif, index, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const config = typeConfig[notif.type as keyof typeof typeConfig];

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 80),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.card, !notif.read && styles.cardUnread]}
      >
        <LinearGradient
          colors={notif.read ? ['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)'] : [`${config.color}12`, `${config.color}04`]}
          style={styles.cardGrad}
        >
          <View style={[styles.cardBorder, { borderColor: notif.read ? Colors.glassBorder : `${config.color}25` }]}>
            {/* Icon */}
            <View style={[styles.iconContainer, { backgroundColor: `${config.color}18`, borderColor: `${config.color}30` }]}>
              <Text style={[styles.iconText, { color: config.color }]}>{config.icon}</Text>
              {!notif.read && (
                <View style={[styles.unreadDot, { backgroundColor: config.color, shadowColor: config.color }]} />
              )}
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={[styles.notifTitle, !notif.read && styles.notifTitleUnread]}>
                  {notif.title}
                </Text>
                <Text style={styles.notifTime}>{notif.time}</Text>
              </View>
              <Text style={styles.notifBody}>{notif.body}</Text>
              <View style={[styles.typeBadge, { backgroundColor: `${config.color}15`, borderColor: `${config.color}25` }]}>
                <Text style={[styles.typeBadgeText, { color: config.color }]}>{config.label}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
  },
  title: { fontSize: 28, fontWeight: '800', color: Colors.white, letterSpacing: -0.5 },
  badge: {
    marginTop: 4,
    backgroundColor: 'rgba(0,212,255,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.3)',
  },
  badgeText: { fontSize: 11, color: Colors.electricBlue, fontWeight: '700' },
  markAllBtn: {
    backgroundColor: Colors.glassMid,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  markAllText: { fontSize: 12, color: Colors.whiteAlpha70, fontWeight: '600' },
  card: {
    marginHorizontal: Spacing.md,
    marginBottom: 10,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  cardUnread: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  cardGrad: { borderRadius: Radius.lg },
  cardBorder: {
    flexDirection: 'row',
    gap: 12,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  iconText: { fontSize: 18, fontWeight: '700' },
  unreadDot: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.darkBg,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  content: { flex: 1 },
  contentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  notifTitle: { fontSize: 14, fontWeight: '600', color: Colors.whiteAlpha70, flex: 1 },
  notifTitleUnread: { color: Colors.white, fontWeight: '700' },
  notifTime: { fontSize: 11, color: Colors.whiteAlpha30 },
  notifBody: { fontSize: 13, color: Colors.whiteAlpha60, lineHeight: 20, marginBottom: 8 },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  typeBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: Spacing.md,
    marginTop: 16,
  },
  footerLine: { flex: 1, height: 1, backgroundColor: Colors.glassBorder },
  footerText: { fontSize: 11, color: Colors.whiteAlpha30, fontWeight: '500' },
});
