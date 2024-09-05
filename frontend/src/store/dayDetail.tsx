import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "./todo";
import { SpecialDay } from "./specialDay";

interface DayDetailState {
  date: string;
  todos: Todo[];
  specialDays: SpecialDay[];
}

const initialState: DayDetailState = {
  date: new Date().toISOString(), // Store date as ISO string
  todos: [],
  specialDays: [],
};

const dayDetail = createSlice({
  name: "dayDetail",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload; // Expecting ISO string
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    addSpecialDay: (state, action) => {
      state.specialDays.push(action.payload);
    },
    removeSpecialDay: (state, action) => {
      state.specialDays = state.specialDays.filter(
        (day) => day.id !== action.payload
      );
    },
  },
});

export const { setDate, addTodo, removeTodo, addSpecialDay, removeSpecialDay } = dayDetail.actions;
export default dayDetail.reducer;