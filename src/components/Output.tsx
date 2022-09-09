import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { undo } from "../store/isGeneratedSlice";
import { RootState } from "../store";

function Output() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const MIN_RGB_VALUE = 0;
  const MAX_RGB_VALUE = 255;
  const getRgbaObj = (state: RootState) => state.rgbaObj.value;
  const rgbaObjSelector = createSelector(getRgbaObj, (rgbaObj) => rgbaObj);
  const rgbaObj = useSelector(rgbaObjSelector) as RgbaObj<number>;
  const HEAD = {
    START_COL: 0,
    END_COL: 16,
    START_ROW: 0,
    END_ROW: 16,
  };
  useEffect(() => {
    const context = canvasRef?.current?.getContext("2d");
    if (context) {
      const imageData = context.createImageData(64, 64);
      const fillRange = (col: number) => {
        imageData.data[col] = Math.floor(Math.random() * (rgbaObj.red.max - rgbaObj.red.min + 1)) + rgbaObj.red.min;
        imageData.data[col + 1] = Math.floor(Math.random() * (rgbaObj.green.max - rgbaObj.green.min + 1)) + rgbaObj.green.min;
        imageData.data[col + 2] = Math.floor(Math.random() * (rgbaObj.blue.max - rgbaObj.blue.min + 1)) + rgbaObj.blue.min;
        imageData.data[col + 3] = 255;
      };
      const fillHead = () => {
        for (let row = HEAD.START_ROW; row < HEAD.END_ROW; row++) {
          for (let col = HEAD.START_COL; col < HEAD.END_COL; col += 4) {
            if (col === 0 && row < 8) {
              col += 28;
              continue;
            }
            fillRange(col);
            fillRange(col + 8);
          }
        }
      };
      fillHead();
      context.putImageData(imageData, 0, 0);
    }
  }, []);
  return (
    <>
      <button
        onClick={() => {
          dispatch(undo());
        }}
        className="bg-red-300"
      >
        돌아가기
      </button>
      <canvas className="" ref={canvasRef} width={64} height={64}></canvas>
    </>
  );
}
export default Output;
