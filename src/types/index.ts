export interface User {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  subscription_tier: 'free' | 'pro' | 'premium';
  created_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'cardio' | 'calisthenics';
  muscle_group: string;
  equipment: 'barbell' | 'dumbbell' | 'machine' | 'cable' | 'bodyweight' | 'kettlebell' | 'none';
  is_custom: boolean;
  user_id?: string | null;
  image_url?: string | null;
  instructions?: string | null;
}

export interface WorkoutSet {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
  rpe?: number;
}

export interface WorkoutExercise {
  id: string;
  exercise_id: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  rest_seconds: number;
  order_index: number;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  duration_seconds: number;
  exercises: WorkoutExercise[];
  user_id: string;
  is_completed: boolean;
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: RoutineExercise[];
  is_predefined: boolean;
  user_id?: string | null;
  category: 'strength' | 'calisthenics' | 'cardio' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface RoutineExercise {
  exercise_id: string;
  exercise: Exercise;
  sets: number;
  reps_min: number;
  reps_max: number;
  rest_seconds: number;
  order_index: number;
}

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  amount_grams: number;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  logged_at: string;
}

export interface DailyJournal {
  date: string;
  workout: Workout | null;
  foods: FoodEntry[];
  notes: string;
  weight_kg?: number;
  mood?: number;
  sleep_hours?: number;
}
