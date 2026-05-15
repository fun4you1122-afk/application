import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Spacing } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: readonly string[];
  onPress?: () => void;
  borderColor?: string;
  noPadding?: boolean;
  intensity?: 'low' | 'mid' | 'high';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  gradient,
  onPress,
  borderColor = Colors.glassBorder,
  noPadding = false,
  intensity = 'mid',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const glassColors: Record<string, string> = {
    low: Colors.glass,
    mid: Colors.glassMid,
    high: Colors.glassHigh,
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 10,
    }).start();
  };

  const content = (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }, style]}>
      <View style={[styles.border, { borderColor }]}>
        {gradient ? (
          <LinearGradient
            colors={gradient as any}
            style={[styles.inner, noPadding && styles.noPadding]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {children}
          </LinearGradient>
        ) : (
          <View style={[styles.inner, { backgroundColor: glassColors[intensity] }, noPadding && styles.noPadding]}>
            {children}
          </View>
        )}
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.lg,
  },
  border: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inner: {
    padding: Spacing.md,
  },
  noPadding: {
    padding: 0,
  },
});
