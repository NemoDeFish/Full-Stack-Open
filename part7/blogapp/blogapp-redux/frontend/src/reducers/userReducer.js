import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return null;
    },
  },
});

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch(login(user));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
