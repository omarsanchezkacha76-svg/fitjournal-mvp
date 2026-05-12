# FitJournal — Prompt para Lovable.dev

## INSTRUCCIONES DE USO
1. Ve a https://lovable.dev
2. Crea nuevo proyecto o importa repo: `https://github.com/omarsanchezkacha76-svg/fitjournal-mvp`
3. Pega TODO este prompt en el chat de Lovable
4. Sube las 4 screenshots de tu app actual como referencia de "ANTES"
5. Pide iteraciones pantalla por pantalla

---

## PROMPT COMPLETO (copiar y pegar)

Rediseña por completo esta app de fitness llamada **FitJournal**. Es una mobile app para atletas serios (hombres 18-35) que combina tracking de entrenamiento, rutinas de gimnasio/calistenia, dieta y diario diario.

### STACK
- React (web preview) — luego se portará a React Native
- Mobile-first, viewport 375-430px
- Dark mode ONLY. No light mode.

### DESIGN TOKENS (aplicar estrictamente)

**Backgrounds:**
- Base: `#0A0F1E`
- Surface (cards): `#141B2D`
- Surface hover: `#1A2340`
- Border: `#1E2A4A`
- Border strong: `#2D3A5C`

**Colors:**
- Primary (indigo): `#6366F1`
- Primary glow: `#4F46E5`
- Accent (cyan): `#06B6D4`
- Accent glow: `#0891B2`
- Success: `#22C55E`
- Error: `#EF4444`
- Warning: `#EAB308`

**Text:**
- Primary: `#F8FAFC`
- Secondary: `#94A3B8`
- Tertiary: `#475569`

**Gradients:**
- Primary CTA: `linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)`
- Accent: `linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)`

**Typography:**
- Display/Headlines: "Space Grotesk", weight 700, tracking -0.02em
- Body: "Inter", weight 400-500
- Labels: uppercase, weight 600, tracking 0.05em, 11-12px
- Stats/Numbers: Space Grotesk 700, tabular-nums

**Spacing:**
- Screen horizontal padding: 20px
- Card padding: 24px
- Gap between cards: 16px
- Base unit: 4px

**Radii:**
- Cards: 20px
- Buttons/Inputs: 14px
- Badges: 8px
- Avatars: 50%

**Shadows:**
- Card: `0 8px 32px rgba(0,0,0,0.3)` + `inset 0 1px 0 rgba(255,255,255,0.05)`
- Glow primary: `0 0 20px rgba(99,102,241,0.25)`
- Glow accent: `0 0 20px rgba(6,182,212,0.25)`

### COMPONENTES BASE

**Cards:**
- Background `#141B2D`, border `1px solid #1E2A4A`, radius 20px
- Shadow: card shadow + inner highlight
- Press: scale(0.98), 100ms ease-out
- Hover: border → `#2D3A5C`

**Buttons:**
- Primary: gradient indigo, glow, uppercase, weight 700, tracking 0.05em, radius 14px, height 52px
- Secondary: transparent + border `#2D3A5C`
- Ghost: text-only indigo
- Press: brightness +10%, 100ms

**Inputs:**
- Background `#0A0F1E`, border `#1E2A4A`, radius 14px, height 56px
- Focus: 2px primary + glow

**Badges:**
- Small pill, uppercase, radius 8px
- Semantic backgrounds with 12-15% opacity

### VOZ Y TONO
- Técnico. Directo. Cero relleno.
- "Start Workout", "Log Meal", "Add Set"
- NO emojis. NO animaciones de celebración. NO gamificación.
- Sentence case para body, ALL CAPS para labels/badges.
- Ejemplo: "7-day streak" (bien) vs "You're crushing it! 🔥" (mal)

### ICONOS
- Usar Lucide React (equivalente a Phosphor Bold)
- Tamaño 24px default, 20px inline
- Color hereda del texto

### PANTALLAS A REDISEÑAR (7 pantallas)

1. **Today (Home)** — Header con fecha navegable, macro summary (kcal/proteína/carbs/grasas), card de entrenamiento del día, card de nutrición (comidas por tipo: desayuno/comida/cena/snack), notas
2. **Routines** — Header "Rutinas", tabs Predefinidas/Mis rutinas, cards de rutina con icono, nombre, descripción, badge de dificultad, botón Empezar
3. **Active Workout** — Timer en vivo, nombre de ejercicio, logger de series (kg/reps/check), rest timer con glow pulsante, botón Finalizar
4. **Add Food** — Buscador, lista de alimentos, input de gramos, cálculo automático de macros, selector de tipo de comida
5. **Progress** — Grid de stats, gráfico de volumen, barras de progreso por ejercicio
6. **Profile** — Avatar, nombre, card de suscripción, lista de ajustes (toggle switches)
7. **Auth** — Login/Register centrado, logo, email/password, toggle entre modos

### REGLAS DE LAYOUT
- Bottom tab bar fijo: 4 items (Hoy, Rutinas, Progreso, Perfil)
- Content scrolls under tab bar
- Screen titles en header grande con gradient background
- Alta densidad de datos, minimizar espacio vacío
- No onboarding, no empty-state illustrations

### ANIMACIONES
- Page transition: slide from right, 250ms ease-out
- Card press: scale(0.98), 100ms
- Button press: brightness +10%
- Rest timer active: pulsing accent glow
- NO bounce, NO spring physics

---

## MENSAJE DE SEGUIMIENTO PARA LOVABLE

Después de pegar el prompt principal, usa estos mensajes uno por uno para iterar:

1. "Aplica este design system a la pantalla Today (Home). Incluye header con fecha navegable, resumen de macros, card de entrenamiento, card de nutrición con comidas por tipo, y notas."

2. "Ahora diseña la pantalla Routines con tabs Predefinidas/Mis rutinas y cards de rutina con dificultad badge."

3. "Diseña Active Workout con timer en vivo, set logger (kg/reps/check), rest timer con glow cyan pulsante, y botón Finalizar."

4. "Diseña Add Food con buscador, lista de alimentos, input de gramos, y selector de tipo de comida."

5. "Diseña Progress con grid de stats, gráfico de barras de volumen, y barras de progreso por ejercicio."

6. "Diseña Profile con avatar, suscripción card, y lista de ajustes con toggles."

7. "Diseña Auth (login/register) centrado, minimal, con logo y toggle de modo."

---

## NOTAS
- Sube las screenshots de tu app actual a Lovable como referencia visual
- Si Lovable genera código web (HTML/Tailwind), ese código se adaptará manualmente a React Native después
- Prioriza la pantalla Today primero — es la más importante
