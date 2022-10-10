import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generate } from "../store/isGeneratedSlice";
import { createSelector } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { rgbaObjChange } from "../store/rgbaObjSlice";
import { RootState } from "../store";

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
  return (
    <section>
      <h1>랜덤 색깔 스킨 생성기</h1>
      {rgbaList.map((rgbaList, i) => {
        return (
          <div className="w-full flex justify-between" key={i}>
            <span>{rgbaList.displayName}</span>
            <input
              data-color={rgbaList.color}
              data-limit={"min"}
              id={`${rgbaList.color}Min`}
              value={`${rgbaObj[rgbaList.color]["min"]}`}
              placeholder="최소값"
              type={"number"}
              min={0}
              max={255}
              onChange={onInputChange}
              className=" border w-3/4"
            />
            <input
              data-color={rgbaList.color}
              data-limit={"max"}
              id={`${rgbaList.color}Max`}
              value={`${rgbaObj[rgbaList.color]["max"]}`}
              placeholder="최댓값"
              type={"number"}
              min={0}
              max={255}
              onChange={onInputChange}
              className=" border w-3/4"
            />
          </div>
        );
      })}
      <button onClick={onGenerate} className="bg-teal-300">
        생성하기
      </button>
    </section>
  );
}
export default Home;
