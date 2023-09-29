import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return null;
    },
  },
});

export const setNotification = (message, seconds, type) => {
  return async (dispatch) => {
    dispatch(set({ message, type }));
    setTimeout(() => {
      dispatch(clear());
    }, seconds * 1000);
  };
};

export const { set, clear } = notificationSlice.actions;
export default notificationSlice.reducer;
