import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Memory {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface MemoryState {
  memories: Memory[];
}

const initialState: MemoryState = {
  memories: loadMemoriesFromLocalStorage(),
};

const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    addMemory: (state, action: PayloadAction<Memory>) => {
      state.memories.push(action.payload);
      saveMemoriesToLocalStorage(state.memories);
    },
    removeMemory: (state, action: PayloadAction<number>) => {
      state.memories = state.memories.filter(memory => memory.id !== action.payload);
      saveMemoriesToLocalStorage(state.memories);
    },
    updateMemory: (state, action: PayloadAction<Memory>) => {
      const index = state.memories.findIndex(memory => memory.id === action.payload.id);
      if (index !== -1) {
        state.memories[index] = action.payload;
        saveMemoriesToLocalStorage(state.memories);
      }
    },
    setMemories: (state, action: PayloadAction<Memory[]>) => {
      state.memories = action.payload;
      saveMemoriesToLocalStorage(state.memories);
    },
  },
});

export const { addMemory, removeMemory, updateMemory, setMemories } = memorySlice.actions;

export const fetchAllMemories = () => (dispatch: any) => {
  const memories = loadMemoriesFromLocalStorage();
  dispatch(setMemories(memories));
};

export default memorySlice.reducer;

// Helper function to load memories from localStorage
function loadMemoriesFromLocalStorage(): Memory[] {
  const storedMemories = localStorage.getItem('memories');
  return storedMemories ? JSON.parse(storedMemories) : [];
}

// Helper function to save memories to localStorage
function saveMemoriesToLocalStorage(memories: Memory[]) {
  localStorage.setItem('memories', JSON.stringify(memories));
}