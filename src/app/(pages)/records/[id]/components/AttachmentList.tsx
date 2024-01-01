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
import ImageViewer from "@/app/components/ImageViewer";

type AttachmentListProps = {
  patientRecordId: number;
};

const AttachmentList = (props: AttachmentListProps) => {
  const { patientRecordId } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { attachmentList } = useAppSelector(
    (state) => state.recordReducer.value
  );
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    fetchAttachments(dispatch, patientRecordId);
  }, []);

  return (
    <div className="flex gap-3 flex-wrap">
      {source && (
        <ImageViewer
          source={source}
          onCloseClick={() => {
            setSource("");
          }}
        />
      )}
      {attachmentList &&
        attachmentList.length > 0 &&
        attachmentList.map((attachment, index) => (
          <div
            key={`image-${index}`}
            className="border border-black relative p-2 cursor-pointer"
          >
            <div
              className="absolute p-2 right-2 border border-black rounded-xl bg-lime-100 hover:bg-lime-300 cursor-pointer"
              onClick={async () => {
                await deleteAttachment(dispatch, attachment.id);
                fetchAttachments(dispatch, patientRecordId);
              }}
            >
              <AiFillDelete />
            </div>
            <Image
              src={attachment.url as string}
              alt=""
              width={150}
              height={150}
              className="w-32 h-32"
              onClick={() => {
                setSource(attachment.url);
              }}
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
