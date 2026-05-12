import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { useThemeColor } from '@/hooks/useThemeColor';

const VOLUME_DATA = [
  { week: '31 mar', volume: 12000 },
  { week: '7 abr', volume: 13500 },
  { week: '14 abr', volume: 12800 },
  { week: '21 abr', volume: 15200 },
  { week: '28 abr', volume: 16000 },
  { week: '5 may', volume: 17500 },
];

const LIFT_PROGRESS = [
  { exercise: 'Press de banca', current: 80, target: 100, color: '#6366F1' },
  { exercise: 'Sentadilla', current: 100, target: 140, color: '#06B6D4' },
  { exercise: 'Peso muerto', current: 120, target: 180, color: '#EAB308' },
  { exercise: 'Press militar', current: 55, target: 80, color: '#22C55E' },
];

export default function ProgressScreen() {
  const theme = useThemeColor();
  const maxVolume = Math.max(...VOLUME_DATA.map(d => d.volume));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <ThemedText variant="h1" color="#FFFFFF">Progreso</ThemedText>
        <ThemedText variant="caption" color="rgba(255,255,255,0.8)">Resumen general</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <Card style={{ marginBottom: 16, marginTop: -20 }}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <ThemedText variant="statSmall" color={theme.accent}>47</ThemedText>
              <ThemedText variant="label" color={theme.textTertiary}>ENTRENAMIENTOS</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="statSmall" color={theme.warning}>12</ThemedText>
              <ThemedText variant="label" color={theme.textTertiary}>RACHA DE DIAS</ThemedText>
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <ThemedText variant="statSmall" color="#FFFFFF">1.284</ThemedText>
              <ThemedText variant="label" color={theme.textTertiary}>SERIES TOTALES</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText variant="statSmall" color="#FFFFFF">61h</ThemedText>
              <ThemedText variant="label" color={theme.textTertiary}>TIEMPO TOTAL</ThemedText>
            </View>
          </View>
        </Card>

        {/* Volume Chart Card */}
        <Card style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <ThemedText variant="h3">Volumen semanal</ThemedText>
            <ThemedText variant="caption" color={theme.textTertiary}>6 SEMANAS</ThemedText>
          </View>
          <View style={styles.chartContainer}>
            {VOLUME_DATA.map((item, index) => {
              const height = (item.volume / maxVolume) * 100;
              const isLast = index === VOLUME_DATA.length - 1;
              return (
                <View key={index} style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height,
                        backgroundColor: isLast ? theme.primary : '#1E2A4A',
                      },
                    ]}
                  />
                  <ThemedText variant="caption" color={theme.textTertiary} style={{ marginTop: 6, fontSize: 10 }}>
                    {item.week}
                  </ThemedText>
                </View>
              );
            })}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <FontAwesome6 name="arrow-trend-up" size={12} color={theme.success} style={{ marginRight: 6 }} />
            <ThemedText variant="caption" color={theme.success}>+27% vs semana anterior</ThemedText>
          </View>
        </Card>

        {/* Lift Progress Card */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText variant="h3" style={{ marginBottom: 16 }}>Marcas personales</ThemedText>
          <View style={{ gap: 16 }}>
            {LIFT_PROGRESS.map((lift, index) => {
              const pct = Math.min((lift.current / lift.target) * 100, 100);
              return (
                <View key={index}>
                  <View style={styles.liftHeader}>
                    <ThemedText variant="body">{lift.exercise}</ThemedText>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                      <ThemedText variant="body" color={lift.color} style={{ fontWeight: '700' }}>
                        {lift.current}
                      </ThemedText>
                      <ThemedText variant="caption" color={theme.textTertiary}> / {lift.target} kg</ThemedText>
                    </View>
                  </View>
                  <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${pct}%`,
                          backgroundColor: lift.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </Card>

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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  scroll: {
    padding: 16,
    paddingTop: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 110,
    paddingHorizontal: 4,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 28,
    borderRadius: 6,
  },
  liftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
