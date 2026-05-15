import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = StyleSheet.create({
  displayXL: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1.5,
    color: Colors.white,
    lineHeight: 56,
  },
  displayLG: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -1,
    color: Colors.white,
    lineHeight: 44,
  },
  displayMD: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: Colors.white,
    lineHeight: 36,
  },
  headingLG: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: Colors.white,
    lineHeight: 30,
  },
  headingMD: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: Colors.white,
    lineHeight: 26,
  },
  headingSM: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    color: Colors.white,
    lineHeight: 22,
  },
  bodyLG: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.whiteAlpha70,
    lineHeight: 24,
  },
  bodyMD: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.whiteAlpha70,
    lineHeight: 22,
  },
  bodySM: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.whiteAlpha50,
    lineHeight: 18,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: Colors.whiteAlpha50,
    textTransform: 'uppercase',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    color: Colors.electricBlue,
    textTransform: 'uppercase',
  },
  mono: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: Colors.teal,
    letterSpacing: 0.5,
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};
