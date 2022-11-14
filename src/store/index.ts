import { configureStore } from "@reduxjs/toolkit";
import isGeneratedSlice from "./isGeneratedSlice";
import rgbaObjSlice from "./rgbaObjSlice";

const store = configureStore({
  reducer: { isGenerated: isGeneratedSlice.reducer, rgbaObj: rgbaObjSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
