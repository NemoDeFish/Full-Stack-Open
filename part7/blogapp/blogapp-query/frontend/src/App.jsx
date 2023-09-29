import { useEffect, useRef, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "./NotificationContext";
import { getAll, create, update, removeBlog } from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";
import UserContext from "./UserContext";

import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [user, dispatch] = useContext(UserContext);

  const notifyWith = useNotify();

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    dispatch({ type: "LOGIN", payload: user });
  }, []);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation(create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });

  const updateBlogMutation = useMutation(update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
    },
  });

  const deleteBlogMutation = useMutation(removeBlog, {
    onSuccess: (removedBlog) => {
      console.log(removedBlog);
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== removedBlog.id),
      );
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch({ type: "LOGIN", payload: user });
      storageService.saveUser(user);
      notifyWith("welcome!");
    } catch (e) {
      notifyWith("wrong username or password", "error");
    }
  };

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    storageService.removeUser();
    notifyWith("logged out");
  };

  const createBlog = (newBlog) => {
    newBlogMutation.mutate(newBlog);
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    blogFormRef.current.toggleVisibility();
  };

  const like = (blog) => {
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
  };

  const remove = (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    );
    if (ok) {
      deleteBlogMutation.mutate(blog.id);
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
