import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function NotFoundScreen() {
  const theme = useThemeColor();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemedText variant="title" style={{ fontSize: 48 }}>404</ThemedText>
      <ThemedText variant="subtitle" style={{ marginTop: 8 }}>
        Página no encontrada
      </ThemedText>
      <Link href="/(tabs)" asChild style={{ marginTop: 24 }}>
        <Button title="Volver al inicio" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
