import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppStore } from '@/store/useAppStore';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const { user, isAuthenticated } = useAppStore();
  const { signOut } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <View style={styles.userRow}>
          <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
            <FontAwesome6 name="user" size={24} color="#FFFFFF" />
          </View>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <ThemedText variant="h3" color="#FFFFFF">
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
              <View style={[styles.iconCircle, { backgroundColor: theme.primaryDim }]}>
                <FontAwesome6 name="heart" size={16} color={theme.primary} />
              </View>
              <View style={{ marginLeft: 14 }}>
                <ThemedText variant="h3">
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
              <Button title="UPGRADE" size="small" />
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
              <FontAwesome6 name="moon" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Modo oscuro</ThemedText>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: theme.borderStrong, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Divider />

          <View style={styles.settingRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome6 name="bell" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Notificaciones</ThemedText>
            </View>
            <Switch
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: theme.borderStrong, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Divider />

          <View style={styles.settingRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome6 name="ruler-combined" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Unidades metricas</ThemedText>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: theme.borderStrong, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>

        {/* About */}
        <Card>
          <ThemedText variant="label" color={theme.textTertiary} style={{ marginBottom: 16 }}>
            ACERCA DE
          </ThemedText>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <FontAwesome6 name="lock" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Politica de privacidad</ThemedText>
            </View>
            <FontAwesome6 name="chevron-right" size={12} color={theme.textTertiary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <FontAwesome6 name="file-lines" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Terminos de uso</ThemedText>
            </View>
            <FontAwesome6 name="chevron-right" size={12} color={theme.textTertiary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <FontAwesome6 name="circle-info" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Version 1.0.0</ThemedText>
            </View>
            <ThemedText variant="caption" color={theme.textTertiary}>1.0.0</ThemedText>
          </TouchableOpacity>
        </Card>

        {isAuthenticated && (
          <Button
            title="Cerrar sesion"
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
});
