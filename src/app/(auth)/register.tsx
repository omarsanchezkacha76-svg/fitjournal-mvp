import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function RegisterScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await signUp(email, password, name);
    if (error) {
      setError(error.message);
    } else {
      setError('Revisa tu email para confirmar tu cuenta');
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
          <ThemedText variant="title" style={{ textAlign: 'center' }}>
            Crear cuenta
          </ThemedText>
          <ThemedText variant="bodySecondary" style={{ textAlign: 'center', marginTop: 8 }}>
            Empieza tu diario de fitness hoy
          </ThemedText>
        </View>

        <View style={styles.form}>
          {error ? (
            <Text style={[styles.error, { color: theme.error }]}>{error}</Text>
          ) : null}

          <Input
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={{ marginTop: 12 }}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ marginTop: 12 }}
          />

          <Button
            title={loading ? 'Creando cuenta...' : 'Registrarse'}
            onPress={handleRegister}
            disabled={loading}
            style={{ marginTop: 24 }}
          />

          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            style={{ marginTop: 24, alignSelf: 'center' }}
          >
            <ThemedText variant="bodySecondary">
              ¿Ya tienes cuenta?{' '}
              <Text style={{ color: theme.primary, fontWeight: '600' }}>Inicia sesión</Text>
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
    padding: 24,
  },
  header: {
    marginBottom: 48,
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
