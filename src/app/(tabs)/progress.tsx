import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { useThemeColor } from '@/hooks/useThemeColor';

const VOLUME_DATA = [
  { week: 'S1', volume: 12000 },
  { week: 'S2', volume: 13500 },
  { week: 'S3', volume: 12800 },
  { week: 'S4', volume: 15200 },
  { week: 'S5', volume: 16000 },
  { week: 'S6', volume: 17500 },
];

const LIFT_PROGRESS = [
  { exercise: 'Press banca', start: 60, current: 82.5 },
  { exercise: 'Sentadilla', start: 80, current: 110 },
  { exercise: 'Peso muerto', start: 100, current: 140 },
  { exercise: 'Dominadas', start: 0, current: 12 },
];

export default function ProgressScreen() {
  const theme = useThemeColor();
  const maxVolume = Math.max(...VOLUME_DATA.map(d => d.volume));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={[theme.surface, theme.background]}
        style={styles.header}
      >
        <ThemedText variant="h1">Progreso</ThemedText>
        <ThemedText variant="caption" color={theme.textSecondary}>Ultimas 6 semanas</ThemedText>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Volume Chart Card */}
        <Card style={{ marginBottom: 16, marginTop: -20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={[styles.iconCircle, { backgroundColor: theme.primaryDim }]}>
              <FontAwesome6 name="chart-column" size={16} color={theme.primary} />
            </View>
            <ThemedText variant="h3" style={{ marginLeft: 12 }}>Volumen semanal</ThemedText>
          </View>
          <View style={styles.chartContainer}>
            {VOLUME_DATA.map((item, index) => {
              const height = (item.volume / maxVolume) * 120;
              return (
                <View key={index} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height,
                        backgroundColor: theme.primary,
                        opacity: 0.5 + (index / VOLUME_DATA.length) * 0.5,
                      },
                    ]}
                  />
                  <ThemedText variant="caption" color={theme.textTertiary} style={{ marginTop: 6 }}>
                    {item.week}
                  </ThemedText>
                </View>
              );
            })}
          </View>
          <View style={styles.volumeStats}>
            <View>
              <ThemedText variant="caption" color={theme.textSecondary}>Total</ThemedText>
              <ThemedText variant="h3">87,000 kg</ThemedText>
            </View>
            <View>
              <ThemedText variant="caption" color={theme.textSecondary}>+vs ultima</ThemedText>
              <ThemedText variant="h3" color={theme.success}>+9.4%</ThemedText>
            </View>
          </View>
        </Card>

        {/* Lift Progress Card */}
        <Card style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={[styles.iconCircle, { backgroundColor: theme.successDim }]}>
              <FontAwesome6 name="trophy" size={16} color={theme.success} />
            </View>
            <ThemedText variant="h3" style={{ marginLeft: 12 }}>Progreso en ejercicios</ThemedText>
          </View>
          <View style={{ gap: 20 }}>
            {LIFT_PROGRESS.map((lift, index) => {
              const progress = lift.start === 0
                ? 100
                : ((lift.current - lift.start) / lift.start) * 100;
              return (
                <View key={index}>
                  <View style={styles.liftHeader}>
                    <ThemedText variant="body">{lift.exercise}</ThemedText>
                    <ThemedText variant="caption" color={theme.success}>+{progress.toFixed(0)}%</ThemedText>
                  </View>
                  <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(progress, 100)}%`,
                          backgroundColor: theme.primary,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.liftValues}>
                    <ThemedText variant="caption" color={theme.textTertiary}>
                      Inicio: {lift.start} {lift.start === 0 ? 'reps' : 'kg'}
                    </ThemedText>
                    <ThemedText variant="caption" color={theme.textSecondary}>
                      Actual: {lift.current} {lift.start === 0 ? 'reps' : 'kg'}
                    </ThemedText>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={{ flex: 1 }}>
            <FontAwesome6 name="dumbbell" size={20} color={theme.primary} />
            <ThemedText variant="caption" color={theme.textSecondary} style={{ marginTop: 8 }}>Entrenamientos</ThemedText>
            <ThemedText variant="statSmall" style={{ marginTop: 4 }}>24</ThemedText>
          </Card>
          <Card style={{ flex: 1 }}>
            <FontAwesome6 name="bolt" size={20} color={theme.warning} />
            <ThemedText variant="caption" color={theme.textSecondary} style={{ marginTop: 8 }}>Racha actual</ThemedText>
            <ThemedText variant="statSmall" style={{ marginTop: 4 }}>5 dias</ThemedText>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <Card style={{ flex: 1 }}>
            <FontAwesome6 name="layer-group" size={20} color={theme.accent} />
            <ThemedText variant="caption" color={theme.textSecondary} style={{ marginTop: 8 }}>Sets totales</ThemedText>
            <ThemedText variant="statSmall" style={{ marginTop: 4 }}>312</ThemedText>
          </Card>
          <Card style={{ flex: 1 }}>
            <FontAwesome6 name="clock" size={20} color={theme.textSecondary} />
            <ThemedText variant="caption" color={theme.textSecondary} style={{ marginTop: 8 }}>Tiempo total</ThemedText>
            <ThemedText variant="statSmall" style={{ marginTop: 4 }}>18h</ThemedText>
          </Card>
        </View>

        <View style={{ height: 40 }} />
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
  scroll: {
    padding: 16,
    paddingTop: 0,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    paddingHorizontal: 8,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 32,
    borderRadius: 8,
  },
  volumeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E2A4A',
  },
  liftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  liftValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
});
