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
  return (
    <main className="flex justify-center h-screen ">
      <div className="mt-20 flex-col justify-center w-[640px] px-8">{!useSelector(isGeneratedSelector) ? <Home /> : <Output />}</div>
    </main>
  );
}

export default App;
