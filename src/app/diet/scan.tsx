import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useThemeColor } from '@/hooks/useThemeColor';
import { analyzeFoodImage, type ScannedFoodResult } from '@/lib/ai-vision';

export default function FoodScanScreen() {
  const router = useRouter();
  const theme = useThemeColor();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ScannedFoodResult | null>(null);

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center', padding: 24 }]}>
        <FontAwesome6 name="camera" size={48} color={theme.textTertiary} />
        <ThemedText variant="h3" style={{ marginTop: 16, textAlign: 'center' }}>Permiso de camara</ThemedText>
        <ThemedText variant="bodySecondary" style={{ marginTop: 8, textAlign: 'center', marginBottom: 24 }}>
          Necesitamos acceso a la camara para escanear tu comida
        </ThemedText>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  async function takePicture() {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });
      if (photo?.uri && photo.base64) {
        setPhotoUri(photo.uri);
        setAnalyzing(true);
        try {
          const data = await analyzeFoodImage(photo.base64);
          setResult(data);
        } catch (err: any) {
          Alert.alert('Error', err.message || 'No se pudo analizar la imagen');
          setPhotoUri(null);
        } finally {
          setAnalyzing(false);
        }
      }
    } catch {
      Alert.alert('Error', 'No se pudo capturar la foto');
    }
  }

  function handleConfirm() {
    if (!result) return;
    router.push({
      pathname: '/diet/add',
      params: {
        scanned: '1',
        name: result.name,
        calories: String(result.calories),
        protein: String(result.protein),
        carbs: String(result.carbs),
        fat: String(result.fat),
        amount_grams: String(result.weight_grams),
      },
    });
  }

  function handleRetake() {
    setPhotoUri(null);
    setResult(null);
    setAnalyzing(false);
  }

  // Preview + Resultado
  if (photoUri) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="xmark" size={20} color={theme.textTertiary} />
          </TouchableOpacity>
          <ThemedText variant="h3">Resultado</ThemedText>
          <View style={{ width: 20 }} />
        </View>

        <Image source={{ uri: photoUri }} style={styles.previewImage} />

        {analyzing ? (
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <ActivityIndicator size="large" color={theme.primary} />
            <ThemedText variant="bodySecondary" style={{ marginTop: 12 }}>
              Analizando con IA...
            </ThemedText>
          </View>
        ) : result ? (
          <Card style={{ margin: 16, marginTop: 20 }}>
            <ThemedText variant="h3" style={{ marginBottom: 4 }}>{result.name}</ThemedText>
            <ThemedText variant="caption" color={theme.textTertiary}>
              Confianza: {Math.round(result.confidence * 100)}%
            </ThemedText>

            <View style={styles.macroRow}>
              <View style={styles.macroItem}>
                <ThemedText variant="statSmall" color={theme.primary}>{result.calories}</ThemedText>
                <ThemedText variant="label">KCAL</ThemedText>
              </View>
              <View style={styles.macroItem}>
                <ThemedText variant="statSmall" color={theme.accent}>{result.protein}g</ThemedText>
                <ThemedText variant="label">PROTEINA</ThemedText>
              </View>
              <View style={styles.macroItem}>
                <ThemedText variant="statSmall" color={theme.success}>{result.carbs}g</ThemedText>
                <ThemedText variant="label">CARBS</ThemedText>
              </View>
              <View style={styles.macroItem}>
                <ThemedText variant="statSmall" color={theme.warning}>{result.fat}g</ThemedText>
                <ThemedText variant="label">GRASAS</ThemedText>
              </View>
            </View>

            <ThemedText variant="caption" color={theme.textSecondary} style={{ marginTop: 8 }}>
              Peso estimado: {result.weight_grams}g
            </ThemedText>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
              <Button title="Confirmar" onPress={handleConfirm} style={{ flex: 1 }} />
              <Button title="Reintentar" variant="secondary" onPress={handleRetake} style={{ flex: 1 }} />
            </View>
          </Card>
        ) : null}
      </View>
    );
  }

  // Camara
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.overlayTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
            <FontAwesome6 name="xmark" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <ThemedText variant="h3" color="#FFFFFF" style={{ textAlign: 'center', flex: 1 }}>
            Escanear comida
          </ThemedText>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.overlayBottom}>
          <ThemedText variant="caption" color="rgba(255,255,255,0.8)" style={{ textAlign: 'center', marginBottom: 20 }}>
            Enfoca tu plato y pulsa el boton
          </ThemedText>
          <TouchableOpacity onPress={takePicture} style={styles.shutterButton}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  camera: {
    flex: 1,
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  previewImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  macroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(30,42,74,0.5)',
  },
  macroItem: {
    alignItems: 'center',
  },
});
