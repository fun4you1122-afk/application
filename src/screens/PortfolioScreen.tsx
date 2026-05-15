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
import { Colors, Spacing, Radius } from '../theme';
import { WethinkContent } from '../data/content';
import { ScreenBackground } from '../components/ScreenBackground';
import { GlassCard } from '../components/GlassCard';

const { width } = Dimensions.get('window');

export const PortfolioScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  const categories = ['All', 'Government', 'Finance', 'Energy', 'Health'];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? WethinkContent.projects
    : WethinkContent.projects.filter((p) => p.category === selectedCategory);

  return (
    <ScreenBackground showParticles variant="blue">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerSlide }] }]}
        >
          <View style={styles.labelRow}>
            <View style={styles.labelDot} />
            <Text style={styles.labelText}>OUR WORK</Text>
          </View>
          <Text style={styles.title}>Portfolio</Text>
          <Text style={styles.subtitle}>
            Transformative projects powering the UAE's digital future
          </Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { value: '500+', label: 'Projects' },
              { value: '12', label: 'Countries' },
              { value: '200+', label: 'Clients' },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[styles.filterChip, selectedCategory === cat && styles.filterChipActive]}
              activeOpacity={0.8}
            >
              {selectedCategory === cat ? (
                <LinearGradient colors={['#00D4FF', '#0066FF']} style={styles.filterGrad}>
                  <Text style={styles.filterTextActive}>{cat}</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.filterText}>{cat}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Project cards */}
        {filteredProjects.map((project, i) => (
          <ProjectDetailCard key={project.id} project={project} index={i} />
        ))}

        {/* Clients section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trusted By</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.clientsRow}
          contentContainerStyle={styles.clientsContent}
        >
          {['ADNOC', 'Dubai Gov', 'ENBD', 'Etisalat', 'DEWA', 'DIFC', 'RTA', 'ADIB'].map((client) => (
            <View key={client} style={styles.clientChip}>
              <Text style={styles.clientText}>{client}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </ScreenBackground>
  );
};

const ProjectDetailCard: React.FC<{
  project: typeof WethinkContent.projects[0];
  index: number;
}> = ({ project, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 120),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <LinearGradient
        colors={[`${project.color}15`, `${project.color}05`, 'transparent']}
        style={styles.cardGrad}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.cardBorder, { borderColor: `${project.color}25` }]}>
          {/* Card header with banner */}
          <LinearGradient
            colors={[`${project.color}20`, 'transparent']}
            style={styles.cardBanner}
          >
            <View style={styles.cardBannerContent}>
              <View style={[styles.categoryBadge, { backgroundColor: `${project.color}20`, borderColor: `${project.color}35` }]}>
                <Text style={[styles.categoryText, { color: project.color }]}>{project.category}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: project.status === 'Live' ? 'rgba(16,240,138,0.15)' : 'rgba(245,158,11,0.15)', borderColor: project.status === 'Live' ? 'rgba(16,240,138,0.3)' : 'rgba(245,158,11,0.3)' }]}>
                {project.status === 'Live' && <View style={styles.statusDot} />}
                <Text style={[styles.statusText, { color: project.status === 'Live' ? Colors.success : Colors.warning }]}>
                  {project.status}
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Content */}
          <View style={styles.cardContent}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectDesc}>{project.description}</Text>

            <View style={styles.techRow}>
              {project.tech.map((t) => (
                <View key={t} style={[styles.techChip, { borderColor: `${project.color}30` }]}>
                  <Text style={[styles.techText, { color: project.color }]}>{t}</Text>
                </View>
              ))}
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.yearText}>Launched {project.year}</Text>
              <TouchableOpacity style={[styles.viewBtn, { borderColor: `${project.color}40` }]}>
                <Text style={[styles.viewBtnText, { color: project.color }]}>View Case Study →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: 60,
    paddingBottom: Spacing.md,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  labelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.electricBlue,
    shadowColor: Colors.electricBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  labelText: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: Colors.electricBlue },
  title: { fontSize: 36, fontWeight: '800', color: Colors.white, letterSpacing: -1, marginBottom: 12 },
  subtitle: { fontSize: 15, color: Colors.whiteAlpha60, lineHeight: 24, marginBottom: 20 },
  statsRow: {
    flexDirection: 'row',
    gap: 0,
    backgroundColor: Colors.glassMid,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: Colors.glassBorder,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.white, letterSpacing: -0.5 },
  statLabel: { fontSize: 11, color: Colors.whiteAlpha50, marginTop: 2 },
  filterRow: { paddingLeft: Spacing.md, marginBottom: Spacing.md },
  filterContent: { gap: 8, paddingRight: Spacing.md },
  filterChip: {
    borderRadius: Radius.full,
    overflow: 'hidden',
    backgroundColor: Colors.glassMid,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  filterChipActive: { borderWidth: 0 },
  filterGrad: { paddingHorizontal: 18, paddingVertical: 9 },
  filterText: { paddingHorizontal: 18, paddingVertical: 9, color: Colors.whiteAlpha60, fontWeight: '600', fontSize: 13 },
  filterTextActive: { color: Colors.white, fontWeight: '700', fontSize: 13 },
  card: {
    marginHorizontal: Spacing.md,
    marginBottom: 16,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardGrad: { borderRadius: Radius.xl },
  cardBorder: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardBanner: { padding: Spacing.md, paddingBottom: 8 },
  cardBannerContent: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  categoryText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success },
  statusText: { fontSize: 11, fontWeight: '700' },
  cardContent: { padding: Spacing.md, paddingTop: 8 },
  projectTitle: { fontSize: 18, fontWeight: '800', color: Colors.white, letterSpacing: -0.3, marginBottom: 8 },
  projectDesc: { fontSize: 14, color: Colors.whiteAlpha60, lineHeight: 22, marginBottom: 12 },
  techRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 14 },
  techChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    backgroundColor: Colors.glass,
  },
  techText: { fontSize: 11, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  yearText: { fontSize: 12, color: Colors.whiteAlpha40 },
  viewBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  viewBtnText: { fontSize: 12, fontWeight: '700' },
  sectionHeader: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  clientsRow: { marginBottom: Spacing.md },
  clientsContent: { paddingHorizontal: Spacing.md, gap: 8 },
  clientChip: {
    backgroundColor: Colors.glassMid,
    borderRadius: Radius.md,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  clientText: { fontSize: 13, fontWeight: '700', color: Colors.whiteAlpha70 },
});
