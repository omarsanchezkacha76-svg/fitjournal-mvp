import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppStore } from '@/store/useAppStore';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const colorScheme = useColorScheme();
  const { user, isAuthenticated } = useAppStore();
  const { signOut } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <View style={styles.userRow}>
          <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <ThemedText variant="title" color="#FFFFFF">
              {user?.display_name?.charAt(0) || user?.email?.charAt(0) || '?'}
            </ThemedText>
          </View>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <ThemedText variant="subtitle" color="#FFFFFF">
              {user?.display_name || 'Usuario'}
            </ThemedText>
            <ThemedText variant="caption" color="rgba(255,255,255,0.8)">
              {user?.email || 'Invitado'}
            </ThemedText>
          </View>
          {!isAuthenticated && (
            <Button
              title="Entrar"
              size="small"
              onPress={() => router.push('/(auth)/login')}
            />
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Subscription */}
        <Card style={{ marginBottom: 16, marginTop: -20 }}>
          <View style={styles.subscriptionRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
                <ThemedText style={{ fontSize: 20 }}>💎</ThemedText>
              </View>
              <View style={{ marginLeft: 14 }}>
                <ThemedText variant="subtitle">
                  {user?.subscription_tier === 'pro' ? 'FitJournal Pro' : 'Plan Free'}
                </ThemedText>
                <ThemedText variant="caption" color={theme.textSecondary}>
                  {user?.subscription_tier === 'pro'
                    ? 'Acceso completo a todas las funciones'
                    : 'Rutinas y tracking ilimitado gratis'}
                </ThemedText>
              </View>
            </View>
            {user?.subscription_tier !== 'pro' && (
              <Button title="Upgrade" size="small" />
            )}
          </View>
        </Card>

        {/* Settings */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText variant="label" color={theme.textTertiary} style={{ marginBottom: 16 }}>
            AJUSTES
          </ThemedText>

          <View style={styles.settingRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 18, marginRight: 12 }}>🌙</ThemedText>
              <ThemedText variant="body">Modo oscuro</ThemedText>
            </View>
            <Switch
              value={colorScheme === 'dark'}
              onValueChange={() => {}}
              trackColor={{ false: '#CBD5E1', true: theme.primary }}
            />
          </View>

          <View style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: theme.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 18, marginRight: 12 }}>🔔</ThemedText>
              <ThemedText variant="body">Notificaciones</ThemedText>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: '#CBD5E1', true: theme.primary }}
            />
          </View>

          <View style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: theme.border }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 18, marginRight: 12 }}>⚖️</ThemedText>
              <ThemedText variant="body">Unidades métricas</ThemedText>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: '#CBD5E1', true: theme.primary }}
            />
          </View>
        </Card>

        {/* About */}
        <Card>
          <ThemedText variant="label" color={theme.textTertiary} style={{ marginBottom: 16 }}>
            ACERCA DE
          </ThemedText>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 16, marginRight: 12 }}>🛡️</ThemedText>
              <ThemedText variant="body">Política de privacidad</ThemedText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 16, marginRight: 12 }}>📄</ThemedText>
              <ThemedText variant="body">Términos de uso</ThemedText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ fontSize: 16, marginRight: 12 }}>ℹ️</ThemedText>
              <ThemedText variant="body">Versión 1.0.0</ThemedText>
            </View>
          </TouchableOpacity>
        </Card>

        {isAuthenticated && (
          <Button
            title="Cerrar sesión"
            variant="ghost"
            onPress={signOut}
            style={{ marginTop: 24, marginBottom: 40 }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    padding: 16,
    paddingTop: 0,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItem: {
    paddingVertical: 16,
  },
});
