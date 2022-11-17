import { configureStore } from "@reduxjs/toolkit";
import rgbaObjSlice from "./rgbaObjSlice";

const store = configureStore({
  reducer: { rgbaObj: rgbaObjSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
