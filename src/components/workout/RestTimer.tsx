import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Props {
  restTime: number;
  onSkip: () => void;
}

export function RestTimer({ restTime, onSkip }: Props) {
  const theme = useThemeColor();
  const m = Math.floor(restTime / 60);
  const s = restTime % 60;

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryLight }]}>
      <ThemedText variant="label" color={theme.primary}>DESCANSO</ThemedText>
      <ThemedText variant="title" style={{ fontSize: 48, marginVertical: 8 }} color={theme.primary}>
        {m}:{s.toString().padStart(2, '0')}
      </ThemedText>
      <Button title="Saltar" variant="ghost" size="small" onPress={onSkip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginVertical: 12,
  },
});
