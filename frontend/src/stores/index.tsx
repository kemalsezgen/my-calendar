import { configureStore } from "@reduxjs/toolkit";

import todo from './todo';
import user from './user';

const store = configureStore({
  reducer: {
    todo,
    user
  }
})

export default store;