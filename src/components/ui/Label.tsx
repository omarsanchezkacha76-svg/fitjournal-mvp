import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function Label({ style, ...rest }: TextProps) {
  const theme = useThemeColor();

  return (
    <Text
      style={[
        styles.label,
        { color: theme.textTertiary },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.66,
    lineHeight: 16,
  },
});
