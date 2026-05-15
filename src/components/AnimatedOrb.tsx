import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedOrbProps {
  color: string;
  size: number;
  style?: object;
  pulseSpeed?: number;
}

export const AnimatedOrb: React.FC<AnimatedOrbProps> = ({
  color,
  size,
  style,
  pulseSpeed = 2500,
}) => {
  const pulseAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: pulseSpeed,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: pulseSpeed,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          transform: [{ scale: pulseAnim }, { rotate }],
        },
        style,
      ]}
    >
      <LinearGradient
        colors={[color, `${color}44`, 'transparent']}
        style={[
          styles.orb,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
      <View
        style={[
          styles.glow,
          {
            width: size * 0.5,
            height: size * 0.5,
            borderRadius: (size * 0.5) / 2,
            top: size * 0.25,
            left: size * 0.25,
            backgroundColor: color,
            shadowColor: color,
            shadowRadius: size * 0.4,
            shadowOpacity: 0.6,
            shadowOffset: { width: 0, height: 0 },
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    opacity: 0.15,
  },
  glow: {
    position: 'absolute',
    opacity: 0.08,
  },
});
