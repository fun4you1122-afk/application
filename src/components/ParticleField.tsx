import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../theme';

const { width, height } = Dimensions.get('window');

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  scale: Animated.Value;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const PARTICLE_COLORS = [
  Colors.electricBlue,
  Colors.cyan,
  Colors.neonPurple,
  Colors.teal,
  'rgba(255,255,255,0.5)',
];

const createParticle = (index: number): Particle => {
  const startX = Math.random() * width;
  const startY = Math.random() * height;
  return {
    x: new Animated.Value(startX),
    y: new Animated.Value(startY),
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0),
    size: Math.random() * 3 + 1,
    color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
    duration: Math.random() * 4000 + 3000,
    delay: Math.random() * 2000,
  };
};

export const ParticleField: React.FC<{ count?: number }> = ({ count = 25 }) => {
  const particles = useRef<Particle[]>(
    Array.from({ length: count }, (_, i) => createParticle(i))
  ).current;

  useEffect(() => {
    particles.forEach((p) => {
      const animate = () => {
        const targetX = Math.random() * width;
        const targetY = Math.random() * height;

        p.x.setValue(Math.random() * width);
        p.y.setValue(Math.random() * height);
        p.opacity.setValue(0);
        p.scale.setValue(0);

        Animated.sequence([
          Animated.delay(p.delay),
          Animated.parallel([
            Animated.timing(p.opacity, {
              toValue: Math.random() * 0.6 + 0.2,
              duration: p.duration * 0.3,
              useNativeDriver: true,
            }),
            Animated.spring(p.scale, {
              toValue: 1,
              tension: 60,
              friction: 8,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(p.x, {
              toValue: targetX,
              duration: p.duration,
              useNativeDriver: true,
            }),
            Animated.timing(p.y, {
              toValue: targetY,
              duration: p.duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(p.opacity, {
            toValue: 0,
            duration: p.duration * 0.3,
            useNativeDriver: true,
          }),
        ]).start(() => animate());
      };
      animate();
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              backgroundColor: p.color,
              opacity: p.opacity,
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                { scale: p.scale },
              ],
              shadowColor: p.color,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: p.size * 2,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
