import { useNotifications } from "@/stores/notifications";

import { Notification } from "./Notification";

export const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <div>
      {notifications.map((notification) => (
        <Notification content={notification} />
      ))}
    </div>
  );
};
