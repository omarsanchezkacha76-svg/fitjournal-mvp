import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type Variant =
  | 'hero'
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySecondary'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'stat'
  | 'statSmall';

interface ThemedTextProps extends TextProps {
  variant?: Variant;
  color?: string;
}

export function ThemedText({ variant = 'body', style, color, ...rest }: ThemedTextProps) {
  const theme = useThemeColor();
  const textColor =
    color ??
    (variant === 'bodySecondary' || variant === 'caption' || variant === 'bodySmall'
      ? theme.textSecondary
      : theme.text);

  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        { color: textColor },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  hero: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: -0.96,
    lineHeight: 52,
  },
  display: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -0.8,
    lineHeight: 44,
  },
  h1: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.28,
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.24,
    lineHeight: 30,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySecondary: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    lineHeight: 16,
  },
  stat: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -0.8,
    lineHeight: 40,
    fontVariant: ['tabular-nums'],
  },
  statSmall: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.64,
    lineHeight: 32,
    fontVariant: ['tabular-nums'],
  },
});
