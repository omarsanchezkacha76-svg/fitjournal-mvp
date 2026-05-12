import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  useAuth(); // Initialize auth listener

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? '#0F172A' : '#F8FAFC',
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}
