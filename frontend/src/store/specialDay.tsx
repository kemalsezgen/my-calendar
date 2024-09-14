import { createSlice } from "@reduxjs/toolkit";

export interface SpecialDay {
  id: number;
  date: string;
  title: string;
}

interface SpecialDayState {
  specialDays: SpecialDay[];
}

const initialState: SpecialDayState = {
  specialDays: [],
};

const specialDay = createSlice({
  name: "specialDay",
  initialState,
  reducers: {
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

export const { addSpecialDay, removeSpecialDay } = specialDay.actions;
export default specialDay.reducer;