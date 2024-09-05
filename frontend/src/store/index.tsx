import { configureStore } from "@reduxjs/toolkit";

import todo from './todo';
import user from './user';
import modal from './modal';
import specialDay from "./specialDay";
import dayDetail from "./dayDetail";

const store = configureStore({
  reducer: {
    todo,
    user,
    modal,
    specialDay,
    dayDetail,
  }
})

export default store;