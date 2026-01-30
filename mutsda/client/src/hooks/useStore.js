import { create } from "zustand";

const userStore = create((set) => ({
   // User state
   user: null,
   isAuthenticated: false,

   // all registered members
   members: [],
   // all the groups where the user is a member
   groups: [],
   // all the user DMs
   directMessages: [],
   // all community messages
   communityMessages: [],
   // all visitor Messages to the user
   visitorMessages: [],
   // all userGroup messages
   groupMessages: [],

   // store all events
   upcomingEvents: [],
   pastEvents: [],
   allEvents: [],

   // Actions
   setAllEvents: (events) => set({ allEvents: events }),
   setUser: (user) => set({ user, isAuthenticated: !!user }),
   logout: () => set({ user: null, isAuthenticated: false }),

   // update groups and messages
   setGroups: (group) => set({ groups: group }),
   setMembers: (members) => set({ members }),
   setGroupMessages: (group) => set({ groupMessages: group }),

   setDMs: (dms) => set({ directMessages: dms }),
   setVisitorMsg: (vm) => set({ visitorMessages: vm }),
   setComMsg: (cm) => set({ communityMessages: cm }),

   // update events
   setUpcomingEvents: (e) => set({ upcomingEvents: e }),
   setPastEvents: (e) => set({ pastEvents: e }),

   // UI state
   isLoading: false,
   setLoading: (isLoading) => set({ isLoading }),

   // Error state
   error: null,
   setError: (error) => set({ error }),
   clearError: () => set({ error: null }),
}));

export default userStore;
