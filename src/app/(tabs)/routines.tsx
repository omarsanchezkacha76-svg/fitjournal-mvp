import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppStore } from '@/store/useAppStore';
import type { Routine } from '@/types';

const PREDEFINED_ROUTINES: Routine[] = [
  {
    id: 'ppl-push',
    name: 'PPL — Push',
    description: 'Pecho, hombros y tríceps',
    category: 'strength',
    difficulty: 'intermediate',
    is_predefined: true,
    exercises: [],
  },
  {
    id: 'ppl-pull',
    name: 'PPL — Pull',
    description: 'Espalda y bíceps',
    category: 'strength',
    difficulty: 'intermediate',
    is_predefined: true,
    exercises: [],
  },
  {
    id: 'ppl-legs',
    name: 'PPL — Legs',
    description: 'Piernas completas',
    category: 'strength',
    difficulty: 'intermediate',
    is_predefined: true,
    exercises: [],
  },
  {
    id: 'upper-lower-upper',
    name: 'Upper Body',
    description: 'Tren superior completo',
    category: 'strength',
    difficulty: 'beginner',
    is_predefined: true,
    exercises: [],
  },
  {
    id: 'upper-lower-lower',
    name: 'Lower Body',
    description: 'Tren inferior completo',
    category: 'strength',
    difficulty: 'beginner',
    is_predefined: true,
    exercises: [],
  },
  {
    id: 'calisthenics-basics',
    name: 'Calistenia Básica',
    description: 'Push-ups, pull-ups, squats, core',
    category: 'calisthenics',
    difficulty: 'beginner',
    is_predefined: true,
    exercises: [],
  },
  {
    id: 'calisthenics-skills',
    name: 'Calistenia Skills',
    description: 'Progresiones hacia planche, front lever',
    category: 'calisthenics',
    difficulty: 'advanced',
    is_predefined: true,
    exercises: [],
  },
  {
    id: 'full-body-3x',
    name: 'Full Body 3×',
    description: 'Cuerpo completo 3 veces por semana',
    category: 'strength',
    difficulty: 'beginner',
    is_predefined: true,
    exercises: [],
  },
];

export default function RoutinesScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const { routines } = useAppStore();
  const [activeTab, setActiveTab] = useState<'predefined' | 'custom'>('predefined');

  const allRoutines = [...PREDEFINED_ROUTINES, ...routines];
  const filtered = activeTab === 'predefined'
    ? allRoutines.filter(r => r.is_predefined)
    : allRoutines.filter(r => !r.is_predefined);

  function getDifficultyColor(difficulty: string) {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return theme.textSecondary;
    }
  }

  function getDifficultyLabel(difficulty: string) {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return difficulty;
    }
  }

  const categoryEmoji: Record<string, string> = {
    strength: '🏋️',
    calisthenics: '🤸',
    cardio: '🏃',
    mixed: '⚡',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <ThemedText variant="title" color="#FFFFFF">Rutinas</ThemedText>
        <ThemedText variant="caption" color="rgba(255,255,255,0.8)">
          {filtered.length} rutinas disponibles
        </ThemedText>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab('predefined')}
          style={[
            styles.tab,
            activeTab === 'predefined' && { borderBottomColor: theme.primary, borderBottomWidth: 2 },
          ]}
        >
          <ThemedText
            variant="body"
            color={activeTab === 'predefined' ? theme.primary : theme.textSecondary}
          >
            Predefinidas
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('custom')}
          style={[
            styles.tab,
            activeTab === 'custom' && { borderBottomColor: theme.primary, borderBottomWidth: 2 },
          ]}
        >
          <ThemedText
            variant="body"
            color={activeTab === 'custom' ? theme.primary : theme.textSecondary}
          >
            Mis rutinas
          </ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Card style={{ marginBottom: 14 }}>
              <View style={styles.routineHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.emojiCircle, { backgroundColor: theme.primaryLight }]}>
                    <ThemedText style={{ fontSize: 20 }}>{categoryEmoji[item.category] || '💪'}</ThemedText>
                  </View>
                  <View style={{ marginLeft: 14, flex: 1 }}>
                    <ThemedText variant="subtitle">{item.name}</ThemedText>
                    <ThemedText variant="bodySecondary" style={{ marginTop: 2 }}>
                      {item.description}
                    </ThemedText>
                  </View>
                </View>
              </View>
              <View style={styles.routineFooter}>
                <View style={[styles.diffBadge, { backgroundColor: getDifficultyColor(item.difficulty) + '18' }]}>
                  <ThemedText variant="caption" color={getDifficultyColor(item.difficulty)}>
                    {getDifficultyLabel(item.difficulty)}
                  </ThemedText>
                </View>
                <Button title="Empezar" size="small" onPress={() => router.push({ pathname: '/workout/active', params: { routineId: item.id } })} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <ThemedText variant="bodySecondary">No tienes rutinas personalizadas</ThemedText>
            <Button title="Crear rutina" size="small" style={{ marginTop: 16 }} />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diffBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  routineFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});
