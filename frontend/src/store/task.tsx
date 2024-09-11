import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types/Task';

interface TaskState {
  tasks: Task[];
}

const loadTasksFromLocalStorage = (): Task[] => {
  const tasksJson = localStorage.getItem('tasks');
  return tasksJson ? JSON.parse(tasksJson) : [];
};

const initialState: TaskState = {
  tasks: loadTasksFromLocalStorage(),
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, updateTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;