import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  return (
    <div className="notif">
      {notification && (
        <Alert severity={notification.type}>{notification.message}</Alert>
      )}
    </div>
  );
};

export default Notification;
