import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import DownloadModal from "./DownloadModal";

function RenderedSkin({ imageData, noOverlayImageData, setIsGenerated }: { imageData: ImageData; noOverlayImageData: ImageData; setIsGenerated: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [open, setOpen] = useState(false);
  const [isOverlay, setOverlay] = useState(true);
  const skinPngCanvasRef = useRef<HTMLCanvasElement>(null);
  const skinCanvasRef = useRef<HTMLCanvasElement>(null);
  let skinPngCanvas: HTMLCanvasElement;
  let skinCanvas: HTMLCanvasElement;
  useEffect(() => {
    const init = async () => {
      skinPngCanvas = skinPngCanvasRef.current as HTMLCanvasElement;
      skinCanvas = skinCanvasRef.current as HTMLCanvasElement;
      const { SkinViewer } = await import("skinview3d");
      const skinPngCanvasCtx = skinPngCanvas.getContext("2d") as CanvasRenderingContext2D;
      if (isOverlay) {
        skinPngCanvasCtx.putImageData(imageData, 0, 0);
      } else {
        skinPngCanvasCtx.putImageData(noOverlayImageData, 0, 0);
      }
      new SkinViewer({
        canvas: skinCanvas,
        skin: skinPngCanvas,
        width: 200,
        height: 200,
      });
    };
    init();
  }, [isOverlay]);
  const onLayoutBtnClick = () => {
    setOverlay((prevState) => !prevState);
  };
  return (
    <section className="sm:mt-8 mt-10 h-full flex sm:flex-row flex-col md:items-center sm:justify-between transition-all">
      <DownloadModal open={open} setOpen={setOpen} skinPngCanvas={skinPngCanvasRef.current as HTMLCanvasElement} />
      <div className="sm:mr-10 mr-0 flex flex-col h-fit sm:h-[60%] items-center">
        <canvas ref={skinCanvasRef} className="shadow-2xl bg-white rounded-md animate-init-canvas-load" width={200} height={200}></canvas>
        <button className="sm:mt-7 my-4 rounded-full w-[40px] h-[40px] flex items-center justify-center pb-0 sm:pb-7">
          <FontAwesomeIcon
            className="h-[30px] drop-shadow transition hover:scale-105 hover:brightness-150"
            icon={faShirt}
            onClick={onLayoutBtnClick}
            style={{ color: isOverlay ? "#ff5c5c" : "#707070" }}
          />
        </button>
      </div>
      <div className="sm:ml-10 ml-0 flex flex-col h-[60%] items-center">
        <canvas ref={skinPngCanvasRef} className="shadow-2xl w-40 h-40 sm:w-44 sm:h-44 bg-white rounded-md p-3 animate-init-canvas-load" width={64} height={64}></canvas>
        <div className="flex justify-evenly w-[200px] mt-9 sm:mt-6">
          <button
            onClick={() => {
              setIsGenerated(false);
            }}
            className="bg-blue-300 mb-2 w-4/12 flex justify-center items-center rounded-full py-[2px] transition-blue-btn"
          >
            <ArrowUturnLeftIcon className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="bg-teal-300 mb-2 w-5/12 rounded-full py-[2px] transition-teal-btn"
          >
            다운로드
          </button>
        </div>
      </div>
    </section>
  );
}
export default RenderedSkin;
