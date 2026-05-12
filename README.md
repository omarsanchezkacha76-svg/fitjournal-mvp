# FitJournal

Tu diario de fitness. Rutinas de gym y calistenia, seguimiento de dieta, y progreso visual en una sola app limpia tipo Notion.

## Stack

- **Mobile**: React Native + Expo Router
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **State**: Zustand + TanStack Query
- **Monetización**: RevenueCat (iOS + Android)

## Estructura

```
src/
├── app/                 # Pantallas (Expo Router)
│   ├── (tabs)/          # Tab bar: Hoy, Rutinas, Progreso, Perfil
│   ├── (auth)/          # Login, Register
│   ├── workout/active   # Entrenamiento en curso
│   └── diet/add         # Añadir comida
├── components/          # UI + Workout + Diet
├── constants/Colors.ts  # Design System
├── data/exercises.ts    # 42 ejercicios predefinidos
├── lib/                 # Supabase, utils, RevenueCat
├── store/               # Zustand store
└── types/               # TypeScript types
```

## Setup rápido

```bash
cd src
npm install
# Crear .env con tus keys de Supabase
npx expo start
```

## Build para tiendas

```bash
# Preview
npx eas build --profile preview --platform all

# Production
npx eas build --profile production --platform all
```

## Features MVP

- [x] Diario diario tipo Notion (workout + dieta + notas)
- [x] Workout tracker ultrarrápido (<2 taps por set)
- [x] 8 rutinas predefinidas (PPL, UL, Full Body, Calistenia)
- [x] Creador de rutinas personalizadas
- [x] Seguimiento de dieta con database de alimentos
- [x] Gráficos de progreso (volumen, lifts)
- [x] Imágenes e instrucciones de ejercicios
- [x] Timer de descanso
- [x] Cloud sync + Auth (email, Google, Apple)
- [x] Modo oscuro

## Monetización

| Plan | Precio | Features |
|------|--------|----------|
| Free | $0 | Rutinas ilimitadas, tracking, dieta, sync |
| Pro | $7.99/mo | Analytics, planes personalizados, widgets, export |

## Licencia

Privada. Todos los derechos reservados.
