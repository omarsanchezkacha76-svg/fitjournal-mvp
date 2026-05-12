import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Label } from './Label';
import { useThemeColor } from '@/hooks/useThemeColor';

interface MacroBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  unit?: string;
}

export function MacroBar({ label, value, max, color, unit = 'g' }: MacroBarProps) {
  const theme = useThemeColor();
  const pct = Math.min((value / max) * 100, 100);

  return (
    <View style={styles.container}>
      <Label style={{ marginBottom: 6 }}>{label}</Label>
      <View style={[styles.track, { backgroundColor: theme.border }]}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <View style={styles.row}>
        <ThemedText variant="statSmall" color={color}>
          {value}
        </ThemedText>
        <ThemedText variant="caption" color={theme.textSecondary} style={{ marginLeft: 2 }}>
          {unit}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  track: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});
