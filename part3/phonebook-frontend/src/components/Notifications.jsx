const Notification = ({ notification }) => {
    let notificationStyle = {color: "green"}
  
    if (notification === "null") {
      return null
    }
    else if (/Information/.test(notification) || /Person/.test(notification)) {
      notificationStyle = {color: "red"}
    }
  
    return (
      <div className="notification" style={notificationStyle}>
        {notification}
      </div>
    )
}
export default Notification