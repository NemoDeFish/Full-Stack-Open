import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import { Container, AppBar, Toolbar, Button } from "@mui/material";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Users from "./components/Users";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import Blogs from "./components/Blogs";

import blogService from "./services/blogs";
import userService from "./services/users";

import { setNotification } from "./reducers/notificationReducer";
import { loginUser, logoutUser } from "./reducers/userReducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
  addComment,
} from "./reducers/blogReducer";

const App = () => {
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogs());
    userService.getUsers().then((response) => setUsers(response));
  }, [update]);

  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loginUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      await dispatch(createBlog(blogObject));
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5,
        ),
      );
      setUpdate(!update);
    } catch (exception) {
      dispatch(setNotification("a new blog not added", 5, "error"));
    }
  };

  const increaseLikes = async (blogObject) => {
    try {
      await dispatch(likeBlog(blogObject));
      setUpdate(!update);
      dispatch(
        setNotification(
          `A like for the blog '${blogObject.title}' by '${blogObject.author}'`,
          5,
        ),
      );
    } catch (exception) {
      dispatch(setNotification("blog not liked", 5, "error"));
    }
  };

  const deleteBlog = async (blogObject) => {
    try {
      await dispatch(removeBlog(blogObject));
      dispatch(
        setNotification(
          `The blog '${blogObject.title}' by ${blogObject.author} removed`,
          5,
        ),
      );
      setUpdate(!update);
    } catch (exception) {
      dispatch(
        setNotification(
          `blog not deleted because blog post was added by ${blogObject.user.name}`,
          5,
          "error",
        ),
      );
    }
  };

  const commentBlog = async (blogObject) => {
    try {
      await dispatch(addComment(blogObject));
      dispatch(setNotification(`Comment added`, 5));
      setUpdate(!update);
    } catch (exception) {
      dispatch(setNotification(`Comment not added`, 5, "error"));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(logoutUser());
    dispatch(setNotification("logged out", 5));
    navigate("/");
  };

  const matchUser = useMatch("/users/:id");
  const individualUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const navMenu = () => (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user && (
            <div>
              {user.name} logged in{" "}
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleLogout()}
                size="small"
              >
                logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {user && (
        <div>
          <h2>Blogs</h2>
          <Notification />
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Blogs addBlog={addBlog} blogFormRef={blogFormRef} />
            ) : (
              <LoginForm />
            )
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/users/:id"
          element={<User individualUser={individualUser} />}
        />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              increaseLikes={increaseLikes}
              deleteBlog={deleteBlog}
              user={user}
              commentBlog={commentBlog}
            />
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
