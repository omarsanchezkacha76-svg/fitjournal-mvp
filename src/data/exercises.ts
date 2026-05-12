import type { Exercise } from '@/types';

export const PREDEFINED_EXERCISES: Exercise[] = [
  // Chest
  { id: 'bench-press', name: 'Press de banca', category: 'chest', muscle_group: 'Pectoral', equipment: 'barbell', is_custom: false, image_url: 'https://wger.de/media/exercise-images/192/bench-press-1.png', instructions: 'Tumbado en el banco, agarra la barra con las manos separadas al ancho de los hombros. Baja controladamente al pecho y empuja hacia arriba.' },
  { id: 'incline-bench', name: 'Press inclinado', category: 'chest', muscle_group: 'Pectoral superior', equipment: 'barbell', is_custom: false },
  { id: 'dumbbell-flyes', name: 'Aperturas con mancuernas', category: 'chest', muscle_group: 'Pectoral', equipment: 'dumbbell', is_custom: false },
  { id: 'push-ups', name: 'Flexiones', category: 'chest', muscle_group: 'Pectoral', equipment: 'bodyweight', is_custom: false, image_url: 'https://wger.de/media/exercise-images/195/push-ups-1.png', instructions: 'Posición de plancha, manos al ancho de los hombros. Baja el pecho al suelo y empuja hacia arriba manteniendo el core activado.' },
  { id: 'dips', name: 'Fondos', category: 'chest', muscle_group: 'Pectoral / Tríceps', equipment: 'bodyweight', is_custom: false },
  { id: 'cable-crossover', name: 'Cruces en polea', category: 'chest', muscle_group: 'Pectoral', equipment: 'cable', is_custom: false },

  // Back
  { id: 'pull-ups', name: 'Dominadas', category: 'back', muscle_group: 'Dorsal', equipment: 'bodyweight', is_custom: false, image_url: 'https://wger.de/media/exercise-images/101/pull-ups-1.png', instructions: 'Agarra la barra con las palmas hacia afuera. Tira del cuerpo hacia arriba hasta que la barbilla supere la barra. Baja controladamente.' },
  { id: 'chin-ups', name: 'Dominadas supinas', category: 'back', muscle_group: 'Dorsal / Bíceps', equipment: 'bodyweight', is_custom: false },
  { id: 'deadlift', name: 'Peso muerto', category: 'back', muscle_group: 'Espalda baja / Isquios', equipment: 'barbell', is_custom: false, image_url: 'https://wger.de/media/exercise-images/117/deadlift-1.png', instructions: 'Pies bajo la barra, espalda recta. Levanta la barra estirando caderas y rodillas simultáneamente. Mantén la barra cerca del cuerpo.' },
  { id: 'barbell-row', name: 'Remo con barra', category: 'back', muscle_group: 'Dorsal / Trapecio', equipment: 'barbell', is_custom: false },
  { id: 'dumbbell-row', name: 'Remo con mancuerna', category: 'back', muscle_group: 'Dorsal', equipment: 'dumbbell', is_custom: false },
  { id: 'lat-pulldown', name: 'Jalón al pecho', category: 'back', muscle_group: 'Dorsal', equipment: 'machine', is_custom: false },
  { id: 'face-pulls', name: 'Face pulls', category: 'back', muscle_group: 'Deltoides posteriores', equipment: 'cable', is_custom: false },

  // Legs
  { id: 'squat', name: 'Sentadilla', category: 'legs', muscle_group: 'Cuádriceps / Glúteos', equipment: 'barbell', is_custom: false, image_url: 'https://wger.de/media/exercise-images/111/squat-1.png', instructions: 'Barra sobre los trapecios, pies separados al ancho de los hombros. Baja las caderas hasta que los muslos estén paralelos al suelo. Vuelve arriba empujando con los talones.' },
  { id: 'front-squat', name: 'Sentadilla frontal', category: 'legs', muscle_group: 'Cuádriceps', equipment: 'barbell', is_custom: false },
  { id: 'leg-press', name: 'Prensa de piernas', category: 'legs', muscle_group: 'Cuádriceps / Glúteos', equipment: 'machine', is_custom: false },
  { id: 'romanian-deadlift', name: 'Peso muerto rumano', category: 'legs', muscle_group: 'Isquiotibiales / Glúteos', equipment: 'barbell', is_custom: false },
  { id: 'leg-curls', name: 'Curl femoral', category: 'legs', muscle_group: 'Isquiotibiales', equipment: 'machine', is_custom: false },
  { id: 'leg-extensions', name: 'Extensión de cuádriceps', category: 'legs', muscle_group: 'Cuádriceps', equipment: 'machine', is_custom: false },
  { id: 'calf-raises', name: 'Elevación de gemelos', category: 'legs', muscle_group: 'Gemelos', equipment: 'machine', is_custom: false },
  { id: 'lunges', name: 'Zancadas', category: 'legs', muscle_group: 'Cuádriceps / Glúteos', equipment: 'dumbbell', is_custom: false },
  { id: 'bulgarian-split-squat', name: 'Sentadilla búlgara', category: 'legs', muscle_group: 'Cuádriceps / Glúteos', equipment: 'dumbbell', is_custom: false },

  // Shoulders
  { id: 'overhead-press', name: 'Press militar', category: 'shoulders', muscle_group: 'Deltoides', equipment: 'barbell', is_custom: false },
  { id: 'dumbbell-press', name: 'Press con mancuernas', category: 'shoulders', muscle_group: 'Deltoides', equipment: 'dumbbell', is_custom: false },
  { id: 'lateral-raises', name: 'Elevaciones laterales', category: 'shoulders', muscle_group: 'Deltoides laterales', equipment: 'dumbbell', is_custom: false },
  { id: 'rear-delt-flyes', name: 'Pájaros posteriores', category: 'shoulders', muscle_group: 'Deltoides posteriores', equipment: 'dumbbell', is_custom: false },
  { id: 'upright-row', name: 'Remo al mentón', category: 'shoulders', muscle_group: 'Deltoides / Trapecio', equipment: 'barbell', is_custom: false },

  // Arms
  { id: 'barbell-curl', name: 'Curl con barra', category: 'arms', muscle_group: 'Bíceps', equipment: 'barbell', is_custom: false },
  { id: 'dumbbell-curl', name: 'Curl con mancuerna', category: 'arms', muscle_group: 'Bíceps', equipment: 'dumbbell', is_custom: false },
  { id: 'hammer-curl', name: 'Curl martillo', category: 'arms', muscle_group: 'Bíceps / Braquial', equipment: 'dumbbell', is_custom: false },
  { id: 'tricep-pushdown', name: 'Pushdown tríceps', category: 'arms', muscle_group: 'Tríceps', equipment: 'cable', is_custom: false },
  { id: 'skullcrushers', name: 'Extensión de tríceps', category: 'arms', muscle_group: 'Tríceps', equipment: 'barbell', is_custom: false },
  { id: 'close-grip-bench', name: 'Press cerrado', category: 'arms', muscle_group: 'Tríceps', equipment: 'barbell', is_custom: false },

  // Core
  { id: 'plank', name: 'Plancha', category: 'core', muscle_group: 'Abdominales', equipment: 'bodyweight', is_custom: false },
  { id: 'hanging-leg-raise', name: 'Elevación de piernas', category: 'core', muscle_group: 'Abdominales inferiores', equipment: 'bodyweight', is_custom: false },
  { id: 'crunches', name: 'Abdominales', category: 'core', muscle_group: 'Recto abdominal', equipment: 'bodyweight', is_custom: false },
  { id: 'russian-twists', name: 'Giros rusos', category: 'core', muscle_group: 'Oblicuos', equipment: 'bodyweight', is_custom: false },
  { id: 'ab-wheel', name: 'Rueda abdominal', category: 'core', muscle_group: 'Abdominales', equipment: 'none', is_custom: false },

  // Calisthenics skills
  { id: 'muscle-up', name: 'Muscle-up', category: 'calisthenics', muscle_group: 'Espalda / Pecho', equipment: 'bodyweight', is_custom: false },
  { id: 'handstand', name: 'Parada de manos', category: 'calisthenics', muscle_group: 'Hombros / Core', equipment: 'bodyweight', is_custom: false },
  { id: 'planche', name: 'Planche', category: 'calisthenics', muscle_group: 'Hombros / Core', equipment: 'bodyweight', is_custom: false },
  { id: 'front-lever', name: 'Front lever', category: 'calisthenics', muscle_group: 'Dorsal / Core', equipment: 'bodyweight', is_custom: false },
  { id: 'l-sit', name: 'L-sit', category: 'calisthenics', muscle_group: 'Core / Tríceps', equipment: 'bodyweight', is_custom: false },
  { id: 'dragon-flag', name: 'Dragon flag', category: 'calisthenics', muscle_group: 'Core', equipment: 'bodyweight', is_custom: false },
];
