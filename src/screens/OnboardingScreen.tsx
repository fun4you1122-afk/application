import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from '../theme';
import { Typography } from '../theme/typography';
import { OnboardingData } from '../data/content';
import { NeonButton } from '../components/NeonButton';
import { ParticleField } from '../components/ParticleField';
import { AnimatedOrb } from '../components/AnimatedOrb';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      const next = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => onFinish();

  const renderItem = ({ item, index }: { item: typeof OnboardingData[0]; index: number }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp',
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [60, 0, 60],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        {/* Holographic visual element */}
        <Animated.View style={[styles.visualContainer, { opacity, transform: [{ scale }] }]}>
          <AnimatedOrb color={item.color} size={240} style={styles.orb} pulseSpeed={2000} />
          <View style={[styles.hexagon, { borderColor: `${item.color}40` }]} />
          <View style={[styles.hexagonInner, { borderColor: `${item.color}20` }]} />
          <LinearGradient
            colors={[`${item.color}30`, 'transparent']}
            style={styles.visualGlow}
          />

          {/* Center icon */}
          <View style={[styles.centerIcon, { borderColor: `${item.color}50` }]}>
            <LinearGradient
              colors={[`${item.color}25`, `${item.color}08`]}
              style={styles.centerIconGrad}
            >
              <Text style={[styles.centerEmoji]}>
                {index === 0 ? '🚀' : index === 1 ? '🤖' : '⚡'}
              </Text>
            </LinearGradient>
          </View>

          {/* Floating orbit dots */}
          {[0, 1, 2, 3].map((i) => (
            <OrbitDot key={i} index={i} color={item.color} radius={100} />
          ))}
        </Animated.View>

        {/* Text content */}
        <Animated.View
          style={[
            styles.textContainer,
            { opacity, transform: [{ translateY }] },
          ]}
        >
          <Text style={[styles.label, { color: item.color }]}>
            {item.subtitle}
          </Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#000000', '#030820', '#050A1A']}
        style={StyleSheet.absoluteFill}
      />
      <ParticleField count={15} />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={OnboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Bottom controls */}
      <View style={styles.controls}>
        {/* Dots */}
        <View style={styles.dots}>
          {OnboardingData.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
              extrapolate: 'clamp',
            });
            const color = OnboardingData[i].color;

            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity: dotOpacity,
                    backgroundColor: color,
                    shadowColor: color,
                  },
                ]}
              />
            );
          })}
        </View>

        <NeonButton
          title={currentIndex === OnboardingData.length - 1 ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          variant="primary"
          size="lg"
          style={styles.nextBtn}
        />
      </View>
    </View>
  );
};

const OrbitDot: React.FC<{ index: number; color: string; radius: number }> = ({
  index,
  color,
  radius,
}) => {
  const angle = (index / 4) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000 + index * 800,
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
        styles.orbitDot,
        {
          left: '50%',
          top: '50%',
          transform: [{ translateX: x }, { translateY: y }, { rotate }],
          backgroundColor: color,
          shadowColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  skipText: {
    color: Colors.whiteAlpha70,
    fontSize: 14,
    fontWeight: '500',
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  visualContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  orb: {
    position: 'absolute',
  },
  hexagon: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  hexagonInner: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 12,
    borderWidth: 1,
    transform: [{ rotate: '22.5deg' }],
  },
  visualGlow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    opacity: 0.3,
  },
  centerIcon: {
    width: 100,
    height: 100,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  centerIconGrad: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerEmoji: {
    fontSize: 48,
  },
  orbitDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  textContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: 16,
    lineHeight: 44,
  },
  description: {
    fontSize: 16,
    color: Colors.whiteAlpha60,
    textAlign: 'center',
    lineHeight: 26,
  },
  controls: {
    paddingBottom: 48,
    paddingHorizontal: 32,
    alignItems: 'center',
    gap: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  nextBtn: {
    width: width - 64,
  },
});
