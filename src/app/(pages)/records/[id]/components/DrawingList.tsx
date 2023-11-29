import { AppDispatch, useAppSelector } from "@/redux/store";
import { deleteDrawing, fetchDrawings } from "@/utils/dataFetchers";
import { Drawing } from "@prisma/client";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

type DrawingListProps = {
  patientRecordId: number;
};

const DrawingList = (props: DrawingListProps) => {
  const { patientRecordId } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { drawingList } = useAppSelector((state) => state.recordReducer.value);

  useEffect(() => {
    fetchDrawings(dispatch, patientRecordId);
  }, []);

  return (
    <div className="flex gap-3 flex-wrap">
      {drawingList?.map((drawing, index) => (
        <div
          key={`image-${index}`}
          className="border border-black relative p-2"
        >
          <div
            className="absolute p-2 right-2 border border-black rounded-xl bg-lime-100 hover:bg-lime-300 cursor-pointer"
            onClick={async () => {
              await deleteDrawing(dispatch, drawing.id);
              fetchDrawings(dispatch, patientRecordId);
            }}
          >
            <AiFillDelete />
          </div>
          <Image src={drawing.data as string} alt="" width={500} height={400} />
        </div>
      ))}
    </div>
  );
};

export default DrawingList;
