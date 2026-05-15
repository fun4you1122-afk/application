import React, { useEffect, useRef, useState } from 'react';
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
import { BlurView } from 'expo-blur';
import { Colors, Spacing, Radius } from '../theme';
import { Typography } from '../theme/typography';
import { WethinkContent } from '../data/content';
import { GlassCard } from '../components/GlassCard';
import { StatCard } from '../components/StatCard';
import { ScreenBackground } from '../components/ScreenBackground';
import { NeonButton } from '../components/NeonButton';

const { width } = Dimensions.get('window');

interface MetricBarProps {
  label: string;
  value: number;
  color: string;
  delay: number;
}

const MetricBar: React.FC<MetricBarProps> = ({ label, value, color, delay }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(widthAnim, {
        toValue: value,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const barWidth = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={mbStyles.container}>
      <View style={mbStyles.header}>
        <Text style={mbStyles.label}>{label}</Text>
        <Text style={[mbStyles.value, { color }]}>{value}%</Text>
      </View>
      <View style={mbStyles.track}>
        <Animated.View style={[mbStyles.fill, { width: barWidth, backgroundColor: color }]}>
          <View style={[mbStyles.glow, { shadowColor: color }]} />
        </Animated.View>
      </View>
    </View>
  );
};

const mbStyles = StyleSheet.create({
  container: { marginBottom: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, color: Colors.whiteAlpha70, fontWeight: '500' },
  value: { fontSize: 13, fontWeight: '700' },
  track: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  glow: {
    position: 'absolute',
    right: 0,
    top: -2,
    width: 12,
    height: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});

export const DashboardScreen: React.FC = () => {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'AI', 'Cloud', 'Security'];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScreenBackground showParticles={false} showOrbs>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerOpacity, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <View>
            <Text style={styles.greeting}>Good morning, ✦</Text>
            <Text style={styles.company}>WeThink Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.avatarBtn}>
            <LinearGradient colors={['#00D4FF', '#0066FF']} style={styles.avatar}>
              <Text style={styles.avatarText}>W</Text>
            </LinearGradient>
            <View style={styles.onlineDot} />
          </TouchableOpacity>
        </Animated.View>

        {/* Hero metric card */}
        <GlassCard
          gradient={['rgba(0,212,255,0.12)', 'rgba(0,102,255,0.06)', 'rgba(0,0,0,0)']}
          style={styles.heroCard}
          borderColor="rgba(0,212,255,0.2)"
        >
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroLabel}>Total Revenue</Text>
              <Text style={styles.heroValue}>AED 48.2M</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>▲ 34%</Text>
            </View>
          </View>
          <View style={styles.heroChart}>
            {[65, 80, 55, 90, 75, 95, 85, 100].map((h, i) => (
              <ChartBar key={i} height={h} index={i} />
            ))}
          </View>
          <Text style={styles.heroSubtext}>vs last quarter • Q1 2025</Text>
        </GlassCard>

        {/* Stats grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsGrid}>
          {WethinkContent.stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              color={stat.color}
              delay={i * 100}
            />
          ))}
        </View>

        {/* Performance metrics */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Performance</Text>
        </View>
        <GlassCard style={styles.performanceCard}>
          <MetricBar label="AI Model Accuracy" value={95} color={Colors.electricBlue} delay={200} />
          <MetricBar label="Cloud Uptime" value={99} color={Colors.teal} delay={350} />
          <MetricBar label="Security Score" value={98} color={Colors.neonPurple} delay={500} />
          <MetricBar label="Client Satisfaction" value={94} color={Colors.success} delay={650} />
        </GlassCard>

        {/* Filter tabs */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Projects</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            >
              {activeFilter === f ? (
                <LinearGradient colors={['#00D4FF', '#0066FF']} style={styles.filterChipGrad}>
                  <Text style={[styles.filterText, styles.filterTextActive]}>{f}</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.filterText}>{f}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Project cards */}
        {WethinkContent.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 100} />
        ))}

        {/* AI Insights card */}
        <GlassCard
          gradient={['rgba(139,92,246,0.15)', 'rgba(139,92,246,0.04)']}
          borderColor="rgba(139,92,246,0.25)"
          style={styles.aiCard}
        >
          <View style={styles.aiHeader}>
            <View style={styles.aiIconWrap}>
              <Text style={styles.aiIcon}>🤖</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiTitle}>AI Insight</Text>
              <Text style={styles.aiSubtitle}>Generated just now</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          <Text style={styles.aiMessage}>
            Dubai Smart Platform hit 3M users — 18% above target. Recommend scaling cloud infrastructure by 20% before Q2 peak. AI model retraining scheduled for March 15.
          </Text>
          <NeonButton title="View Full Report" onPress={() => {}} variant="secondary" size="sm" style={{ marginTop: 12 }} />
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>
    </ScreenBackground>
  );
};

const ChartBar: React.FC<{ height: number; index: number }> = ({ height, index }) => {
  const heightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 80),
      Animated.spring(heightAnim, {
        toValue: height,
        tension: 60,
        friction: 8,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={chartStyles.barWrap}>
      <Animated.View style={[chartStyles.bar, { height: animatedHeight }]}>
        <LinearGradient colors={['#00D4FF', '#0066FF44']} style={{ flex: 1 }} />
      </Animated.View>
    </View>
  );
};

const chartStyles = StyleSheet.create({
  barWrap: {
    flex: 1,
    height: 60,
    justifyContent: 'flex-end',
    marginHorizontal: 2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 3,
    overflow: 'hidden',
  },
});

const ProjectCard: React.FC<{ project: typeof WethinkContent.projects[0]; delay: number }> = ({
  project,
  delay,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <GlassCard
        gradient={[`${project.color}10`, `${project.color}04`]}
        borderColor={`${project.color}25`}
        style={styles.projectCard}
        onPress={() => {}}
      >
        <View style={styles.projectHeader}>
          <View style={[styles.projectDot, { backgroundColor: project.color, shadowColor: project.color }]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectCategory}>{project.category} • {project.year}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${project.color}20`, borderColor: `${project.color}40` }]}>
            <Text style={[styles.statusText, { color: project.color }]}>{project.status}</Text>
          </View>
        </View>
        <Text style={styles.projectDesc}>{project.description}</Text>
        <View style={styles.techRow}>
          {project.tech.map((t) => (
            <View key={t} style={styles.techChip}>
              <Text style={styles.techText}>{t}</Text>
            </View>
          ))}
        </View>
      </GlassCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 56 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginTop: 8,
  },
  greeting: { fontSize: 13, color: Colors.whiteAlpha50, marginBottom: 2 },
  company: { fontSize: 22, fontWeight: '800', color: Colors.white, letterSpacing: -0.5 },
  avatarBtn: { position: 'relative' },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: '800', color: '#fff' },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.darkBg,
  },
  heroCard: { marginHorizontal: Spacing.md, marginBottom: Spacing.md },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  heroLabel: { fontSize: 12, color: Colors.whiteAlpha50, marginBottom: 4, letterSpacing: 0.5 },
  heroValue: { fontSize: 32, fontWeight: '800', color: Colors.white, letterSpacing: -1 },
  heroBadge: {
    backgroundColor: 'rgba(16,240,138,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(16,240,138,0.3)',
  },
  heroBadgeText: { color: Colors.success, fontWeight: '700', fontSize: 13 },
  heroChart: { flexDirection: 'row', height: 60, alignItems: 'flex-end', marginBottom: 8 },
  heroSubtext: { fontSize: 11, color: Colors.whiteAlpha30, letterSpacing: 0.3 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.white, letterSpacing: -0.2 },
  seeAll: { fontSize: 13, color: Colors.electricBlue, fontWeight: '600' },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.md,
  },
  performanceCard: { marginHorizontal: Spacing.md, marginBottom: Spacing.md },
  filterRow: { paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  filterChip: {
    borderRadius: Radius.full,
    marginRight: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    backgroundColor: Colors.glass,
  },
  filterChipActive: { borderWidth: 0 },
  filterChipGrad: { paddingHorizontal: 18, paddingVertical: 8 },
  filterText: { paddingHorizontal: 18, paddingVertical: 8, color: Colors.whiteAlpha50, fontWeight: '600', fontSize: 13 },
  filterTextActive: { color: Colors.white, paddingHorizontal: 0, paddingVertical: 0 },
  projectCard: { marginHorizontal: Spacing.md, marginBottom: 12 },
  projectHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  projectDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  projectTitle: { fontSize: 15, fontWeight: '700', color: Colors.white },
  projectCategory: { fontSize: 11, color: Colors.whiteAlpha50 },
  statusBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  projectDesc: { fontSize: 13, color: Colors.whiteAlpha60, lineHeight: 20, marginBottom: 10 },
  techRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  techChip: {
    backgroundColor: Colors.glassHigh,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  techText: { fontSize: 11, color: Colors.whiteAlpha70, fontWeight: '500' },
  aiCard: { marginHorizontal: Spacing.md, marginBottom: Spacing.md },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  aiIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(139,92,246,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiIcon: { fontSize: 20 },
  aiTitle: { fontSize: 15, fontWeight: '700', color: Colors.white },
  aiSubtitle: { fontSize: 11, color: Colors.whiteAlpha50 },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.error },
  liveText: { fontSize: 10, fontWeight: '800', color: Colors.error, letterSpacing: 1 },
  aiMessage: { fontSize: 14, color: Colors.whiteAlpha70, lineHeight: 22 },
});
