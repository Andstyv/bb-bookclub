import { create } from "zustand";
import PocketBase from "pocketbase";

// Initialize PocketBase client
export const pb = new PocketBase("http://127.0.0.1:8090");

type User = {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const syncAuth = () => {
    set({ user: pb.authStore.record as User, isAuthenticated: pb.authStore.isValid });
  };

  pb.authStore.onChange(syncAuth, true);

  return {
    user: pb.authStore.record as User | null,
    isAuthenticated: pb.authStore.isValid,

    login: async (email: string, password: string) => {
      try {
        const authData = await pb.collection("users").authWithPassword(email, password);

        set(() => ({ user: authData.record as User, isAuthenticated: true }));

        pb.collection("users").subscribe(authData.record.id, (e) => {
          set({ user: e.record as User });
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Login failed:", error);
        throw new Error(error?.message || "Kunne ikke logge inn. Prøv igjen.");
      }
    },

    logout: () => {
      pb.authStore.clear();
      set({ user: null, isAuthenticated: false });
      pb.collection("users").unsubscribe();
    },

    checkAuth: syncAuth,
  };
});
