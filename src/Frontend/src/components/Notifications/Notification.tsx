import { Alert } from "react-bootstrap";

import { NotificationContent } from "@/stores/notifications";

type NotificationProps = {
  content: NotificationContent;
};

export const Notification = (props: NotificationProps) => {
  return <Alert variant="danger">{props.content.message}</Alert>;
};
