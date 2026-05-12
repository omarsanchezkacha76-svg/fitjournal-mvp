import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
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

  const foodsByMeal = {
    breakfast: journal.foods.filter(f => f.meal_type === 'breakfast'),
    lunch: journal.foods.filter(f => f.meal_type === 'lunch'),
    dinner: journal.foods.filter(f => f.meal_type === 'dinner'),
    snack: journal.foods.filter(f => f.meal_type === 'snack'),
  };

  const mealLabels: Record<string, string> = {
    breakfast: 'DESAYUNO',
    lunch: 'COMIDA',
    dinner: 'CENA',
    snack: 'SNACK',
  };

  const mealIcons: Record<string, string> = {
    breakfast: 'mug-hot',
    lunch: 'utensils',
    dinner: 'moon',
    snack: 'cookie-bite',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Indigo Header */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={() => changeDay(-1)} style={styles.arrow}>
            <FontAwesome6 name="chevron-left" size={16} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <ThemedText variant="h2" color="#FFFFFF">
              {isToday ? 'Hoy' : formatDate(selectedDate)}
            </ThemedText>
            <ThemedText variant="caption" color="rgba(255,255,255,0.8)">
              {formatDate(selectedDate)}
            </ThemedText>
          </View>
          <TouchableOpacity onPress={() => changeDay(1)} style={styles.arrow}>
            <FontAwesome6 name="chevron-right" size={16} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <ThemedText variant="statSmall" color="#FFFFFF">{totalCalories}</ThemedText>
            <ThemedText variant="caption" color="rgba(255,255,255,0.8)">kcal</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText variant="statSmall" color="#FFFFFF">{Math.round(totalProtein)}g</ThemedText>
            <ThemedText variant="caption" color="rgba(255,255,255,0.8)">proteina</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText variant="statSmall" color="#FFFFFF">{Math.round(totalCarbs)}g</ThemedText>
            <ThemedText variant="caption" color="rgba(255,255,255,0.8)">carbs</ThemedText>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Workout Card */}
        <Card style={{ marginBottom: 16, marginTop: -20 }}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primaryDim }]}>
                <FontAwesome6 name="hashtag" size={16} color={theme.primary} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <ThemedText variant="h3">Entrenamiento</ThemedText>
                <ThemedText variant="caption" color={theme.textTertiary}>
                  {journal.workout ? 'Completado' : 'Pendiente'}
                </ThemedText>
              </View>
            </View>
          </View>

          {journal.workout ? (
            <View style={{ marginTop: 12 }}>
              <ThemedText variant="body">{journal.workout.name}</ThemedText>
              <ThemedText variant="bodySecondary" style={{ marginTop: 4 }}>
                {journal.workout.exercises?.length || 0} ejercicios · {Math.floor((journal.workout.duration_seconds || 0) / 60)} min
              </ThemedText>
            </View>
          ) : (
            <View style={{ marginTop: 12 }}>
              <ThemedText variant="bodySecondary" style={{ marginBottom: 12 }}>
                No hay entrenamiento registrado hoy
              </ThemedText>
              <Button
                title="Empezar rutina"
                size="medium"
                onPress={() => router.push('/(tabs)/routines')}
                style={{ width: '100%' }}
              />
            </View>
          )}
        </Card>

        {/* Nutrition Card */}
        <Card style={{ marginBottom: 16 }}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.iconCircle, { backgroundColor: theme.successDim }]}>
                <FontAwesome6 name="utensils" size={14} color={theme.success} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <ThemedText variant="h3">Nutricion</ThemedText>
                <ThemedText variant="caption" color={theme.textTertiary}>
                  {journal.foods.length} alimentos registrados
                </ThemedText>
              </View>
            </View>
          </View>

          {Object.entries(foodsByMeal).map(([meal, foods]) => (
            <View key={meal} style={styles.mealRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <FontAwesome6
                  name={mealIcons[meal]}
                  size={12}
                  color={theme.textTertiary}
                  style={{ marginRight: 10, width: 16 }}
                />
                <ThemedText variant="caption" color={theme.textTertiary}>
                  {mealLabels[meal]}
                </ThemedText>
              </View>
              {foods.length === 0 ? (
                <TouchableOpacity
                  onPress={() => router.push('/diet/add')}
                  style={styles.addButton}
                >
                  <FontAwesome6 name="plus" size={12} color={theme.textTertiary} />
                </TouchableOpacity>
              ) : (
                <ThemedText variant="caption" color={theme.textSecondary}>
                  {foods.reduce((s, f) => s + f.calories, 0)} kcal
                </ThemedText>
              )}
            </View>
          ))}
        </Card>

        {/* Notes Card */}
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={[styles.iconCircle, { backgroundColor: theme.primaryDim }]}>
              <FontAwesome6 name="note-sticky" size={14} color={theme.primary} />
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerNav: {
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
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 36,
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
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30,42,74,0.5)',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#1A2340',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesInput: {
    marginTop: 8,
    minHeight: 80,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    fontSize: 15,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
});
