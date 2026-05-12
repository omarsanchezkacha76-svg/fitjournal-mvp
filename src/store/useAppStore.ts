import { create } from 'zustand';
import type { User, Workout, Routine, FoodEntry, DailyJournal } from '@/types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;

  // Current date for journal
  selectedDate: string;
  setSelectedDate: (date: string) => void;

  // Active workout
  activeWorkout: Workout | null;
  setActiveWorkout: (workout: Workout | null) => void;

  // Cache
  routines: Routine[];
  setRoutines: (routines: Routine[]) => void;

  // Journal data (local cache)
  journalCache: Record<string, DailyJournal>;
  updateJournalCache: (date: string, data: Partial<DailyJournal>) => void;

  // UI
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),

  selectedDate: new Date().toISOString().split('T')[0],
  setSelectedDate: (date) => set({ selectedDate: date }),

  activeWorkout: null,
  setActiveWorkout: (workout) => set({ activeWorkout: workout }),

  routines: [],
  setRoutines: (routines) => set({ routines }),

  journalCache: {},
  updateJournalCache: (date, data) =>
    set((state) => ({
      journalCache: {
        ...state.journalCache,
        [date]: { ...state.journalCache[date], date, ...data },
      },
    })),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
