import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { undo } from "../store/isGeneratedSlice";
import { RootState } from "../store";
import { SkinViewer } from "skinview3d";
import Swal from "sweetalert2";

function RenderedSkin() {
  const dispatch = useDispatch();
  const skinPngCanvasRef = useRef<HTMLCanvasElement>(null);
  const skinCanvasRef = useRef<HTMLCanvasElement>(null);
  const skinPngCanvas = skinPngCanvasRef.current as HTMLCanvasElement;
  const onDownload = () => {
    Swal.fire({
      title: "파일을 다운로드하시겠습니까?",
      text: "파일명",
      input: "text",
      inputValue: "랜덤 색깔 스킨",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataURL = skinPngCanvas.toDataURL();
        const aTag = document.createElement("a");
        aTag.download = result.value ? `${result.value}.png` : "랜덤 색깔 스킨.png";
        aTag.href = dataURL;
        aTag.click();
      }
    });
  };

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
      <button onClick={onDownload} className="bg-blue-300 mb-2">
        다운로드
      </button>
      <canvas className=" bg-slate-500 w-32 h-32" ref={skinPngCanvasRef} width={64} height={64}></canvas>
      <canvas className=" bg-green-500" ref={skinCanvasRef} width={300} height={400}></canvas>
    </>
  );
}
export default RenderedSkin;
