import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  deleteAttachment,
  deleteDrawing,
  fetchAttachments,
  fetchDrawings,
} from "@/utils/dataFetchers";
import { AiFillDelete } from "react-icons/ai";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Spinner } from "flowbite-react";

type AttachmentListProps = {
  patientRecordId: number;
};

const AttachmentList = (props: AttachmentListProps) => {
  const { patientRecordId } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { attachmentList } = useAppSelector(
    (state) => state.recordReducer.value
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAttachments(dispatch, patientRecordId);
  }, []);

  return (
    <div className="flex gap-3 flex-wrap">
      {attachmentList &&
        attachmentList.length > 0 &&
        attachmentList.map((attachment, index) => (
          <div
            key={`image-${index}`}
            className="border border-black relative p-2"
          >
            <div
              className="absolute p-2 right-2 border border-black rounded-xl bg-lime-100 hover:bg-lime-300 cursor-pointer"
              onClick={async () => {
                setIsLoading(true);
                await deleteAttachment(dispatch, attachment.id);
                fetchAttachments(dispatch, patientRecordId);
              }}
            >
              {isLoading ? <Spinner /> : <AiFillDelete />}
            </div>
            <Image
              src={attachment.url as string}
              alt=""
              width={250}
              height={250}
            />
          </div>
        ))}
      {!attachmentList && <LoadingSpinner />}
      {attachmentList?.length === 0 && (
        <div>
          <p>No records found!</p>
        </div>
      )}
    </div>
  );
};

export default AttachmentList;
