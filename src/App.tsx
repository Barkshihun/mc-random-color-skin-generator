import { useState } from "react";
import Output from "./pages/Output";
import Home from "./pages/Home";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import "./App.css";

function App() {
  const getIsGenerated = (state: RootState) => state.isGenerated.value;
  const isGeneratedSelector = createSelector(getIsGenerated, (isGenerated) => isGenerated);
  return <main className="">{!useSelector(isGeneratedSelector) ? <Home /> : <Output />}</main>;
}

export default App;
