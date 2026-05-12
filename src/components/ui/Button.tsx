import React from 'react';
import { TouchableOpacity, Text, StyleSheet, type TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger' | 'success';
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
    accent: theme.accent,
    secondary: 'transparent',
    ghost: 'transparent',
    danger: theme.error,
    success: theme.success,
  };

  const textColors: Record<Variant, string> = {
    primary: '#FFFFFF',
    accent: '#0A0F1E',
    secondary: theme.text,
    ghost: theme.primary,
    danger: '#FFFFFF',
    success: '#0A0F1E',
  };

  const paddingSizes: Record<Size, { py: number; px: number; fontSize: number }> = {
    small: { py: 10, px: 18, fontSize: 12 },
    medium: { py: 16, px: 28, fontSize: 14 },
    large: { py: 20, px: 36, fontSize: 14 },
  };

  const s = paddingSizes[size];

  const glowStyle =
    variant === 'primary'
      ? { shadowColor: theme.primary, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 4 }
      : variant === 'accent'
      ? { shadowColor: theme.accent, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 4 }
      : {};

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      style={[
        styles.button,
        glowStyle,
        {
          backgroundColor: disabled ? theme.textDisabled : backgroundColors[variant],
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: theme.borderStrong,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColors[variant],
            fontSize: s.fontSize,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
});
