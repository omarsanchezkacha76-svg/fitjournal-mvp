import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppStore } from '@/store/useAppStore';
import { formatDate, getTodayIso } from '@/lib/utils';

export default function TodayScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const { selectedDate, setSelectedDate, journalCache, updateJournalCache } = useAppStore();
  const today = getTodayIso();
  const isToday = selectedDate === today;

  const journal = journalCache[selectedDate] || {
    date: selectedDate,
    workout: null,
    foods: [],
    notes: '',
  };

  const [notes, setNotes] = useState(journal.notes || '');

  function changeDay(offset: number) {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d.toISOString().split('T')[0]);
  }

  const totalCalories = journal.foods.reduce((sum, f) => sum + (f.calories || 0), 0);
  const totalProtein = journal.foods.reduce((sum, f) => sum + (f.protein || 0), 0);
  const totalCarbs = journal.foods.reduce((sum, f) => sum + (f.carbs || 0), 0);
  const totalFat = journal.foods.reduce((sum, f) => sum + (f.fat || 0), 0);

  const foodsByMeal = {
    breakfast: journal.foods.filter(f => f.meal_type === 'breakfast'),
    lunch: journal.foods.filter(f => f.meal_type === 'lunch'),
    dinner: journal.foods.filter(f => f.meal_type === 'dinner'),
    snack: journal.foods.filter(f => f.meal_type === 'snack'),
  };

  const mealLabels: Record<string, string> = {
    breakfast: 'Desayuno',
    lunch: 'Comida',
    dinner: 'Cena',
    snack: 'Snack',
  };

  const mealIcons: Record<string, string> = {
    breakfast: '☕',
    lunch: '🍽️',
    dinner: '🌙',
    snack: '🍎',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Gradient Header */}
      <View style={[styles.headerGradient, { backgroundColor: theme.primary }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => changeDay(-1)} style={styles.arrow}>
            <ThemedText variant="subtitle" color="#FFFFFF">‹</ThemedText>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <ThemedText variant="subtitle" color="#FFFFFF">
              {isToday ? 'Hoy' : formatDate(selectedDate)}
            </ThemedText>
            {isToday && (
              <ThemedText variant="caption" color="rgba(255,255,255,0.7)">
                {formatDate(selectedDate)}
              </ThemedText>
            )}
          </View>
          <TouchableOpacity onPress={() => changeDay(1)} style={styles.arrow}>
            <ThemedText variant="subtitle" color="#FFFFFF">›</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Summary Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <ThemedText variant="title" color="#FFFFFF" style={{ fontSize: 28 }}>{totalCalories}</ThemedText>
            <ThemedText variant="caption" color="rgba(255,255,255,0.8)">kcal</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <ThemedText variant="title" color="#FFFFFF" style={{ fontSize: 28 }}>{Math.round(totalProtein)}g</ThemedText>
            <ThemedText variant="caption" color="rgba(255,255,255,0.8)">proteína</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <ThemedText variant="title" color="#FFFFFF" style={{ fontSize: 28 }}>{Math.round(totalCarbs)}g</ThemedText>
            <ThemedText variant="caption" color="rgba(255,255,255,0.8)">carbs</ThemedText>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Workout Card */}
        <Card style={{ marginBottom: 16, marginTop: -20 }}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
                <ThemedText style={{ fontSize: 20 }}>💪</ThemedText>
              </View>
              <View style={{ marginLeft: 12 }}>
                <ThemedText variant="subtitle">Entrenamiento</ThemedText>
                <ThemedText variant="caption" color={theme.textTertiary}>
                  {journal.workout ? 'Completado' : 'Pendiente'}
                </ThemedText>
              </View>
            </View>
            {journal.workout ? (
              <View style={[styles.badge, { backgroundColor: theme.successLight }]}>
                <ThemedText variant="caption" color={theme.success}>✓ Done</ThemedText>
              </View>
            ) : null}
          </View>

          {journal.workout ? (
            <View style={{ marginTop: 16 }}>
              <ThemedText variant="body">{journal.workout.name}</ThemedText>
              <ThemedText variant="bodySecondary" style={{ marginTop: 4 }}>
                {journal.workout.exercises?.length || 0} ejercicios · {Math.floor((journal.workout.duration_seconds || 0) / 60)} min
              </ThemedText>
            </View>
          ) : (
            <View style={{ marginTop: 16, alignItems: 'flex-start' }}>
              <ThemedText variant="bodySecondary" style={{ marginBottom: 16 }}>
                No hay entrenamiento registrado hoy
              </ThemedText>
              <Button
                title="Empezar rutina"
                size="small"
                onPress={() => router.push('/(tabs)/routines')}
              />
            </View>
          )}
        </Card>

        {/* Nutrition Card */}
        <Card style={{ marginBottom: 16 }}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.iconCircle, { backgroundColor: theme.successLight }]}>
                <ThemedText style={{ fontSize: 20 }}>🥗</ThemedText>
              </View>
              <View style={{ marginLeft: 12 }}>
                <ThemedText variant="subtitle">Nutrición</ThemedText>
                <ThemedText variant="caption" color={theme.textTertiary}>
                  {journal.foods.length} alimentos registrados
                </ThemedText>
              </View>
            </View>
            <Button
              title="+"
              variant="ghost"
              size="small"
              onPress={() => router.push('/diet/add')}
              style={{ minWidth: 44, paddingHorizontal: 0 }}
            />
          </View>

          {Object.entries(foodsByMeal).map(([meal, foods]) => (
            <View key={meal} style={{ marginTop: 14 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <ThemedText style={{ fontSize: 14, marginRight: 6 }}>{mealIcons[meal]}</ThemedText>
                <ThemedText variant="caption" color={theme.textTertiary}>
                  {mealLabels[meal].toUpperCase()}
                </ThemedText>
              </View>
              {foods.length === 0 ? (
                <ThemedText variant="bodySecondary" style={{ opacity: 0.5, marginLeft: 22 }}>
                  —
                </ThemedText>
              ) : (
                foods.map((food, i) => (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, marginLeft: 22 }}>
                    <ThemedText variant="body" style={{ fontSize: 15 }}>{food.name} ({food.amount_grams}g)</ThemedText>
                    <ThemedText variant="body" color={theme.textSecondary} style={{ fontSize: 15 }}>{food.calories} kcal</ThemedText>
                  </View>
                ))
              )}
            </View>
          ))}
        </Card>

        {/* Notes Card */}
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
              <ThemedText style={{ fontSize: 18 }}>📝</ThemedText>
            </View>
            <ThemedText variant="subtitle" style={{ marginLeft: 12 }}>Notas del día</ThemedText>
          </View>
          <TextInput
            multiline
            placeholder="¿Cómo te sentiste hoy? ¿Algo que destacar?"
            placeholderTextColor={theme.textTertiary}
            value={notes}
            onChangeText={(text) => {
              setNotes(text);
              updateJournalCache(selectedDate, { notes: text });
            }}
            style={[
              styles.notesInput,
              {
                color: theme.text,
                backgroundColor: theme.surfaceSecondary,
                borderColor: theme.border,
              },
            ]}
          />
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  arrow: {
    padding: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  scroll: {
    padding: 16,
    paddingTop: 0,
  },
  cardHeader: {
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
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  notesInput: {
    marginTop: 8,
    minHeight: 90,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    fontSize: 15,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
});
