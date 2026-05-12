import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type Variant = 'title' | 'subtitle' | 'body' | 'bodySecondary' | 'caption' | 'label';

interface ThemedTextProps extends TextProps {
  variant?: Variant;
  color?: string;
}

export function ThemedText({ variant = 'body', style, color, ...rest }: ThemedTextProps) {
  const theme = useThemeColor();
  const textColor = color ?? (variant === 'bodySecondary' || variant === 'caption' ? theme.textSecondary : theme.text);

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
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.3,
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
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
