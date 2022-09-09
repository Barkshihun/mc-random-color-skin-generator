import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: false };
const isGeneratedSlice = createSlice({
  name: "isGenerated",
  initialState,
  reducers: {
    generate: (state) => {
      state.value = true;
    },
    undo: (state) => {
      state.value = false;
    },
  },
});

export const { generate, undo } = isGeneratedSlice.actions;
export default isGeneratedSlice;
