import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MacroBar } from '@/components/ui/MacroBar';
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[theme.surface, theme.background]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => changeDay(-1)} style={styles.arrow}>
            <FontAwesome6 name="chevron-left" size={18} color={theme.textSecondary} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <ThemedText variant="h2">
              {isToday ? 'Hoy' : formatDate(selectedDate)}
            </ThemedText>
            {isToday && (
              <ThemedText variant="caption" color={theme.textSecondary}>
                {formatDate(selectedDate)}
              </ThemedText>
            )}
          </View>
          <TouchableOpacity onPress={() => changeDay(1)} style={styles.arrow}>
            <FontAwesome6 name="chevron-right" size={18} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Summary Stats Row */}
        <View style={styles.statsRow}>
          <MacroBar label="Kcal" value={totalCalories} max={2500} color={theme.primary} unit="" />
          <View style={{ width: 16 }} />
          <MacroBar label="Proteina" value={Math.round(totalProtein)} max={180} color={theme.accent} />
          <View style={{ width: 16 }} />
          <MacroBar label="Carbs" value={Math.round(totalCarbs)} max={300} color={theme.success} />
          <View style={{ width: 16 }} />
          <MacroBar label="Grasas" value={Math.round(totalFat)} max={80} color={theme.warning} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Workout Card */}
        <Card style={{ marginBottom: 16, marginTop: -20 }}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primaryDim }]}>
                <FontAwesome6 name="dumbbell" size={18} color={theme.primary} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <ThemedText variant="h3">Entrenamiento</ThemedText>
                <ThemedText variant="caption" color={theme.textTertiary}>
                  {journal.workout ? 'Completado' : 'Pendiente'}
                </ThemedText>
              </View>
            </View>
            {journal.workout ? (
              <View style={[styles.badge, { backgroundColor: theme.successDim }]}>
                <ThemedText variant="caption" color={theme.success}>Done</ThemedText>
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
              <View style={[styles.iconCircle, { backgroundColor: theme.successDim }]}>
                <FontAwesome6 name="utensils" size={16} color={theme.success} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <ThemedText variant="h3">Nutricion</ThemedText>
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
                <ThemedText variant="caption" color={theme.textTertiary}>
                  {mealLabels[meal].toUpperCase()}
                </ThemedText>
              </View>
              {foods.length === 0 ? (
                <ThemedText variant="bodySecondary" style={{ opacity: 0.5 }}>
                  —
                </ThemedText>
              ) : (
                foods.map((food, i) => (
                  <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
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
            <View style={[styles.iconCircle, { backgroundColor: theme.primaryDim }]}>
              <FontAwesome6 name="pen-to-square" size={16} color={theme.primary} />
            </View>
            <ThemedText variant="h3" style={{ marginLeft: 12 }}>Notas del dia</ThemedText>
          </View>
          <TextInput
            multiline
            placeholder="Notas del entrenamiento..."
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
                backgroundColor: theme.background,
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
    alignItems: 'flex-end',
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
