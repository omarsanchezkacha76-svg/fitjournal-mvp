import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function LoginScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError('Completa todos los campos');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={[styles.logoCircle, { backgroundColor: theme.primary }]}>
            <Text style={styles.logoIcon}>💪</Text>
          </View>
          <ThemedText variant="title" style={{ textAlign: 'center', marginTop: 24 }}>
            FitJournal
          </ThemedText>
          <ThemedText variant="bodySecondary" style={{ textAlign: 'center', marginTop: 8 }}>
            Tu diario de fitness
          </ThemedText>
        </View>

        <View style={styles.form}>
          {error ? (
            <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
          ) : null}

          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ marginTop: 14 }}
          />

          <Button
            title={loading ? 'Entrando...' : 'Iniciar sesión'}
            onPress={handleLogin}
            disabled={loading}
            style={{ marginTop: 28 }}
          />

          <TouchableOpacity
            onPress={() => router.push('/(auth)/register')}
            style={{ marginTop: 24, alignSelf: 'center' }}
          >
            <ThemedText variant="bodySecondary">
              ¿No tienes cuenta?{' '}
              <Text style={{ color: theme.primary, fontWeight: '700' }}>Regístrate</Text>
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace('/(tabs)')}
            style={{ marginTop: 16, alignSelf: 'center' }}
          >
            <ThemedText variant="caption" color={theme.textTertiary}>
              Continuar sin cuenta
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 32,
  },
  form: {
    gap: 0,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
});
