import { createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
  completed: "Not Started" | "In Progress" | "Completed";
  startDate: string;
  endDate: string;
}

interface Subtask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const initialState = {
  todos: [] as Todo[]
};

const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: todo.completed === "Not Started" ? "In Progress" : "Completed"
          }
        }
        return todo;
      });
    }
  }
})

export const { addTodo, removeTodo, toggleTodo } = todo.actions;
export default todo.reducer;