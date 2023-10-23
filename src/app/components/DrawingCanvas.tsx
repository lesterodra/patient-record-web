import { useEffect, useRef, useState } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isMarker, setIsMarker] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) {
      return;
    }

    canvas.width = 700;
    canvas.height = 500;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 4;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }: { nativeEvent: any }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!contextRef.current) {
      return;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }: { nativeEvent: any }) => {
    if (!isDrawing || !contextRef.current) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    if (!contextRef.current) {
      return;
    }

    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    if (!contextRef.current) {
      return;
    }

    setIsMarker(true);
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    if (!contextRef.current) {
      return;
    }

    setIsMarker(false);
    contextRef.current.globalCompositeOperation = "destination-out";
  };

  return (
    <div className="border border-black">
      <canvas
        className="canvas-container"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <div className="flex gap-3">
        <button
          className={(isMarker && "border border-red-500") || ""}
          onClick={setToDraw}
        >
          Draw
        </button>
        <button
          className={(!isMarker && "border border-red-500") || ""}
          onClick={setToErase}
        >
          Erase
        </button>
        <button
          onClick={() => {
            contextRef.current?.clearRect(
              0,
              0,
              canvasRef?.current?.width || 0,
              canvasRef?.current?.height || 0
            );
          }}
        >
          Clear
        </button>
        <button
          onClick={async () => {
            const image = canvasRef?.current?.toDataURL();
            const blob = await (await fetch(image || "")).blob();

            console.log(blob);
            const a = document.createElement("a");
            a.download = "my-file.png";
            a.href = URL.createObjectURL(blob);
            a.addEventListener("click", (e) => {
              setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
            });
            a.click();
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            var image = new Image();
            image.onload = function () {
              contextRef?.current?.drawImage(
                image,
                0,
                0,
                canvasRef?.current?.width || 0,
                canvasRef?.current?.height || 0
              );
            };
            image.src = "http://www.lunapic.com/editor/premade/transparent.gif";
          }}
        >
          Load
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
