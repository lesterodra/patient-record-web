import PatientRecordModal from "@/app/components/PatientRecordModal";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  appendPatientRecordList,
  getPatientRecordList,
} from "@/utils/dataFetchers";
import { convertToReadableDate } from "@/utils/displayParser";
import { PatientRecord } from "@prisma/client";
import { Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const PatientRecordHistory = () => {
  const { recordList } = useAppSelector((state) => state.recordReducer.value);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPatientRecordModalOpen, setIsPatientRecordModalOpen] =
    useState<boolean>(false);
  const [patientRecord, setPatientRecord] = useState<PatientRecord | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getPatientRecordList(dispatch, { page: currentPage, limit: 3 });
  }, []);

  const onLoadMoreClick = () => {
    appendPatientRecordList(dispatch, { page: currentPage + 1, limit: 3 });
    setCurrentPage(currentPage + 1);
  };

  const openPatientRecordModal = (id: number) => {
    setIsPatientRecordModalOpen(true);
    setPatientRecord(
      recordList?.data.find((patientRecord) => patientRecord.id === id) ?? null
    );
  };

  return (
    <div className="mt-4">
      {isPatientRecordModalOpen && patientRecord && (
        <PatientRecordModal
          patientRecord={patientRecord}
          isOpen={isPatientRecordModalOpen}
          setIsOpen={setIsPatientRecordModalOpen}
        />
      )}
      <div className="mt-6 flex justify-between items-end border border-b-gray-500 border-t-0 border-x-0">
        <p className="text-xl">Patient Records</p>
        <div>
          <span>Order by: </span>
          <select>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>
      {recordList?.data.map((record) => (
        <div
          className="mt-4 border border-black-100 cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => {
            openPatientRecordModal(record.id || 0);
          }}
        >
          {record.recordNo}
          <div className="underline text-blue-500 ">
            <p className="text-xs">{convertToReadableDate(record.createdAt)}</p>
          </div>
        </div>
      ))}
      {recordList &&
        recordList?.data.length !== 0 &&
        recordList.totalPage > currentPage && (
          <div ref={loadMoreRef} className="flex justify-center">
            <Button onClick={onLoadMoreClick}>Load more</Button>
          </div>
        )}
    </div>
  );
};

export default PatientRecordHistory;
