import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generate } from "../store/isGeneratedSlice";
import { createSelector } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { rgbaObjChange } from "../store/rgbaObjSlice";
import { RootState } from "../store";
import RgbaForm from "../components/RgbaForm";

function Home() {
  const dispatch = useDispatch();
  const MIN_VALUE = 0;
  const MAX_VALUE = 255;
  const getRgbaObj = (state: RootState) => state.rgbaObj.value;
  const rgbaObjSelector = createSelector(getRgbaObj, (rgbaObj) => rgbaObj);
  const rgbaObj = useSelector(rgbaObjSelector);
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { color, limit } = event.target.dataset as { color: Rgba; limit: "min" | "max" };
    if (!event.target.value) {
      dispatch(rgbaObjChange({ color, limit, input: "" }));
      return;
    }
    const input = parseInt(event.target.value);
    if (input < MIN_VALUE) {
      dispatch(rgbaObjChange({ color, limit, input: MIN_VALUE }));
      return;
    } else if (input > MAX_VALUE) {
      dispatch(rgbaObjChange({ color, limit, input: MAX_VALUE }));
      return;
    } else {
      dispatch(rgbaObjChange({ color, limit, input }));
    }
  };
  const rgbaList: RgbaList = [
    { displayName: "R", color: "red" },
    { displayName: "G", color: "green" },
    { displayName: "B", color: "blue" },
    { displayName: "A", color: "alpha" },
  ];
  const makeErrMsgArray = () => {
    const rgbaObjKeyList = ["red", "green", "blue", "alpha"] as Rgba[];
    let errMsgArray: JSX.Element[] = [];
    rgbaObjKeyList.forEach((key) => {
      const min = rgbaObj[key].min;
      const max = rgbaObj[key].max;
      const color = key.replace(key[0], key[0].toUpperCase());
      const cssColor = color === "Alpha" ? "gray" : color;
      if (min === "") {
        errMsgArray.push(
          <p key={`${color}minErr`}>
            <span style={{ color: cssColor }}>{color}</span>의 최솟값이 없습니다.
          </p>
        );
      }
      if (max === "") {
        errMsgArray.push(
          <p key={`${color}maxErr`}>
            <span style={{ color: cssColor }}>{color}</span>의 최댓값이 없습니다.
          </p>
        );
      }
      if (min > max) {
        errMsgArray.push(
          <p key={`${color}minBigthanMaxErr`}>
            <span style={{ color: cssColor }}>{color}</span>의 최솟값이 <span style={{ color: cssColor }}>{color}</span>의 최댓값보다 큽니다.
          </p>
        );
      }
    });
    return errMsgArray;
  };
  const MySwal = withReactContent(Swal);
  const onGenerate = () => {
    const errMsgArray = makeErrMsgArray();
    if (errMsgArray.length !== 0) {
      MySwal.fire({
        icon: "error",
        html: <>{errMsgArray}</>,
      });
    } else {
      dispatch(generate(rgbaObj));
    }
  };
  const onRandomClick = () => {
    let color: Rgba;
    for (color in rgbaObj) {
      const random1 = Math.floor(Math.random() * 254);
      const random2 = Math.floor(Math.random() * 254);
      if (random1 > random2) {
        dispatch(rgbaObjChange({ color, limit: "min", input: random2 }));
        dispatch(rgbaObjChange({ color, limit: "max", input: random1 }));
      } else {
        dispatch(rgbaObjChange({ color, limit: "min", input: random1 }));
        dispatch(rgbaObjChange({ color, limit: "max", input: random2 }));
      }
    }
  };
  return (
    <section className="flex-col justify-center w-[640px]">
      <header className=" font-title text-5xl">
        <h1>랜덤 색깔 스킨 생성기</h1>
      </header>
      <section>
        {rgbaList.map((rgbaInfo, i) => (
          <RgbaForm key={i} rgbaInfo={rgbaInfo} onInputChange={onInputChange} rgbaObj={rgbaObj} />
        ))}
        <div>
          <button onClick={onRandomClick} className="bg-blue-300">
            범위 랜덤 설정
          </button>
          <button onClick={onGenerate} className="bg-teal-300">
            생성하기
          </button>
        </div>
      </section>
    </section>
  );
}
export default Home;
