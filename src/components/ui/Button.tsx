import React from 'react';
import { TouchableOpacity, Text, StyleSheet, type TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: Variant;
  size?: Size;
}

export function Button({ title, variant = 'primary', size = 'medium', style, disabled, ...rest }: ButtonProps) {
  const theme = useThemeColor();

  const backgroundColors: Record<Variant, string> = {
    primary: theme.primary,
    secondary: theme.surfaceSecondary,
    ghost: 'transparent',
    danger: theme.error,
  };

  const textColors: Record<Variant, string> = {
    primary: '#FFFFFF',
    secondary: theme.text,
    ghost: theme.primary,
    danger: '#FFFFFF',
  };

  const paddingSizes: Record<Size, { py: number; px: number; fontSize: number }> = {
    small: { py: 10, px: 18, fontSize: 14 },
    medium: { py: 16, px: 28, fontSize: 16 },
    large: { py: 20, px: 36, fontSize: 18 },
  };

  const s = paddingSizes[size];

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.textTertiary : backgroundColors[variant],
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: theme.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.text, { color: textColors[variant], fontSize: s.fontSize }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
