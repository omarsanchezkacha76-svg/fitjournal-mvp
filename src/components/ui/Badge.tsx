import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type BadgeColor = 'primary' | 'accent' | 'success' | 'error' | 'warning';

interface BadgeProps {
  children: string;
  color?: BadgeColor;
}

export function Badge({ children, color = 'primary' }: BadgeProps) {
  const theme = useThemeColor();

  const colorMap: Record<BadgeColor, { bg: string; text: string }> = {
    primary: { bg: theme.primaryDim, text: theme.primary },
    accent: { bg: theme.accentDim, text: theme.accent },
    success: { bg: theme.successDim, text: theme.success },
    error: { bg: theme.errorDim, text: theme.error },
    warning: { bg: theme.warningDim, text: theme.warning },
  };

  const c = colorMap[color];

  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.text }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.55,
    textTransform: 'uppercase',
  },
});
