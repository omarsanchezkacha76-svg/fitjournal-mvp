import React, { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
}

const DEMO_FOODS: FoodItem[] = [
  { name: 'Pechuga de pollo', calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
  { name: 'Arroz blanco cocido', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: '100g' },
  { name: 'Huevo entero', calories: 155, protein: 13, carbs: 1.1, fat: 11, portion: '100g' },
  { name: 'Avena cruda', calories: 389, protein: 16.9, carbs: 66, fat: 6.9, portion: '100g' },
  { name: 'Plátano', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, portion: '100g' },
  { name: 'Salmón', calories: 208, protein: 20, carbs: 0, fat: 13, portion: '100g' },
  { name: 'Brócoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, portion: '100g' },
  { name: 'Patata cocida', calories: 87, protein: 1.9, carbs: 20, fat: 0.1, portion: '100g' },
  { name: 'Atún en lata', calories: 116, protein: 26, carbs: 0, fat: 1, portion: '100g' },
  { name: 'Yogur griego', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, portion: '100g' },
  { name: 'Pan integral', calories: 247, protein: 13, carbs: 41, fat: 3.4, portion: '100g' },
  { name: 'Aguacate', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, portion: '100g' },
  { name: 'Lentejas cocidas', calories: 116, protein: 9, carbs: 20, fat: 0.4, portion: '100g' },
  { name: 'Pavo magro', calories: 135, protein: 30, carbs: 0, fat: 1, portion: '100g' },
  { name: 'Almendras', calories: 579, protein: 21, carbs: 21.6, fat: 49.9, portion: '100g' },
];

interface Props {
  onSelect: (food: FoodItem) => void;
}

export function FoodSearch({ onSelect }: Props) {
  const theme = useThemeColor();
  const [query, setQuery] = useState('');
  const filtered = query.length > 1
    ? DEMO_FOODS.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Buscar alimento..."
        placeholderTextColor={theme.textTertiary}
        value={query}
        onChangeText={setQuery}
        style={{
          height: 48,
          borderRadius: 12,
          backgroundColor: theme.surfaceSecondary,
          color: theme.text,
          paddingHorizontal: 16,
          fontSize: 16,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <ThemedText variant="body">{item.name}</ThemedText>
              <ThemedText variant="body" color={theme.primary}>{item.calories} kcal</ThemedText>
            </View>
            <ThemedText variant="caption" color={theme.textSecondary}>
              P: {item.protein}g  C: {item.carbs}g  G: {item.fat}g  ·  {item.portion}
            </ThemedText>
          </TouchableOpacity>
        )}
        ListEmptyComponent={query.length > 1 ? (
          <ThemedText variant="bodySecondary" style={{ textAlign: 'center', marginTop: 20 }}>
            No encontrado
          </ThemedText>
        ) : null}
      />
    </View>
  );
}
