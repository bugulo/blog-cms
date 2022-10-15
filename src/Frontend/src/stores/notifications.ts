import create from "zustand";

export type NotificationContent = {
  message: string;
};

interface NotificationStore {
  notifications: NotificationContent[];

  pushNotification: (notification: NotificationContent) => void;
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: new Array<NotificationContent>(),
  pushNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },
}));
