import { AppDispatch, useAppSelector } from "@/redux/store";
import { deleteDrawing, fetchDrawings } from "@/utils/dataFetchers";
import { Drawing } from "@prisma/client";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ImageViewer from "@/app/components/ImageViewer";

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
      {drawingList &&
        drawingList.length > 0 &&
        drawingList.map((drawing, index) => (
          <ImageViewer
            key={`drawing-${index}`}
            source={drawing.data as string}
            onDeleteButtonClick={async () => {
              await deleteDrawing(dispatch, drawing.id);
              fetchDrawings(dispatch, patientRecordId);
            }}
          />
        ))}
      {!drawingList && <LoadingSpinner />}
      {drawingList?.length === 0 && (
        <div>
          <p>No records found!</p>
        </div>
      )}
    </div>
  );
};

export default DrawingList;
