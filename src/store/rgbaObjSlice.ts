import { createSlice } from "@reduxjs/toolkit";
const initialState = { value: { rMin: 0, rMax: 255, gMin: 0, gMax: 255, bMin: 0, bMax: 255, aMin: 0, aMax: 255 } as rgbaObjState };
const rgbaObjSlice = createSlice({
  name: "rgbaObj",
  initialState,
  reducers: {
    rgbaObjChange: (state, action: { payload: { id: rgbaId; input: "" | number } }) => {
      const id = action.payload.id;
      const input = action.payload.input;
      state.value[id] = input;
    },
  },
});

export const { rgbaObjChange } = rgbaObjSlice.actions;
export default rgbaObjSlice;
