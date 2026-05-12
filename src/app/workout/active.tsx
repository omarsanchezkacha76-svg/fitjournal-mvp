import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { ExerciseCard } from '@/components/workout/ExerciseCard';
import { useWorkoutTimer } from '@/hooks/useWorkoutTimer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppStore } from '@/store/useAppStore';
import { PREDEFINED_EXERCISES } from '@/data/exercises';
import type { WorkoutSet } from '@/types';

export default function ActiveWorkoutScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const { routineId } = useLocalSearchParams();
  const { elapsed, formatTime } = useWorkoutTimer();
  const { updateJournalCache, selectedDate } = useAppStore();

  const [completedExercises, setCompletedExercises] = useState<Record<string, WorkoutSet[]>>({});
  const [workoutName, setWorkoutName] = useState('Entrenamiento');

  const routineExercises = [
    { exercise: PREDEFINED_EXERCISES.find(e => e.id === 'bench-press')!, sets: 4, rest: 120 },
    { exercise: PREDEFINED_EXERCISES.find(e => e.id === 'incline-bench')!, sets: 3, rest: 90 },
    { exercise: PREDEFINED_EXERCISES.find(e => e.id === 'dumbbell-flyes')!, sets: 3, rest: 60 },
    { exercise: PREDEFINED_EXERCISES.find(e => e.id === 'overhead-press')!, sets: 4, rest: 120 },
    { exercise: PREDEFINED_EXERCISES.find(e => e.id === 'lateral-raises')!, sets: 4, rest: 60 },
    { exercise: PREDEFINED_EXERCISES.find(e => e.id === 'tricep-pushdown')!, sets: 3, rest: 60 },
  ].filter(item => item.exercise);

  const totalExercises = routineExercises.length;
  const completedCount = Object.keys(completedExercises).length;
  const allDone = completedCount === totalExercises;

  function handleExerciseComplete(exerciseId: string, sets: WorkoutSet[]) {
    setCompletedExercises(prev => ({ ...prev, [exerciseId]: sets }));
  }

  function finishWorkout() {
    updateJournalCache(selectedDate, {
      workout: {
        id: `workout-${Date.now()}`,
        name: workoutName,
        date: selectedDate,
        duration_seconds: elapsed,
        exercises: [],
        user_id: 'local',
        is_completed: true,
      },
    });
    router.replace('/(tabs)');
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText variant="h3">{workoutName}</ThemedText>
          <ThemedText variant="caption" color={theme.textSecondary}>
            {formatTime(elapsed)} · {completedCount}/{totalExercises} ejercicios
          </ThemedText>
        </View>
        <Button
          title={allDone ? 'Finalizar' : 'Cancelar'}
          variant={allDone ? 'primary' : 'ghost'}
          size="small"
          onPress={allDone ? finishWorkout : () => router.back()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {routineExercises.map((item) => (
          <ExerciseCard
            key={item.exercise.id}
            exercise={item.exercise}
            sets={item.sets}
            restSeconds={item.rest}
            onComplete={(sets) => handleExerciseComplete(item.exercise.id, sets)}
          />
        ))}

        {allDone && (
          <Button
            title="Guardar entrenamiento"
            size="large"
            onPress={finishWorkout}
            style={{ marginTop: 24, marginBottom: 40 }}
          />
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
  },
  scroll: {
    padding: 16,
    paddingTop: 0,
  },
});
