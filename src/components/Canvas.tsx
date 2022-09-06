import { useEffect, useRef, useState } from "react";

function Canvas() {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const MIN_RGB_VALUE = 0;
  const MAX_RGB_VALUE = 255;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const imageData = context.createImageData(64, 64);
        for (let i = 0; i < imageData.data.length; i += 4) {
          console.log(Math.floor(Math.random() * (MAX_RGB_VALUE - MIN_RGB_VALUE + 1)) + MIN_RGB_VALUE);
          imageData.data[i] = Math.floor(Math.random() * (MAX_RGB_VALUE - MIN_RGB_VALUE + 1)) + MIN_RGB_VALUE;
          imageData.data[i + 1] = Math.floor(Math.random() * (MAX_RGB_VALUE - MIN_RGB_VALUE + 1)) + MIN_RGB_VALUE;
          imageData.data[i + 2] = Math.floor(Math.random() * (MAX_RGB_VALUE - MIN_RGB_VALUE + 1)) + MIN_RGB_VALUE;
          imageData.data[i + 3] = 255;
        }
        context.putImageData(imageData, 0, 0);
        setCtx(context);
      }
    }
  }, []);
  return <canvas ref={canvasRef} width={64} height={64}></canvas>;
}
export default Canvas;
