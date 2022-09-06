import { useState } from "react";

function Home() {
  interface rgbaList {
    name: String;
    minSetter: React.Dispatch<React.SetStateAction<string | number>>;
    maxSetter: React.Dispatch<React.SetStateAction<string | number>>;
    minValue: string | number;
    maxValue: string | number;
    minId: string;
    maxId: string;
  }
  const MIN_VALUE = 0;
  const MAX_VALUE = 255;
  const [redMinValue, setRedMinValue] = useState<string | number>("");
  const [redMaxValue, setRedMaxValue] = useState<string | number>("");
  const [greenMinValue, setGreenMinValue] = useState<string | number>("");
  const [greenMaxValue, setGreenMaxValue] = useState<string | number>("");
  const [blueMinValue, setBlueMinValue] = useState<string | number>("");
  const [blueMaxValue, setBlueMaxValue] = useState<string | number>("");
  const [alphaMinValue, setAlphaMinValue] = useState<string | number>("");
  const [alphaMaxValue, setAlphaMaxValue] = useState<string | number>("");
  const isInvalidValue = (id: string, value: number) => {
    switch (id) {
      case "redMin":
        if (value > redMaxValue) {
          return true;
        }
        break;
      case "redMax":
        if (value < redMinValue) {
          return true;
        }
        break;
      case "greenMin":
        if (value > greenMaxValue) {
          return true;
        }
        break;
      case "greenMax":
        if (value < greenMinValue) {
          return true;
        }
        break;
      case "blueMin":
        if (value > blueMaxValue) {
          return true;
        }
        break;
      case "blueMax":
        if (value < blueMinValue) {
          return true;
        }
        break;
      default:
        return false;
    }
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.dataset);
    let setter;
    switch (event.target.id) {
      case "redMin":
        setter = setRedMinValue;
        break;
      case "redMax":
        setter = setRedMaxValue;
        break;
      case "greenMin":
        setter = setGreenMinValue;
        break;
      case "greenMax":
        setter = setGreenMaxValue;
        break;
      case "blueMin":
        setter = setBlueMinValue;
        break;
      case "blueMax":
        setter = setBlueMaxValue;
        break;
      case "alphaMin":
        setter = setAlphaMinValue;
        break;
      case "alphaMax":
        setter = setAlphaMaxValue;
        break;

      default:
        setter = () => {};
        break;
    }

    if (!event.target.value) {
      setter("");
      return;
    }
    if (event.target.value === "00") {
      setter("0");
      return;
    }
    const value = parseInt(event.target.value);
    if (value < MIN_VALUE) {
      setter(MIN_VALUE);
    } else if (value > MAX_VALUE) {
      return;
    } else {
      setter(value);
    }
  };
  const rgbaList: rgbaList[] = [
    { name: "R", minSetter: setRedMinValue, maxSetter: setRedMaxValue, minValue: redMinValue, maxValue: redMaxValue, minId: "redMin", maxId: "redMax" },
    { name: "G", minSetter: setGreenMinValue, maxSetter: setGreenMaxValue, minValue: greenMinValue, maxValue: greenMaxValue, minId: "greenMin", maxId: "greenMax" },
    { name: "B", minSetter: setBlueMinValue, maxSetter: setBlueMaxValue, minValue: blueMinValue, maxValue: blueMaxValue, minId: "blueMin", maxId: "blueMax" },
    { name: "A", minSetter: setAlphaMinValue, maxSetter: setAlphaMaxValue, minValue: alphaMinValue, maxValue: alphaMaxValue, minId: "alphaMin", maxId: "alphaMax" },
  ];
  return (
    <section>
      <h1>랜덤 색깔 스킨 생성기</h1>
      {rgbaList.map((rgbaList, i) => {
        return (
          <div className="w-full flex justify-between" key={i}>
            <span>{rgbaList.name}</span>
            <input id={rgbaList.minId} value={rgbaList.minValue} placeholder="최소값" type={"number"} min={0} max={255} onChange={onChange} className=" border w-3/4" />
            <input
              data-min-value={rgbaList.minValue}
              data-max-value={rgbaList.maxValue}
              id={rgbaList.maxId}
              value={rgbaList.maxValue}
              placeholder="최댓값"
              type={"number"}
              min={0}
              max={255}
              onChange={onChange}
              className=" border w-3/4"
            />
          </div>
        );
      })}
    </section>
  );
}
export default Home;
