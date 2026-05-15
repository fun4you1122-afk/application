import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../theme';

interface HolographicIconProps {
  icon: string;
  color: string;
  size?: number;
  gradient?: string[];
}

const IconMap: Record<string, string> = {
  brain: '🧠',
  cloud: '☁️',
  shield: '🛡️',
  transform: '⚡',
  code: '💻',
  chart: '📊',
  ai: '🤖',
  network: '🌐',
  security: '🔐',
  analytics: '📈',
  mobile: '📱',
  data: '💾',
  settings: '⚙️',
  notification: '🔔',
  team: '👥',
  chat: '💬',
  dashboard: '🎯',
  portfolio: '🗂️',
};

export const HolographicIcon: React.FC<HolographicIconProps> = ({
  icon,
  color,
  size = 48,
  gradient,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  const glowOpacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 0.5],
  });

  const iconGrad = gradient || [color, `${color}88`];
  const emoji = IconMap[icon] || '◆';

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <Animated.View
        style={[
          styles.glow,
          {
            width: size * 1.6,
            height: size * 1.6,
            borderRadius: (size * 1.6) / 2,
            backgroundColor: color,
            opacity: glowOpacity,
            top: -(size * 0.3),
            left: -(size * 0.3),
          },
        ]}
      />
      <LinearGradient
        colors={iconGrad as any}
        style={[
          styles.iconBox,
          {
            width: size,
            height: size,
            borderRadius: Radius.md,
            borderColor: `${color}44`,
          },
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={{ fontSize: size * 0.45 }}>{emoji}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    opacity: 0.08,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
