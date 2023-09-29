import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    replaceBlog(state, action) {
      const replaced = action.payload;
      return state.map((s) => (s.id === replaced.id ? replaced : s));
    },
    filterBlog(state, action) {
      const removed = action.payload;
      return state.filter((s) => s.id !== removed.id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };
};

export const createBlog = (object) => {
  return async (dispatch) => {
    const blog = await blogService.create(object);
    dispatch(addBlog(blog));
  };
};

export const likeBlog = (object) => {
  return async (dispatch) => {
    const blog = await blogService.like(object);
    dispatch(replaceBlog(blog));
  };
};

export const removeBlog = (object) => {
  return async (dispatch) => {
    const blog = await blogService.deleteBlog(object);
    dispatch(filterBlog(blog));
  };
};

export const addComment = (object) => {
  return async (dispatch) => {
    const blog = await blogService.comment(object);
    dispatch(replaceBlog(blog));
  };
};

export const { setBlogs, addBlog, replaceBlog, filterBlog } = blogSlice.actions;
export default blogSlice.reducer;
