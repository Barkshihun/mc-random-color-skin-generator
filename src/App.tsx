import { useState } from "react";
import Output from "./components/Output";
import Home from "./components/Home";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const getIsGenerated = (state: RootState) => state.isGenerated.value;
  const isGeneratedSelector = createSelector(getIsGenerated, (isGenerated) => isGenerated);
  return <main className="flex justify-center items-center h-screen flex-col">{!useSelector(isGeneratedSelector) ? <Home /> : <Output />}</main>;
}

export default App;
