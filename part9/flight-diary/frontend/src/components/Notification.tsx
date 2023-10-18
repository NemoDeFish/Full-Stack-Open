interface NotificationProps {
  message: string;
}

const Notification = (props: NotificationProps) => {
  if (!props.message) {
    return null;
  }

  return <p style={{ color: "red" }}>{props.message}</p>;
};

export default Notification;
