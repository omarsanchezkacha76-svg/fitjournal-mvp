# Setup FitJournal

## Requisitos
- Node.js 18+
- npm o yarn
- Expo CLI
- Cuenta en Supabase (gratis)
- Cuenta de Apple Developer ($99/año) para App Store
- Cuenta de Google Play Developer ($25 una vez) para Play Store

## 1. Instalar dependencias

```bash
cd proyectos/apps-mobile/activas/fitjournal/src
npm install
```

## 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a SQL Editor → New query
3. Copia y pega el contenido de `../plantillas/backend-api/supabase-schema.sql`
4. Ejecuta el script
5. Ve a Project Settings → API
6. Copia `Project URL` y `anon public`
7. Crea un archivo `.env` en `src/` basado en `.env.example`

```bash
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

## 3. Ejecutar en desarrollo

```bash
npx expo start
```

- Presiona `i` para iOS (requiere macOS + Xcode)
- Presiona `a` para Android
- Presiona `w` para web

## 4. Configurar EAS Build

```bash
npm install -g eas-cli
eas login
```

### Build de preview (test interno)
```bash
eas build --profile preview --platform ios   # o android
```

### Build de producción
```bash
eas build --profile production --platform ios
```

## 5. Configurar App Store Connect

1. Ve a [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Crea nueva app con el bundle ID `com.tuempresa.fitjournal`
3. Completa metadata (ver guía ASO)
4. Sube el build desde Xcode o EAS

## 6. Monetización (RevenueCat)

1. Crea cuenta en [revenuecat.com](https://revenuecat.com)
2. Configura productos en App Store Connect:
   - `fitjournal_monthly` — $7.99/mes
   - `fitjournal_annual` — $47.99/año
3. Conecta RevenueCat con tus productos
4. Copia las API keys a la app

## Próximos pasos

Ver `APP_STORE.md` para la guía completa de lanzamiento.
