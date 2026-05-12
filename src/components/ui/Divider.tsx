import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function Divider() {
  const theme = useThemeColor();

  return <View style={[styles.divider, { backgroundColor: theme.border }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 12,
  },
});
