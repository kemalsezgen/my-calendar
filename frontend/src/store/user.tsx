import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const initialState = {
  user: {} as User
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.user = {} as User;
      localStorage.removeItem('user');
    }
  }
})

export const { setUser, removeUser } = user.actions;
export default user.reducer;