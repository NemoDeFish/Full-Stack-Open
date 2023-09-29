import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const info = useNotificationValue();

  if (!info) {
    return;
  }

  const style = {
    color: info.error === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{info.message}</div>;
};

export default Notification;
