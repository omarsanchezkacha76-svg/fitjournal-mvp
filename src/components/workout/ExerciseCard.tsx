import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SetLogger } from './SetLogger';
import { RestTimer } from './RestTimer';
import type { Exercise, WorkoutSet } from '@/types';

interface Props {
  exercise: Exercise;
  sets: number;
  restSeconds: number;
  previousSets?: { reps: number; weight: number }[];
  onComplete: (sets: WorkoutSet[]) => void;
}

export function ExerciseCard({ exercise, sets, restSeconds, previousSets, onComplete }: Props) {
  const theme = useThemeColor();
  const [loggedSets, setLoggedSets] = useState<WorkoutSet[]>([]);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);

  function handleLog(set: WorkoutSet) {
    const updated = [...loggedSets, set];
    setLoggedSets(updated);
    if (updated.length < sets) {
      setIsResting(true);
      setRestTime(restSeconds);
      // Simple countdown
      let t = restSeconds;
      const interval = setInterval(() => {
        t -= 1;
        setRestTime(t);
        if (t <= 0) {
          clearInterval(interval);
          setIsResting(false);
        }
      }, 1000);
    } else {
      onComplete(updated);
    }
  }

  const [expanded, setExpanded] = useState(false);

  return (
    <Card style={{ marginBottom: 12 }}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.header}>
          {/* Placeholder for exercise image */}
          <View style={[styles.imagePlaceholder, { backgroundColor: theme.surfaceSecondary }]}>
            {exercise.image_url ? (
              <Image source={{ uri: exercise.image_url }} style={styles.image} resizeMode="contain" />
            ) : (
              <ThemedText variant="caption" color={theme.textTertiary} style={{ textAlign: 'center' }}>
                {exercise.muscle_group}
              </ThemedText>
            )}
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <ThemedText variant="subtitle">{exercise.name}</ThemedText>
            <ThemedText variant="caption" color={theme.textSecondary}>
              {exercise.muscle_group} • {sets} sets • {restSeconds}s rest
            </ThemedText>
            {exercise.instructions && (
              <ThemedText variant="caption" color={theme.textTertiary} numberOfLines={2}>
                {exercise.instructions}
              </ThemedText>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={{ marginTop: 12 }}>
          {isResting && (
            <RestTimer restTime={restTime} onSkip={() => setIsResting(false)} />
          )}

          {!isResting && loggedSets.length < sets && (
            <SetLogger
              setNumber={loggedSets.length + 1}
              previous={previousSets?.[loggedSets.length]}
              onLog={handleLog}
            />
          )}

          {loggedSets.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <ThemedText variant="caption" color={theme.textTertiary}>
                Completados: {loggedSets.length}/{sets}
              </ThemedText>
            </View>
          )}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});
