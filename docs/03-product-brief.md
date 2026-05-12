# Product Brief: FitJournal

**Versión**: 1.0
**Fecha**: 2026-05-12
**Estado**: MVP definido
**Dueño**: Product Manager Mobile

---

## Propuesta de Valor Única

> **"FitJournal es tu diario de fitness. Planifica rutinas de gym y calistenia, tracking de dieta, y visualiza tu progreso día a día en una interfaz limpia tipo Notion — todo en una sola app."**

**En una frase**: FitJournal ayuda a personas que entrenan a dejar de usar 4 apps distintas, reuniendo rutinas, dieta y progreso en un diario visual ultrarrápido.

---

## Problem Statement

**Problema**: Los usuarios de fitness usan 3-4 apps separadas (workout tracker + contador de calorías + app de recovery + notas), lo que genera fricción diaria, datos desconectados y abandono del tracking.

**Evidencia**:
- 200+ threads de Reddit citan esta fragmentación como principal frustración
- MyFitnessPal (200M usuarios) ha degradado su free tier con ads y paywalls, alienando usuarios
- Hevy (5M+, 4.8★) se ha vuelto "bloated" perdiendo su ventaja de simplicidad
- Strong (3M+, 4.7★) es demasiado simple: limita a 3 rutinas en free y no guía a principiantes

**Tamaño del problema**: Mercado fitness apps $15.18B (2025), creciendo al 30.94% CAGR. Solo el nicho de workout tracking representa millones de usuarios activos.

---

## MVP (Semanas 1-4)

| Prioridad | Funcionalidad | Justificación | Esfuerzo estimado |
|-----------|--------------|---------------|-------------------|
| **P0** | **Diario diario tipo Notion** | Core diferenciador. Cada día = página con workout + comidas + notas. Limpio y visual. | 4 días |
| **P0** | **Workout tracker ultrarrápido** | Pain point #1: logging en <2 taps. Registrar sets/reps/peso. Timer de descanso. | 4 días |
| **P0** | **Rutinas predefinidas** | Principiantes no saben qué hacer. PPL, Upper/Lower, Full Body, Calistenia básica. | 3 días |
| **P0** | **Creador de rutinas personalizadas** | Diferenciador vs Strong (que limita free). Editor simple drag-and-drop. | 3 días |
| **P1** | **Seguimiento de dieta básico** | Database de alimentos + barcode scanner. Macros (proteína, carbs, grasas). | 4 días |
| **P1** | **Gráficos de progreso** | Feature más motivadora según Reddit. Visualizar strength gains. | 2 días |
| **P2** | **Progresiones calistenia** | Skill tree opcional: push-up → diamond → archer → planche lean. | 3 días |
| **P2** | **Cloud sync + auth** | No perder datos. Multi-device desde el día 1. Email + Google + Apple. | 2 días |

**Total MVP**: 25 días (~4 semanas con 1 dev full-time)

---

## User Flows Principales

### 1. Onboarding (Primer uso — 2 minutos)
1. **Pantalla 1**: "Tu diario de fitness empieza hoy" + selección de objetivo (perder peso / ganar músculo / mantener)
2. **Pantalla 2**: ¿Dónde entrenas? (Gym / Casa / Parque) + equipamiento disponible
3. **Pantalla 3**: FitJournal genera tu primera rutina semanal automáticamente
4. **Done**: Landing en el diario de hoy con la rutina lista para empezar

### 2. Core Loop (Uso diario — 30 segundos)
1. Abrir app → landing en "Hoy" (diario de hoy)
2. Tap en workout programado → iniciar
3. Loggear set: tap en ejercicio → input reps/peso → check → auto-avanza
4. Al finalizar: workout guardado automáticamente en el diario del día
5. Si come algo: tap "+ Comida" → barcode scanner o búsqueda → añadir al diario

### 3. Monetización (Momento de conversión)
- **Semana 2 de uso**: Banner educativo "Descubre insights de tu progreso"
- **Momento de conversión**: Al intentar ver "Analytics avanzados" o "Planes personalizados IA"
- **Paywall**: Trial de 7 días gratis de Pro, luego $7.99/mes o $47.99/año

---

## Funcionalidades Post-MVP (Backlog)

| Prioridad | Funcionalidad | Justificación |
|-----------|--------------|---------------|
| P1 | Apple Health / Google Fit sync | Integración nativa de salud |
| P1 | Apple Watch app | Logging desde muñeca |
| P1 | Exportar datos (CSV/PDF) | Portabilidad, feature pedida en Reddit |
| P2 | Intermitent fasting timer | Tendencia creciente |
| P2 | Water tracker | Complemento natural al diario |
| P2 | Body measurements + fotos | Progreso físico visual |
| P3 | Social (compartir logros) | Feature de retención |
| P3 | AI workout suggestions | Basado en progreso y recovery |

---

## Design Direction

**Estilo visual**: Notion meets Fitness
- Fondo blanco/gris muy limpio (como Notion)
- Cards minimalistas con bordes sutiles
- Tipografía San Francisco / Roboto, legible
- Color accent índigo/violeta (#6366F1) para CTAs
- Modo oscuro completo desde el día 1
- Ilustraciones simples en empty states

**Pantallas principales** (Tab bar de 4):
1. **Hoy** — Diario del día con workout + comidas + notas
2. **Rutinas** — Mis rutinas + biblioteca predefinida
3. **Progreso** — Gráficos de fuerza, volumen, peso corporal
4. **Perfil** — Ajustes, suscripción, datos

---

## Stack Técnico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Mobile | React Native + Expo | Un dev, dos plataformas, OTA updates, rápido MVP |
| Backend | Supabase | Auth, PostgreSQL, Storage, Edge Functions en uno |
| Estado | Zustand + TanStack Query | Ligero, offline-first, cache inteligente |
| Monetización | RevenueCat | Unifica IAP iOS/Android |
| Analytics | PostHog | Open source, eventos en tiempo real |
| Notificaciones | Expo Push | Recordatorios de workout, log de comidas |

---

## Métricas de Éxito del MVP

| Métrica | Target MVP | Target Escalado |
|---------|-----------|-----------------|
| D1 Retention | >35% | >45% |
| D7 Retention | >18% | >25% |
| D30 Retention | >10% | >15% |
| Rating promedio | >4.5 | >4.7 |
| Crash-free rate | >98% | >99.5% |
| Avg. session length | >3 min | >5 min |
| Conversion a Pro | >1% | >3% |

---

## Kill Criteria

Si en las primeras 4 semanas post-launch NO alcanzamos:
- **D1 Retention >25%** → Revisar onboarding y core loop
- **Rating <3.8** → Escuchar reseñas y pivotar features
- **<100 descargas orgánicas/día** al mes → Revisar ASO o nicho

Si después de 8 semanas no mejoramos, **cancelar o pivotar** a otro nicho.

---

## Modelo de Monetización

### Free Tier (Generoso)
- Rutinas ilimitadas (personalizadas + predefinidas)
- Workout tracking ilimitado
- Diario diario ilimitado
- Barcode scanner gratis
- Database de alimentos completa
- Gráficos básicos de progreso
- Cloud sync

### Pro Tier ($7.99/mes o $47.99/año)
- Analytics avanzados (tendencias, comparativas)
- Planes de entrenamiento personalizados auto-generados
- Progresiones calistenia avanzadas (skill trees)
- Exportar datos a CSV/PDF
- Widgets de home screen
- Soporte prioritario

**Trial**: 7 días gratis, sin compromiso. Cancela cuando quieras.

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Database de alimentos insuficiente | Media | Alto | Integrar API pública (Open Food Facts) + crowdsource |
| Competidor grande copia el modelo | Baja | Alto | Moverse rápido, construir comunidad, brand fuerte |
| All-in-one = jack of all trades | Media | Alto | Hacer 3 cosas MUY bien (tracker, diario, dieta) antes de expandir |
| Costos de API de comida | Media | Medio | Cachear resultados, usar Open Food Facts (gratis) |

---

## Próximos Pasos

1. ✅ Investigación de mercado
2. ✅ Análisis de reseñas
3. ✅ Product Brief
4. ⏳ Design System (Diseñador UI/UX)
5. ⏳ Arquitectura técnica (Arquitecto Mobile)
6. ⏳ Desarrollo MVP (4 semanas)
7. ⏳ Testing + Soft Launch
