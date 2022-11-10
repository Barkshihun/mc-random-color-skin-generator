import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { undo } from "../store/isGeneratedSlice";
import { SkinViewer } from "skinview3d";
import Swal from "sweetalert2";

function RenderedSkin({ imageData }: { imageData: ImageData }) {
  const dispatch = useDispatch();
  const skinPngCanvasRef = useRef<HTMLCanvasElement>(null);
  const skinCanvasRef = useRef<HTMLCanvasElement>(null);
  let skinPngCanvas: HTMLCanvasElement;
  let skinCanvas: HTMLCanvasElement;
  useEffect(() => {
    skinPngCanvas = skinPngCanvasRef.current as HTMLCanvasElement;
    skinCanvas = skinCanvasRef.current as HTMLCanvasElement;
    const skinPngCanvasCtx = skinPngCanvas.getContext("2d") as CanvasRenderingContext2D;
    skinPngCanvasCtx.putImageData(imageData, 0, 0);
    new SkinViewer({
      canvas: skinCanvas,
      width: 200,
      height: 200,
      skin: skinPngCanvas,
    });
  }, []);

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
    <section className="mt-14">
      <div className="flex flex-col h-[70%] justify-evenly items-center">
        <canvas className="shadow-2xl" ref={skinCanvasRef}></canvas>
        <canvas className="shadow-2xl w-40 h-40" ref={skinPngCanvasRef} width={64} height={64}></canvas>
      </div>
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
    </section>
  );
}
export default RenderedSkin;
