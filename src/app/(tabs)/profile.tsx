import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
      <LinearGradient
        colors={[theme.surface, theme.background]}
        style={styles.header}
      >
        <View style={styles.userRow}>
          <View style={[styles.avatar, { backgroundColor: 'rgba(99,102,241,0.2)' }]}>
            <ThemedText variant="h2" color={theme.primary}>
              {user?.display_name?.charAt(0) || user?.email?.charAt(0) || '?'}
            </ThemedText>
          </View>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <ThemedText variant="h3" color={theme.text}>
              {user?.display_name || 'Usuario'}
            </ThemedText>
            <ThemedText variant="caption" color={theme.textSecondary}>
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
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Subscription */}
        <Card style={{ marginBottom: 16, marginTop: -20 }}>
          <View style={styles.subscriptionRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primaryDim }]}>
                <FontAwesome6 name="gem" size={18} color={theme.primary} />
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
              <FontAwesome6 name="moon" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Modo oscuro</ThemedText>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: theme.borderStrong, true: theme.primary }}
              thumbColor={theme.text}
            />
          </View>

          <Divider />

          <View style={styles.settingRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome6 name="bell" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Notificaciones</ThemedText>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: theme.borderStrong, true: theme.primary }}
              thumbColor={theme.text}
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
              thumbColor={theme.text}
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
              <FontAwesome6 name="shield-halved" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Politica de privacidad</ThemedText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome6 name="file-lines" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Terminos de uso</ThemedText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome6 name="circle-info" size={16} color={theme.textSecondary} style={{ marginRight: 12 }} />
              <ThemedText variant="body">Version 1.0.0</ThemedText>
            </View>
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
