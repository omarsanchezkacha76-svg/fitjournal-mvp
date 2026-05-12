import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CardProps extends ViewProps {
  padding?: number;
}

export function Card({ children, style, padding = 20, ...rest }: CardProps) {
  const theme = useThemeColor();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          padding,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 6,
  },
});
