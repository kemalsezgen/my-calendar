import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types/Task';
import { Subtask } from '@/types/Subtask';

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
    addSubtask: (state, action: PayloadAction<{ taskId: number; subtask: Subtask }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.subtasks.push(action.payload.subtask);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateSubtask: (state, action: PayloadAction<{ taskId: number; subtask: Subtask }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        const subtaskIndex = task.subtasks.findIndex(s => s.id === action.payload.subtask.id);
        if (subtaskIndex !== -1) {
          task.subtasks[subtaskIndex] = action.payload.subtask;
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      }
    },
    removeSubtask: (state, action: PayloadAction<{ taskId: number; subtaskId: number }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.subtasks = task.subtasks.filter(s => s.id !== action.payload.subtaskId);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, updateTask, removeTask, addSubtask, updateSubtask, removeSubtask } = taskSlice.actions;
export default taskSlice.reducer;