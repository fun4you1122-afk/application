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
import { HolographicIcon } from '../components/HolographicIcon';
import { NeonButton } from '../components/NeonButton';

const { width } = Dimensions.get('window');

export const ServicesScreen: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(titleSlide, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ScreenBackground showParticles variant="blue">
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
            { opacity: titleOpacity, transform: [{ translateY: titleSlide }] },
          ]}
        >
          <View style={styles.labelRow}>
            <View style={styles.labelDot} />
            <Text style={styles.labelText}>WHAT WE DO</Text>
          </View>
          <Text style={styles.title}>Our Services</Text>
          <Text style={styles.subtitle}>
            Cutting-edge technology solutions built for the future of enterprise
          </Text>
        </Animated.View>

        {/* Services grid */}
        {WethinkContent.services.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={i}
            isSelected={selectedService === service.id}
            onPress={() =>
              setSelectedService(selectedService === service.id ? null : service.id)
            }
          />
        ))}

        {/* CTA section */}
        <GlassCard
          gradient={['rgba(0,212,255,0.1)', 'rgba(139,92,246,0.08)', 'rgba(0,0,0,0)']}
          borderColor="rgba(0,212,255,0.2)"
          style={styles.ctaCard}
        >
          <Text style={styles.ctaTitle}>Ready to transform your business?</Text>
          <Text style={styles.ctaSubtitle}>
            Talk to our experts and get a custom solution tailored to your needs
          </Text>
          <NeonButton
            title="Schedule a Consultation"
            onPress={() => {}}
            variant="primary"
            size="md"
            fullWidth
            style={{ marginTop: 16 }}
          />
          <NeonButton
            title="View Case Studies"
            onPress={() => {}}
            variant="ghost"
            size="md"
            fullWidth
            style={{ marginTop: 8 }}
          />
        </GlassCard>

        <View style={{ height: 100 }} />
      </ScrollView>
    </ScreenBackground>
  );
};

const ServiceCard: React.FC<{
  service: typeof WethinkContent.services[0];
  index: number;
  isSelected: boolean;
  onPress: () => void;
}> = ({ service, index, isSelected, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 100),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: isSelected ? 1 : 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [isSelected]);

  const maxHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.cardWrapper}
      >
        <LinearGradient
          colors={service.gradient as any}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.cardBorder, { borderColor: `${service.color}30` }]}>
            <View style={styles.cardMain}>
              <HolographicIcon
                icon={service.icon}
                color={service.color}
                size={52}
                gradient={[`${service.color}30`, `${service.color}10`]}
              />
              <View style={styles.cardText}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{service.title}</Text>
                  <Text style={[styles.cardArrow, isSelected && styles.cardArrowUp]}>›</Text>
                </View>
                <Text style={styles.cardSubtitle}>{service.subtitle}</Text>
                <View style={[styles.statBadge, { backgroundColor: `${service.color}18`, borderColor: `${service.color}35` }]}>
                  <View style={[styles.statDot, { backgroundColor: service.color }]} />
                  <Text style={[styles.statText, { color: service.color }]}>{service.stats}</Text>
                </View>
              </View>
            </View>

            {/* Expandable description */}
            <Animated.View style={[styles.expandable, { maxHeight }]}>
              <View style={[styles.expandDivider, { backgroundColor: `${service.color}20` }]} />
              <Text style={styles.expandText}>{service.description}</Text>
              <NeonButton
                title="Learn More"
                onPress={() => {}}
                variant="secondary"
                size="sm"
                style={{ marginTop: 12, alignSelf: 'flex-start' }}
              />
            </Animated.View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 60 },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    marginBottom: 8,
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
  labelText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: Colors.electricBlue,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.whiteAlpha60,
    lineHeight: 24,
  },
  cardWrapper: {
    marginHorizontal: Spacing.md,
    marginBottom: 12,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardGradient: {
    borderRadius: Radius.lg,
  },
  cardBorder: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
  },
  cardMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardText: { flex: 1 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, flex: 1 },
  cardArrow: {
    fontSize: 24,
    color: Colors.whiteAlpha50,
    transform: [{ rotate: '0deg' }],
  },
  cardArrowUp: {
    transform: [{ rotate: '90deg' }],
  },
  cardSubtitle: { fontSize: 12, color: Colors.whiteAlpha50, marginTop: 2, marginBottom: 8 },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  statDot: { width: 5, height: 5, borderRadius: 2.5 },
  statText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
  expandable: { overflow: 'hidden' },
  expandDivider: { height: 1, marginVertical: 12 },
  expandText: { fontSize: 14, color: Colors.whiteAlpha70, lineHeight: 22 },
  ctaCard: { marginHorizontal: Spacing.md, marginTop: 8 },
  ctaTitle: { fontSize: 20, fontWeight: '800', color: Colors.white, letterSpacing: -0.5, marginBottom: 8 },
  ctaSubtitle: { fontSize: 14, color: Colors.whiteAlpha60, lineHeight: 22 },
});
