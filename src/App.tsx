import Output from "./pages/Output";
import Home from "./pages/Home";
import "./App.css";
import { useState } from "react";

function App() {
  const [isGenerated, setIsGenerated] = useState(false);
  return <main className="flex justify-center h-screen min-w-[300px]">{isGenerated ? <Output setIsGenerated={setIsGenerated} /> : <Home setIsGenerated={setIsGenerated} />}</main>;
}

export default App;
