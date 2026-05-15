import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Spacing } from '../theme';
import { Typography } from '../theme/typography';

interface StatCardProps {
  label: string;
  value: string;
  color: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, color, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.03, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: pulseAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={[`${color}18`, `${color}06`]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.indicator, { backgroundColor: color }]} />
        <Text style={[styles.value, { color }]}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
      <View style={[styles.border, { borderColor: `${color}30` }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '30%',
    margin: 4,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  gradient: {
    padding: Spacing.md,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  label: {
    ...Typography.bodySM,
    textAlign: 'center',
  },
});
