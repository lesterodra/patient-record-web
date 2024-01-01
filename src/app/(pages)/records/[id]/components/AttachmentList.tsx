import { AppDispatch, useAppSelector } from "@/redux/store";
import { deleteAttachment, fetchAttachments } from "@/utils/dataFetchers";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
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

  useEffect(() => {
    fetchAttachments(dispatch, patientRecordId);
  }, []);

  return (
    <div className="flex gap-3 flex-wrap">
      {attachmentList &&
        attachmentList.length > 0 &&
        attachmentList.map((attachment, index) => (
          <ImageViewer
            key={`attachment-${index}`}
            source={attachment.url}
            onDeleteButtonClick={async () => {
              await deleteAttachment(dispatch, attachment.id);
              fetchAttachments(dispatch, patientRecordId);
            }}
          />
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
