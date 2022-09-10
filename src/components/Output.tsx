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
    START_COL_DATA: 0,
    END_COL_DATA: 64,
    START_ROW: 0,
    END_ROW: 16,
    ROW_DATA: 256,
    ONE_BOX_COL_DATA: 32,
  };
  useEffect(() => {
    const context = canvasRef?.current?.getContext("2d");
    if (context) {
      const imageData = context.createImageData(64, 64);
      const fillPixel = (pixelData: number, isWear = false) => {
        // imageData.data[pixelData] = Math.floor(Math.random() * (rgbaObj.red.max - rgbaObj.red.min + 1)) + rgbaObj.red.min;
        // imageData.data[pixelData + 1] = Math.floor(Math.random() * (rgbaObj.green.max - rgbaObj.green.min + 1)) + rgbaObj.green.min;
        // imageData.data[pixelData + 2] = Math.floor(Math.random() * (rgbaObj.blue.max - rgbaObj.blue.min + 1)) + rgbaObj.blue.min;
        // imageData.data[pixelData + 3] = 255;
        imageData.data[pixelData] = 255;
        imageData.data[pixelData + 1] = 0;
        imageData.data[pixelData + 2] = 0;
        imageData.data[pixelData + 3] = isWear ? 100 : 255;
      };
      const fillHead = () => {
        for (let row = HEAD.START_ROW; row < HEAD.END_ROW; row++) {
          for (let col = HEAD.START_COL_DATA; col < HEAD.END_COL_DATA; col += 4) {
            if (col === 0 && row < 8) {
              col += 28;
              continue;
            }
            if (row >= 8) {
              fillPixel(col + row * HEAD.ROW_DATA);
              fillPixel(col + HEAD.ONE_BOX_COL_DATA * 2 + row * HEAD.ROW_DATA);
              fillPixel(col + HEAD.ONE_BOX_COL_DATA * 4 + row * HEAD.ROW_DATA, true); // Wear
              fillPixel(col + HEAD.ONE_BOX_COL_DATA * 6 + row * HEAD.ROW_DATA, true); // Wear
              continue;
            }
            fillPixel(col + row * HEAD.ROW_DATA);
            fillPixel(col + HEAD.ONE_BOX_COL_DATA + row * HEAD.ROW_DATA);
            fillPixel(col + HEAD.ONE_BOX_COL_DATA * 4 + row * HEAD.ROW_DATA, true); // Wear
            fillPixel(col + HEAD.ONE_BOX_COL_DATA * 5 + row * HEAD.ROW_DATA, true); // Wear
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
        className="bg-red-300 mb-2"
      >
        돌아가기
      </button>
      <canvas className=" bg-slate-500" ref={canvasRef} width={64} height={64}></canvas>
    </>
  );
}
export default Output;
