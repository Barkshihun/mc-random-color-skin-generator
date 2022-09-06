import { useState } from "react";
import Output from "./components/Output";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [isGenerated, setIsGenerated] = useState(false);
  const onTransBtnClick = () => {
    setIsGenerated((prevIsGenerated) => !prevIsGenerated);
  };
  return (
    <main className="flex justify-center items-center h-screen flex-col">
      {isGenerated ? (
        <button onClick={onTransBtnClick} className="bg-red-300">
          돌아가기
        </button>
      ) : null}
      {!isGenerated ? <Home /> : <Output />}
      {!isGenerated ? (
        <button onClick={onTransBtnClick} className="bg-teal-300">
          생성하기
        </button>
      ) : null}
    </main>
  );
}

export default App;
