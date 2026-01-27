import { create } from "zustand";

const useStore = create((set) => ({
   // User state
   user: null,
   isAuthenticated: false,

   // Actions
   setUser: (user) => set({ user, isAuthenticated: !!user }),
   logout: () => set({ user: null, isAuthenticated: false }),

   // UI state
   isLoading: false,
   setLoading: (isLoading) => set({ isLoading }),

   // Error state
   error: null,
   setError: (error) => set({ error }),
   clearError: () => set({ error: null }),
}));

export default useStore;
