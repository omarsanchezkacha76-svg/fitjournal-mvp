import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { FoodSearch } from '@/components/diet/FoodSearch';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppStore } from '@/store/useAppStore';
import type { FoodEntry } from '@/types';

export default function AddFoodScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const { selectedDate, updateJournalCache, journalCache } = useAppStore();
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [grams, setGrams] = useState('100');
  const [mealType, setMealType] = useState<FoodEntry['meal_type']>('breakfast');

  const mealOptions: { key: FoodEntry['meal_type']; label: string }[] = [
    { key: 'breakfast', label: 'Desayuno' },
    { key: 'lunch', label: 'Comida' },
    { key: 'dinner', label: 'Cena' },
    { key: 'snack', label: 'Snack' },
  ];

  function handleSave() {
    if (!selectedFood) return;
    const g = parseFloat(grams) || 100;
    const ratio = g / 100;
    const newFood: FoodEntry = {
      id: `food-${Date.now()}`,
      name: selectedFood.name,
      calories: Math.round(selectedFood.calories * ratio),
      protein: Math.round(selectedFood.protein * ratio * 10) / 10,
      carbs: Math.round(selectedFood.carbs * ratio * 10) / 10,
      fat: Math.round(selectedFood.fat * ratio * 10) / 10,
      amount_grams: g,
      meal_type: mealType,
      logged_at: new Date().toISOString(),
    };
    const current = journalCache[selectedDate] || { date: selectedDate, workout: null, foods: [], notes: '' };
    updateJournalCache(selectedDate, { foods: [...current.foods, newFood] });
    router.back();
  }

  if (!selectedFood) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <ThemedText variant="h2">Anadir comida</ThemedText>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="xmark" size={20} color={theme.textTertiary} />
          </TouchableOpacity>
        </View>
        <FoodSearch onSelect={setSelectedFood} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemedText variant="h2">{selectedFood.name}</ThemedText>
        <TouchableOpacity onPress={() => setSelectedFood(null)}>
          <ThemedText variant="body" color={theme.textTertiary}>Cambiar</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 16 }}>
        <ThemedText variant="label" color={theme.textTertiary}>CANTIDAD (gramos)</ThemedText>
        <TextInput
          value={grams}
          onChangeText={setGrams}
          keyboardType="number-pad"
          style={{
            height: 56,
            borderRadius: 14,
            backgroundColor: theme.background,
            color: theme.text,
            fontSize: 24,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 8,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        />

        <View style={{ marginTop: 24 }}>
          <ThemedText variant="label" color={theme.textTertiary}>MOMENTO DEL DIA</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {mealOptions.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                onPress={() => setMealType(opt.key)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 14,
                  backgroundColor: mealType === opt.key ? theme.primary : theme.background,
                  borderWidth: 1,
                  borderColor: mealType === opt.key ? theme.primary : theme.border,
                }}
              >
                <ThemedText
                  variant="body"
                  color={mealType === opt.key ? '#FFFFFF' : theme.text}
                >
                  {opt.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 24, alignItems: 'center' }}>
          <ThemedText variant="statSmall" color={theme.primary}>
            {Math.round(selectedFood.calories * (parseFloat(grams) || 100) / 100)} kcal
          </ThemedText>
          <ThemedText variant="caption" color={theme.textSecondary}>
            P: {Math.round(selectedFood.protein * (parseFloat(grams) || 100) / 100 * 10) / 10}g
            {'  '}C: {Math.round(selectedFood.carbs * (parseFloat(grams) || 100) / 100 * 10) / 10}g
            {'  '}G: {Math.round(selectedFood.fat * (parseFloat(grams) || 100) / 100 * 10) / 10}g
          </ThemedText>
        </View>

        <Button
          title="Guardar"
          size="large"
          onPress={handleSave}
          style={{ marginTop: 32 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
