import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
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
    description: 'Pecho, hombros y triceps',
    category: 'strength',
    difficulty: 'intermediate',
    is_predefined: true,
    exercises: [],
  },
  {
    id: 'ppl-pull',
    name: 'PPL — Pull',
    description: 'Espalda y biceps',
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
    id: 'full-body-a',
    name: 'Full Body A',
    description: 'Cuerpo completo basico',
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
      case 'beginner': return theme.success;
      case 'intermediate': return theme.warning;
      case 'advanced': return theme.error;
      default: return theme.textSecondary;
    }
  }

  function getDifficultyLabel(difficulty: string) {
    switch (difficulty) {
      case 'beginner': return 'PRINCIPIANTE';
      case 'intermediate': return 'INTERMEDIO';
      case 'advanced': return 'AVANZADO';
      default: return difficulty.toUpperCase();
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <ThemedText variant="h1" color="#FFFFFF">Rutinas</ThemedText>
        <ThemedText variant="caption" color="rgba(255,255,255,0.8)">
          8 rutinas disponibles
        </ThemedText>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab('predefined')}
          style={[styles.tab, activeTab === 'predefined' && styles.tabActive]}
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
          style={[styles.tab, activeTab === 'custom' && styles.tabActive]}
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
          <Card style={{ marginBottom: 12 }}>
            <View style={styles.routineHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.iconCircle, { backgroundColor: theme.primaryDim }]}>
                  <FontAwesome6 name="hashtag" size={16} color={theme.primary} />
                </View>
                <View style={{ marginLeft: 14, flex: 1 }}>
                  <ThemedText variant="h3">{item.name}</ThemedText>
                  <ThemedText variant="bodySecondary" style={{ marginTop: 2 }}>
                    {item.description}
                  </ThemedText>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }}>
                    <ThemedText
                      variant="caption"
                      color={getDifficultyColor(item.difficulty)}
                      style={{ fontWeight: '700' }}
                    >
                      {getDifficultyLabel(item.difficulty)}
                    </ThemedText>
                    <ThemedText variant="caption" color={theme.textTertiary}>
                      · {item.exercises?.length || 6} ejercicios
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
              <Button
                title="Empezar"
                size="small"
                onPress={() => router.push({ pathname: '/workout/active', params: { routineId: item.id } })}
              />
            </View>
          </Card>
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
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
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#6366F1',
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
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
