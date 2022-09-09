import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import isGeneratedSlice from "./isGeneratedSlice";
import rgbaObjSlice from "./rgbaObjSlice";

const store = configureStore({
  reducer: { isGenerated: isGeneratedSlice.reducer, rgbaObj: rgbaObjSlice.reducer },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
