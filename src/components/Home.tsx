import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generate } from "../store/isGeneratedSlice";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Swal from "sweetalert2";
import { rgbaObjChange } from "../store/rgbaObjSlice";

function Home() {
  const dispatch = useDispatch();

  const rgbaIdList: rgbaId[] = ["rMin", "gMin", "bMin", "aMin", "rMax", "gMax", "bMax", "aMax"];
  const MIN_VALUE = 0;
  const MAX_VALUE = 255;
  const getRgbaObj = (state: RootState) => state.rgbaObj.value;
  const rgbaObjSelector = createSelector(getRgbaObj, (rgbaObj) => rgbaObj);
  const rgbaObj = useSelector(rgbaObjSelector);
  // const isInvalidValue = (id: string, value: number) => {
  //   switch (id) {
  //     case "redMin":
  //       if (value > redMaxValue) {
  //         return true;
  //       }
  //       break;
  //     case "redMax":
  //       if (value < redMinValue) {
  //         return true;
  //       }
  //       break;
  //     case "greenMin":
  //       if (value > greenMaxValue) {
  //         return true;
  //       }
  //       break;
  //     case "greenMax":
  //       if (value < greenMinValue) {
  //         return true;
  //       }
  //       break;
  //     case "blueMin":
  //       if (value > blueMaxValue) {
  //         return true;
  //       }
  //       break;
  //     case "blueMax":
  //       if (value < blueMinValue) {
  //         return true;
  //       }
  //       break;
  //     default:
  //       return false;
  //   }
  // };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id as rgbaId;
    if (!event.target.value) {
      dispatch(rgbaObjChange({ id, input: "" }));
      return;
    }
    console.log(rgbaObj);
    const input = parseInt(event.target.value);
    if (input < MIN_VALUE) {
      dispatch(rgbaObjChange({ id, input: MIN_VALUE }));
      return;
    } else if (input > MAX_VALUE) {
      dispatch(rgbaObjChange({ id, input: MAX_VALUE }));
      return;
    } else {
      dispatch(rgbaObjChange({ id, input }));
    }
  };
  const rgbaList: rgbaList[] = [
    { name: "R", minId: "rMin", maxId: "rMax" },
    { name: "G", minId: "gMin", maxId: "gMax" },
    { name: "B", minId: "bMin", maxId: "bMax" },
    { name: "A", minId: "aMin", maxId: "aMax" },
  ];
  return (
    <section>
      <h1>랜덤 색깔 스킨 생성기</h1>
      {rgbaList.map((rgbaList, i) => {
        return (
          <div className="w-full flex justify-between" key={i}>
            <span>{rgbaList.name}</span>
            <input id={rgbaList.minId} value={`${rgbaObj[rgbaList.minId]}`} placeholder="최소값" type={"number"} min={0} max={255} onChange={onChange} className=" border w-3/4" />
            <input id={rgbaList.maxId} value={`${rgbaObj[rgbaList.maxId]}`} placeholder="최댓값" type={"number"} min={0} max={255} onChange={onChange} className=" border w-3/4" />
          </div>
        );
      })}
      <button
        onClick={() => {
          console.log(rgbaObj);
          const errorMessage = (color: "R" | "G" | "B" | "A") => `${color}의 최솟값이 ${color}의 최댓값보다 큽니다`;
          const emptyRgba = rgbaIdList.find((key) => rgbaObj[key] === "");
          if (emptyRgba) {
            Swal.fire({
              icon: "error",
              text: `${emptyRgba}의 값이 없습니다`,
            });
          } else if (rgbaObj.rMin > rgbaObj.rMax) {
            Swal.fire({
              icon: "error",
              text: errorMessage("R"),
            });
          } else if (rgbaObj.gMin > rgbaObj.gMax) {
            Swal.fire({
              icon: "error",
              text: errorMessage("G"),
            });
          } else if (rgbaObj.bMin > rgbaObj.bMax) {
            Swal.fire({
              icon: "error",
              text: errorMessage("B"),
            });
          } else if (rgbaObj.aMin > rgbaObj.aMax) {
            Swal.fire({
              icon: "error",
              text: errorMessage("A"),
            });
          } else {
            dispatch(generate(rgbaObj));
          }
        }}
        className="bg-teal-300"
      >
        생성하기
      </button>
    </section>
  );
}
export default Home;
