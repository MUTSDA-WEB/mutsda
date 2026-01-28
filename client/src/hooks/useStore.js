import { create } from "zustand";

const userStore = create((set) => ({
   // User state
   user: null,
   isAuthenticated: false,
   groups: [],

   // Actions
   setUser: (user) => set({ user, isAuthenticated: !!user }),
   logout: () => set({ user: null, isAuthenticated: false }),
   setGroups: (group) => set({ groups: group }),

   // UI state
   isLoading: false,
   setLoading: (isLoading) => set({ isLoading }),

   // Error state
   error: null,
   setError: (error) => set({ error }),
   clearError: () => set({ error: null }),
}));

export default userStore;
