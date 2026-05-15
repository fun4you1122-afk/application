import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from '../theme';
import { WethinkContent } from '../data/content';
import { ScreenBackground } from '../components/ScreenBackground';
import { GlassCard } from '../components/GlassCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export const TeamScreen: React.FC = () => {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScreenBackground showParticles variant="purple">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerSlide }] }]}
        >
          <View style={styles.labelRow}>
            <View style={[styles.labelDot, { backgroundColor: Colors.neonPurple }]} />
            <Text style={[styles.labelText, { color: Colors.neonPurple }]}>THE TEAM</Text>
          </View>
          <Text style={styles.title}>Meet Our Leaders</Text>
          <Text style={styles.subtitle}>
            World-class talent driving innovation across the Middle East
          </Text>
        </Animated.View>

        {/* Team stats bar */}
        <GlassCard
          gradient={['rgba(139,92,246,0.12)', 'rgba(139,92,246,0.04)']}
          borderColor="rgba(139,92,246,0.2)"
          style={styles.statsBar}
        >
          {[
            { value: '150+', label: 'Team Members' },
            { value: '18', label: 'Nationalities' },
            { value: '8+', label: 'Avg. Years Exp' },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <View style={styles.statDivider} />}
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </GlassCard>

        {/* Team grid */}
        <View style={styles.grid}>
          {WethinkContent.team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </View>

        {/* Departments */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Departments</Text>
        </View>
        {['Engineering', 'AI/ML', 'Design', 'Cloud', 'Security', 'Leadership'].map((dept, i) => (
          <DeptRow key={dept} dept={dept} index={i} />
        ))}

        {/* Join card */}
        <GlassCard
          gradient={['rgba(139,92,246,0.15)', 'rgba(0,212,255,0.08)']}
          borderColor="rgba(139,92,246,0.25)"
          style={styles.joinCard}
        >
          <Text style={styles.joinTitle}>Join WeThink</Text>
          <Text style={styles.joinSubtitle}>
            We're always looking for exceptional talent to join our mission of building the future.
          </Text>
          <TouchableOpacity style={styles.joinBtn}>
            <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.joinBtnGrad}>
              <Text style={styles.joinBtnText}>View Open Positions →</Text>
            </LinearGradient>
          </TouchableOpacity>
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>
    </ScreenBackground>
  );
};

const TeamCard: React.FC<{
  member: typeof WethinkContent.team[0];
  index: number;
}> = ({ member, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 80),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 80, friction: 10, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.memberCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity activeOpacity={0.85}>
        <LinearGradient
          colors={[`${member.color}15`, `${member.color}05`]}
          style={styles.memberCardGrad}
        >
          <View style={[styles.memberBorder, { borderColor: `${member.color}25` }]}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={[member.color, `${member.color}88`]}
                style={styles.avatar}
              >
                <Text style={styles.avatarText}>{member.avatar}</Text>
              </LinearGradient>
              <View style={[styles.avatarGlow, { backgroundColor: member.color }]} />
            </View>

            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={[styles.memberRole, { color: member.color }]}>{member.role}</Text>
            <View style={[styles.deptBadge, { backgroundColor: `${member.color}15`, borderColor: `${member.color}25` }]}>
              <Text style={[styles.deptText, { color: member.color }]}>{member.dept}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const DeptRow: React.FC<{ dept: string; index: number }> = ({ dept, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;

  const deptData: Record<string, { count: number; color: string; pct: number }> = {
    Engineering: { count: 45, color: Colors.electricBlue, pct: 85 },
    'AI/ML': { count: 30, color: Colors.teal, pct: 70 },
    Design: { count: 15, color: Colors.neonPurple, pct: 45 },
    Cloud: { count: 25, color: Colors.success, pct: 60 },
    Security: { count: 20, color: Colors.warning, pct: 55 },
    Leadership: { count: 15, color: Colors.cyan, pct: 40 },
  };
  const data = deptData[dept];

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 100),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(widthAnim, { toValue: data.pct, duration: 900, useNativeDriver: false }),
      ]),
    ]).start();
  }, []);

  const barWidth = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.deptRow, { opacity: fadeAnim }]}>
      <View style={styles.deptInfo}>
        <Text style={styles.deptName}>{dept}</Text>
        <Text style={[styles.deptCount, { color: data.color }]}>{data.count}</Text>
      </View>
      <View style={styles.deptTrack}>
        <Animated.View style={[styles.deptBar, { width: barWidth, backgroundColor: data.color }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  header: { paddingHorizontal: Spacing.md, paddingTop: 60, paddingBottom: Spacing.md },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  labelDot: { width: 6, height: 6, borderRadius: 3 },
  labelText: { fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  title: { fontSize: 36, fontWeight: '800', color: Colors.white, letterSpacing: -1, marginBottom: 12 },
  subtitle: { fontSize: 15, color: Colors.whiteAlpha60, lineHeight: 24 },
  statsBar: { marginHorizontal: Spacing.md, marginBottom: Spacing.md, flexDirection: 'row' },
  statDivider: { width: 1, backgroundColor: Colors.glassBorder, marginVertical: 4 },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.white, letterSpacing: -0.5 },
  statLabel: { fontSize: 11, color: Colors.whiteAlpha50, marginTop: 2 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 0,
  },
  memberCard: {
    width: CARD_WIDTH,
    margin: 6,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  memberCardGrad: { borderRadius: Radius.lg },
  memberBorder: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    alignItems: 'center',
  },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '800', color: '#fff' },
  avatarGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 26,
    opacity: 0.12,
  },
  memberName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  memberRole: { fontSize: 11, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  deptBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  deptText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
  sectionHeader: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  deptRow: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  deptInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  deptName: { fontSize: 14, fontWeight: '600', color: Colors.whiteAlpha80 },
  deptCount: { fontSize: 14, fontWeight: '800' },
  deptTrack: {
    height: 4,
    backgroundColor: Colors.glassMid,
    borderRadius: 2,
    overflow: 'hidden',
  },
  deptBar: { height: '100%', borderRadius: 2 },
  joinCard: { marginHorizontal: Spacing.md, marginTop: Spacing.md },
  joinTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 8 },
  joinSubtitle: { fontSize: 14, color: Colors.whiteAlpha60, lineHeight: 22, marginBottom: 16 },
  joinBtn: { borderRadius: Radius.full, overflow: 'hidden', alignSelf: 'flex-start' },
  joinBtnGrad: { paddingHorizontal: 20, paddingVertical: 12 },
  joinBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
});
