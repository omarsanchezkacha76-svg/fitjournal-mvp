import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
  const params = useLocalSearchParams();
  const { selectedDate, updateJournalCache, journalCache } = useAppStore();

  const scanned = params.scanned === '1';
  const scannedName = params.name as string;
  const scannedCalories = parseFloat(params.calories as string) || 0;
  const scannedProtein = parseFloat(params.protein as string) || 0;
  const scannedCarbs = parseFloat(params.carbs as string) || 0;
  const scannedFat = parseFloat(params.fat as string) || 0;
  const scannedGrams = parseFloat(params.amount_grams as string) || 100;

  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [grams, setGrams] = useState('100');
  const [mealType, setMealType] = useState<FoodEntry['meal_type']>('breakfast');

  useEffect(() => {
    if (scanned) {
      setSelectedFood({
        name: scannedName,
        calories: scannedCalories,
        protein: scannedProtein,
        carbs: scannedCarbs,
        fat: scannedFat,
      });
      setGrams(String(scannedGrams));
    }
  }, [scanned, scannedName, scannedCalories, scannedProtein, scannedCarbs, scannedFat, scannedGrams]);

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
      calories: Math.round((selectedFood.calories || 0) * ratio),
      protein: Math.round((selectedFood.protein || 0) * ratio * 10) / 10,
      carbs: Math.round((selectedFood.carbs || 0) * ratio * 10) / 10,
      fat: Math.round((selectedFood.fat || 0) * ratio * 10) / 10,
      amount_grams: g,
      meal_type: mealType,
      logged_at: new Date().toISOString(),
    };
    const current = journalCache[selectedDate] || { date: selectedDate, workout: null, foods: [], notes: '' };
    updateJournalCache(selectedDate, { foods: [...current.foods, newFood] });
    router.back();
  }

  // Busqueda inicial
  if (!selectedFood && !scanned) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <ThemedText variant="h2">Anadir comida</ThemedText>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="xmark" size={20} color={theme.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Boton escanear */}
        <TouchableOpacity
          onPress={() => router.push('/diet/scan')}
          style={[styles.scanButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <View style={[styles.scanIcon, { backgroundColor: theme.primaryDim }]}>
            <FontAwesome6 name="camera" size={16} color={theme.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <ThemedText variant="h3">Escanear comida</ThemedText>
            <ThemedText variant="caption" color={theme.textTertiary}>
              Fotografia tu plato y la IA calcula los macros
            </ThemedText>
          </View>
          <FontAwesome6 name="chevron-right" size={14} color={theme.textTertiary} />
        </TouchableOpacity>

        <View style={{ marginTop: 8, flex: 1 }}>
          <FoodSearch onSelect={setSelectedFood} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemedText variant="h2">{selectedFood?.name || scannedName}</ThemedText>
        <TouchableOpacity onPress={() => { setSelectedFood(null); }}>
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
            {Math.round((selectedFood?.calories || scannedCalories) * (parseFloat(grams) || 100) / 100)} kcal
          </ThemedText>
          <ThemedText variant="caption" color={theme.textSecondary}>
            P: {Math.round((selectedFood?.protein || scannedProtein) * (parseFloat(grams) || 100) / 100 * 10) / 10}g
            {'  '}C: {Math.round((selectedFood?.carbs || scannedCarbs) * (parseFloat(grams) || 100) / 100 * 10) / 10}g
            {'  '}G: {Math.round((selectedFood?.fat || scannedFat) * (parseFloat(grams) || 100) / 100 * 10) / 10}g
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
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  scanIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
