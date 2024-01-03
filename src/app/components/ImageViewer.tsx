import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import Image from "next/image";
import { Spinner } from "flowbite-react";

type ImageViewerProps = {
  source: string;
  onDeleteButtonClick: () => void;
};

const ImageViewer = (props: ImageViewerProps) => {
  const { source, onDeleteButtonClick } = props;
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  return (
    <div>
      {isModelOpen && (
        <div className="relative">
          <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center overflow-hidden z-50 bg-white">
            <img
              src={source}
              alt=""
              className="w-auto max-w-full h-auto max-h-full block"
            />
            <div
              className="fixed top-0 right-0 p-5 bg-white rounded-full cursor-pointer"
              onClick={() => {
                setIsModelOpen(false);
              }}
            >
              <FaWindowClose />
            </div>
          </div>
        </div>
      )}
      <div className="border border-black relative p-2 cursor-pointer">
        <div
          className="absolute p-2 right-2 border border-black rounded-xl bg-lime-100 hover:bg-lime-300 cursor-pointer"
          onClick={async () => {
            setIsDeleteLoading(true);
            await onDeleteButtonClick();

            setIsDeleteLoading(false);
          }}
        >
          {isDeleteLoading ? <Spinner /> : <AiFillDelete />}
        </div>
        <Image
          src={source}
          alt=""
          width={150}
          height={150}
          className="w-32 h-32"
          onClick={() => {
            setIsModelOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
