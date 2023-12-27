import { setDrawingDataUrl } from "@/redux/features/record-slice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isMarker, setIsMarker] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) {
      return;
    }

    canvas.width = sectionRef.current?.clientWidth ?? 0;
    canvas.height = 300;

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }: { nativeEvent: any }) => {
    const bcr = nativeEvent.target.getBoundingClientRect();

    let offsetX = nativeEvent.clientX - bcr.x;
    let offsetY = nativeEvent.clientY - bcr.y;

    if (nativeEvent.type === "touchstart") {
      offsetX = nativeEvent.touches[0].clientX - bcr.x;
      offsetY = nativeEvent.touches[0].clientY - bcr.y;
    }

    if (!contextRef.current) {
      return;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: { nativeEvent: any }) => {
    if (!isDrawing || !contextRef.current) {
      return;
    }

    const bcr = nativeEvent.target.getBoundingClientRect();
    let offsetX = nativeEvent.clientX - bcr.x;
    let offsetY = nativeEvent.clientY - bcr.y;

    if (nativeEvent.type === "touchmove") {
      offsetX = nativeEvent.touches[0].clientX - bcr.x;
      offsetY = nativeEvent.touches[0].clientY - bcr.y;
    }

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) {
      return;
    }

    contextRef.current.closePath();
    setIsDrawing(false);
    dispatch(setDrawingDataUrl(canvasRef?.current?.toDataURL() ?? ""));
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
    <div ref={sectionRef} className="border border-black w-full">
      <canvas
        className="canvas-container"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
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
        {/* <button
          onClick={async () => {
            const image = canvasRef?.current?.toDataURL();
            console.log({ image });
            const blob = await (await fetch(image || "")).blob();

            console.log(blob.toString());
            // const a = document.createElement("a");
            // a.download = "my-file.png";
            // a.href = URL.createObjectURL(blob);
            // a.addEventListener("click", (e) => {
            //   setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
            // });
            // a.click();

            fetch("/api/drawings", {
              method: "POST",
              body: JSON.stringify({
                data: image,
              }),
            });
          }}
        >
          Save
        </button> */}
        {/* <button
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
        </button> */}
      </div>
    </div>
  );
};

export default DrawingCanvas;
