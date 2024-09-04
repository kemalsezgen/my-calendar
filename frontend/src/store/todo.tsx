import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
  completed: boolean;
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
            completed: !todo.completed
          }
        }
        return todo;
      });
    }
  }
})

export const { addTodo, removeTodo, toggleTodo } = todo.actions;
export default todo.reducer;