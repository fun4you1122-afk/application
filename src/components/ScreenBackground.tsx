import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme';
import { ParticleField } from './ParticleField';
import { AnimatedOrb } from './AnimatedOrb';

interface ScreenBackgroundProps {
  children: React.ReactNode;
  showParticles?: boolean;
  showOrbs?: boolean;
  orbColor?: string;
  variant?: 'default' | 'blue' | 'purple' | 'teal';
}

const variants = {
  default: [Colors.darkBg, Colors.deepNavy, Colors.navyDark],
  blue: [Colors.darkBg, '#050E1F', '#071428'],
  purple: [Colors.darkBg, '#0A0516', '#0D0620'],
  teal: [Colors.darkBg, '#030E12', '#040F14'],
};

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
  showParticles = true,
  showOrbs = true,
  orbColor = Colors.electricBlue,
  variant = 'default',
}) => {
  return (
    <LinearGradient
      colors={variants[variant] as any}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {showOrbs && (
        <>
          <AnimatedOrb
            color={orbColor}
            size={300}
            style={styles.orbTopRight}
            pulseSpeed={3000}
          />
          <AnimatedOrb
            color={Colors.neonPurple}
            size={200}
            style={styles.orbBottomLeft}
            pulseSpeed={4000}
          />
        </>
      )}
      {showParticles && <ParticleField count={20} />}
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orbTopRight: {
    position: 'absolute',
    top: -80,
    right: -80,
    opacity: 0.6,
  },
  orbBottomLeft: {
    position: 'absolute',
    bottom: 60,
    left: -60,
    opacity: 0.4,
  },
});
