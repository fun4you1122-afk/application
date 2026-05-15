import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme';
import { ParticleField } from '../components/ParticleField';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const ringScale1 = useRef(new Animated.Value(0)).current;
  const ringScale2 = useRef(new Animated.Value(0)).current;
  const ringScale3 = useRef(new Animated.Value(0)).current;
  const ringOpacity1 = useRef(new Animated.Value(0)).current;
  const ringOpacity2 = useRef(new Animated.Value(0)).current;
  const ringOpacity3 = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineSlide = useRef(new Animated.Value(20)).current;
  const screenFade = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 10000, useNativeDriver: true })
    ).start();

    // Main sequence
    Animated.sequence([
      Animated.delay(300),
      // Logo appears
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(200),
      // Rings expand
      Animated.parallel([
        Animated.timing(ringScale1, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(ringOpacity1, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(ringScale2, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(ringOpacity2, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(ringScale3, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(ringOpacity3, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      // Tagline appears
      Animated.parallel([
        Animated.timing(taglineOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(taglineSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      Animated.delay(1200),
      // Fade out
      Animated.timing(screenFade, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start(() => onFinish());
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: screenFade }]}>
      <StatusBar hidden />
      <LinearGradient
        colors={['#000000', '#030820', '#050A1A']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <ParticleField count={30} />

      {/* Ambient background glow */}
      <Animated.View style={[styles.ambientGlow, { opacity: glowAnim }]} />

      {/* Rotating outer ring */}
      <Animated.View style={[styles.rotatingRing, { transform: [{ rotate }] }]} />

      {/* Expansion rings */}
      <Animated.View style={[styles.ring, styles.ring3, { transform: [{ scale: ringScale3 }], opacity: ringOpacity3 }]} />
      <Animated.View style={[styles.ring, styles.ring2, { transform: [{ scale: ringScale2 }], opacity: ringOpacity2 }]} />
      <Animated.View style={[styles.ring, styles.ring1, { transform: [{ scale: ringScale1 }], opacity: ringOpacity1 }]} />

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
      >
        <LinearGradient
          colors={['#00D4FF', '#0066FF']}
          style={styles.logoGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.logoText}>W</Text>
        </LinearGradient>
        <Animated.View style={[styles.logoGlow, { opacity: glowAnim }]} />
      </Animated.View>

      {/* Brand name */}
      <Animated.View style={{ opacity: logoOpacity, marginTop: 24 }}>
        <Text style={styles.brandName}>WeThink</Text>
        <View style={styles.brandDot}>
          <LinearGradient colors={['#00D4FF', '#0066FF']} style={styles.dot} />
          <Text style={styles.brandSuffix}>ae</Text>
        </View>
      </Animated.View>

      {/* Tagline */}
      <Animated.View
        style={[
          styles.taglineContainer,
          {
            opacity: taglineOpacity,
            transform: [{ translateY: taglineSlide }],
          },
        ]}
      >
        <Text style={styles.tagline}>Think Future. Build Now.</Text>
        <View style={styles.taglineLine} />
      </Animated.View>

      {/* Loading dots */}
      <Animated.View style={[styles.loadingContainer, { opacity: taglineOpacity }]}>
        {[0, 1, 2].map((i) => (
          <LoadingDot key={i} delay={i * 200} />
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const LoadingDot: React.FC<{ delay: number }> = ({ delay }) => {
  const anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.dot2, { opacity: anim, transform: [{ scale: anim }] }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  ambientGlow: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: Colors.electricBlue,
    opacity: 0.05,
  },
  rotatingRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.15)',
    borderStyle: 'dashed',
  },
  ring: {
    position: 'absolute',
    borderRadius: 200,
    borderWidth: 1,
  },
  ring1: {
    width: 160,
    height: 160,
    borderColor: 'rgba(0,212,255,0.3)',
  },
  ring2: {
    width: 220,
    height: 220,
    borderColor: 'rgba(0,212,255,0.15)',
  },
  ring3: {
    width: 300,
    height: 300,
    borderColor: 'rgba(0,212,255,0.07)',
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: Colors.electricBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
  },
  logoGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 52,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -2,
  },
  logoGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.electricBlue,
    opacity: 0.2,
  },
  brandName: {
    fontSize: 38,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
    textAlign: 'center',
  },
  brandDot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  brandSuffix: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.electricBlue,
    letterSpacing: 2,
  },
  taglineContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  taglineLine: {
    width: 40,
    height: 1,
    backgroundColor: Colors.electricBlue,
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 48,
  },
  dot2: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.electricBlue,
  },
});
