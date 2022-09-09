import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    red: {
      min: 0,
      max: 0,
    },
    green: {
      min: 0,
      max: 0,
    },
    blue: {
      min: 0,
      max: 0,
    },
    alpha: {
      min: 0,
      max: 0,
    },
  } as RgbaObj,
};
const rgbaObjSlice = createSlice({
  name: "rgbaObj",
  initialState,
  reducers: {
    rgbaObjChange: (state, action: { payload: { color: Rgba; limit: "min" | "max"; input: "" | number } }) => {
      const color = action.payload.color;
      const limit = action.payload.limit;
      const input = action.payload.input;
      state.value[color][limit] = input;
    },
  },
});

export const { rgbaObjChange } = rgbaObjSlice.actions;
export default rgbaObjSlice;
