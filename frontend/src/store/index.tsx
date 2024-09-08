import { configureStore } from "@reduxjs/toolkit";

import todo from './todo';
import user from './user';
import specialDay from "./specialDay";
import dayDetail from "./dayDetail";
import memory from "./memory";

const store = configureStore({
  reducer: {
    todo,
    user,
    specialDay,
    dayDetail,
    memory,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;