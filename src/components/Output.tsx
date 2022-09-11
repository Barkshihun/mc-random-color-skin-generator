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
  const ROW_DATA = 256;
  const HEAD = {
    START_COL_DATA: 0,
    END_COL_DATA: 128,
    END_ROW: 16,
    ONE_BOX_COL_DATA: 32,
  };
  const LIMB = {
    ONE_BOX_COL_DATA: 16,
    ROW_SIZE: 16,
    WIDTH_DATA: 64,
  };
  const BODY = {
    START_COL_DATA: 64,
    END_COL_DATA: 158,
    START_ROW: 16,
    END_ROW: 32,
    ONE_BOX_COL_DATA: 16,
    ROW_SIZE: 16,
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
        imageData.data[pixelData] = 0;
        imageData.data[pixelData + 1] = 0;
        imageData.data[pixelData + 2] = 255;
        imageData.data[pixelData + 3] = isWear ? 50 : 255;
      };
      const fillHead = () => {
        for (let row = 0; row < HEAD.END_ROW; row++) {
          for (let col = HEAD.START_COL_DATA; col < HEAD.END_COL_DATA; col += 4) {
            if (col === 0 && row < 8) {
              col += 28;
              continue;
            }
            if (col === 96 && row < 8) {
              break;
            }
            fillPixel(col + row * ROW_DATA);
            fillPixel(col + HEAD.ONE_BOX_COL_DATA * 4 + row * ROW_DATA, true); // Wear
          }
        }
      };
      const fillRight = (direction: "leg" | "arm") => {
        const START_COL_DATA = direction === "leg" ? 0 : 160;
        const END_COL_DATA = START_COL_DATA + 64;
        const START_ROW = 16;
        const END_ROW = START_ROW + LIMB.ROW_SIZE;
        for (let row = START_ROW; row < END_ROW; row++) {
          for (let col = START_COL_DATA; col < END_COL_DATA; col += 4) {
            if (col === START_COL_DATA && row < START_ROW + 4) {
              col += 12;
              continue;
            }
            if (col === START_COL_DATA + 48 && row < START_ROW + 4) {
              break;
            }
            fillPixel(col + row * ROW_DATA);
            fillPixel(col + (row + LIMB.ROW_SIZE) * ROW_DATA, true); // Wear
          }
        }
      };
      const fillLeft = (direction: "leg" | "arm") => {
        const START_COL_DATA = direction === "leg" ? 0 : 128;
        const END_COL_DATA = START_COL_DATA + 64;
        const START_ROW = 48;
        const END_ROW = START_ROW + LIMB.ROW_SIZE;
        for (let row = START_ROW; row < END_ROW; row++) {
          for (let col = START_COL_DATA; col < END_COL_DATA; col += 4) {
            if (col === START_COL_DATA && row < START_ROW + 4) {
              col += 12;
              continue;
            }
            if (col === START_COL_DATA + 48 && row < START_ROW + 4) {
              break;
            }
            if (direction === "leg") {
              fillPixel(col + row * ROW_DATA, true); // Wear
              fillPixel(col + row * ROW_DATA + LIMB.WIDTH_DATA);
            } else {
              fillPixel(col + row * ROW_DATA);
              fillPixel(col + row * ROW_DATA + LIMB.WIDTH_DATA, true); // Wear
            }
          }
        }
      };
      const fillBody = () => {
        for (let row = 16; row < BODY.END_ROW; row++) {
          for (let col = BODY.START_COL_DATA; col < BODY.END_COL_DATA; col += 4) {
            if (col === BODY.START_COL_DATA && row < 20) {
              col += 12;
              continue;
            }
            if (col === BODY.START_COL_DATA + 80 && row < 20) {
              break;
            }
            fillPixel(col + row * ROW_DATA);
            fillPixel(col + (row + BODY.ROW_SIZE) * ROW_DATA, true); // Wear
          }
        }
      };
      fillHead();
      fillRight("leg");
      fillRight("arm");
      fillBody();
      fillLeft("leg");
      fillLeft("arm");
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
