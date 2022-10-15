import create from "zustand";

import { loginUser, getUser, logoutUser, LoginModel, User } from "@/queries";

interface UserStore {
  // Status of logging in/refreshing
  isLoading: boolean;
  // Whether the user is authenticated
  isLogged: boolean;

  user: User;

  login: (model: LoginModel) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useAuth = create<UserStore>((set, get) => ({
  isLoading: false,
  isLogged: false,

  user: {
    id: "",
    username: "",
  },

  login: async (model) => {
    set(() => ({ isLoading: true }));

    try {
      await loginUser(model);
      await get().refresh();
    } catch (e) {
      throw e;
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  logout: async () => {
    set(() => ({ isLoading: true }));

    try {
      await logoutUser();
      set(() => ({ isLogged: false }));
    } catch (e) {
      throw e;
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
  refresh: async () => {
    set(() => ({ isLoading: true }));

    try {
      const user = await getUser();

      set(() => ({
        isLogged: true,

        user: {
          id: user.id,
          username: user.username,
        },
      }));
    } catch (e) {
      throw e;
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
}));
