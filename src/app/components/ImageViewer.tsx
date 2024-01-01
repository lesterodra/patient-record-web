import { FaWindowClose } from "react-icons/fa";

type ImageViewerProps = {
  source: string;
  onCloseClick: () => void;
};

const ImageViewer = (props: ImageViewerProps) => {
  const { source, onCloseClick } = props;
  console.log({ source });
  return (
    <div className=" relative">
      <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center overflow-hidden z-50 bg-black">
        <img
          src={source}
          alt=""
          className="w-auto max-w-full h-auto max-h-full block"
        />
        <div
          className="fixed top-0 right-0 p-5 bg-white rounded-full cursor-pointer"
          onClick={onCloseClick}
        >
          <FaWindowClose />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
