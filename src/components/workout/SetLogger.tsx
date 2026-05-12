import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import type { WorkoutSet } from '@/types';

interface Props {
  setNumber: number;
  previous?: { reps: number; weight: number };
  onLog: (set: WorkoutSet) => void;
}

export function SetLogger({ setNumber, previous, onLog }: Props) {
  const theme = useThemeColor();
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [completed, setCompleted] = useState(false);

  function handleComplete() {
    if (!reps || !weight) return;
    onLog({
      id: `${Date.now()}-${setNumber}`,
      reps: parseInt(reps),
      weight: parseFloat(weight),
      completed: true,
    });
    setCompleted(true);
  }

  if (completed) {
    return (
      <View style={[styles.row, { opacity: 0.6 }]}>
        <ThemedText variant="bodySecondary">Set {setNumber}</ThemedText>
        <ThemedText variant="body" color={theme.success}>
          {reps} reps × {weight} kg ✓
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText variant="body">Set {setNumber}</ThemedText>
        {previous && (
          <ThemedText variant="caption" color={theme.textTertiary}>
            Ant: {previous.reps}×{previous.weight}kg
          </ThemedText>
        )}
      </View>
      <View style={styles.inputs}>
        <TextInput
          placeholder="kg"
          placeholderTextColor={theme.textTertiary}
          keyboardType="decimal-pad"
          value={weight}
          onChangeText={setWeight}
          style={[styles.input, { backgroundColor: theme.surfaceSecondary, color: theme.text, borderColor: theme.border }]}
        />
        <ThemedText variant="bodySecondary" style={{ marginHorizontal: 8 }}>×</ThemedText>
        <TextInput
          placeholder="reps"
          placeholderTextColor={theme.textTertiary}
          keyboardType="number-pad"
          value={reps}
          onChangeText={setReps}
          style={[styles.input, { backgroundColor: theme.surfaceSecondary, color: theme.text, borderColor: theme.border }]}
        />
        <TouchableOpacity
          onPress={handleComplete}
          style={[styles.check, { backgroundColor: theme.primary }]}
        >
          <ThemedText color="#FFFFFF">✓</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    width: 80,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  check: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
