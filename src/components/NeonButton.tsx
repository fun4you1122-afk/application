import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../theme';

interface NeonButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  icon,
  fullWidth = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const heights: Record<string, number> = { sm: 40, md: 52, lg: 60 };
  const fontSizes: Record<string, number> = { sm: 13, md: 15, lg: 17 };
  const horizontalPaddings: Record<string, number> = { sm: 20, md: 28, lg: 36 };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  const renderInner = () => (
    <View style={[styles.inner, { paddingHorizontal: horizontalPaddings[size] }]}>
      {icon && <View style={styles.iconWrap}>{icon}</View>}
      <Text style={[
        styles.text,
        { fontSize: fontSizes[size] },
        variant === 'ghost' && styles.textGhost,
        variant === 'secondary' && styles.textSecondary,
        textStyle,
      ]}>
        {title}
      </Text>
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={[fullWidth && styles.fullWidth, style]}
    >
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && styles.fullWidth]}>
        {variant === 'primary' && (
          <Animated.View style={[
            styles.glowWrap,
            { opacity: glowOpacity, shadowColor: Colors.electricBlue, shadowRadius: 20, shadowOpacity: 0.7 },
          ]}>
            <LinearGradient
              colors={['#00D4FF', '#0066FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, { height: heights[size] }, fullWidth && styles.fullWidth]}
            >
              {renderInner()}
            </LinearGradient>
          </Animated.View>
        )}
        {variant === 'purple' && (
          <Animated.View style={[
            styles.glowWrap,
            { opacity: glowOpacity, shadowColor: Colors.neonPurple, shadowRadius: 20, shadowOpacity: 0.7 },
          ]}>
            <LinearGradient
              colors={['#8B5CF6', '#6D28D9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, { height: heights[size] }, fullWidth && styles.fullWidth]}
            >
              {renderInner()}
            </LinearGradient>
          </Animated.View>
        )}
        {variant === 'secondary' && (
          <View style={[
            styles.button,
            styles.secondaryBtn,
            { height: heights[size] },
            fullWidth && styles.fullWidth,
          ]}>
            {renderInner()}
          </View>
        )}
        {variant === 'ghost' && (
          <View style={[styles.button, styles.ghostBtn, { height: heights[size] }, fullWidth && styles.fullWidth]}>
            {renderInner()}
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Radius.full,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowWrap: {
    shadowOffset: { width: 0, height: 4 },
    borderRadius: Radius.full,
  },
  secondaryBtn: {
    backgroundColor: 'rgba(0,212,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.4)',
  },
  ghostBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconWrap: {
    marginRight: 4,
  },
  text: {
    color: Colors.white,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textGhost: {
    color: Colors.whiteAlpha70,
  },
  textSecondary: {
    color: Colors.electricBlue,
  },
  fullWidth: {
    width: '100%',
  },
});
