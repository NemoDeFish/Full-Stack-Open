import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { loginUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(loginUser(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification("welcome", 5));
    } catch (exception) {
      dispatch(setNotification("wrong username or password", 5, "error"));
    }
  };

  return (
    <div>
      <h2>Log In To Application</h2>

      <Notification />

      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="login-button"
        >
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
