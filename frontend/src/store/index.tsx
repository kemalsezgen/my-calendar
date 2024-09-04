import { configureStore } from "@reduxjs/toolkit";

import todo from './todo';
import user from './user';
import modal from './modal';

const store = configureStore({
  reducer: {
    todo,
    user,
    modal
  }
})

export default store;