import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMemories } from '../api/fakeApis';

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
  memories: [],
};

const memorySlice = createSlice({
  name: "memory",
  initialState,
  reducers: {
    addMemory: (state, action: PayloadAction<Memory>) => {
      state.memories.push(action.payload);
    },
    removeMemory: (state, action: PayloadAction<number>) => {
      state.memories = state.memories.filter(
        (memory) => memory.id !== action.payload
      );
    },
    updateMemory: (state, action: PayloadAction<Memory>) => {
      const index = state.memories.findIndex(
        (memory) => memory.id === action.payload.id
      );
      if (index !== -1) {
        state.memories[index] = action.payload;
      }
    },
    setMemories: (state, action: PayloadAction<Memory[]>) => {
      state.memories = action.payload;
    },
  },
});

export const { addMemory, removeMemory, updateMemory, setMemories } = memorySlice.actions;

export const fetchMemories = (date: string) => async (dispatch: any) => {
  const memories = await getMemories(date);
  console.log("dsadasdsa", memories);
  dispatch(setMemories(memories));
};

export default memorySlice.reducer;
