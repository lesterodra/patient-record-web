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

type PatientRecordHistoryProps = {
  patientInformationId: number;
};

const PatientRecordHistory = (props: PatientRecordHistoryProps) => {
  const { patientInformationId } = props;
  const { recordList } = useAppSelector((state) => state.recordReducer.value);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [isPatientRecordModalOpen, setIsPatientRecordModalOpen] =
    useState<boolean>(false);
  const [patientRecord, setPatientRecord] = useState<PatientRecord | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   getPatientRecordList(dispatch, {
  //     patientInformationId,
  //     sortOrder,
  //     page: currentPage,
  //     limit: 3,
  //   });
  // }, []);

  useEffect(() => {
    getPatientRecordList(dispatch, {
      patientInformationId,
      sortOrder,
      page: 1,
      limit: 3,
    });
  }, [sortOrder]);

  useEffect(() => {
    console.log("total records update:", recordList?.totalRecords);

    setCurrentPage(1);
  }, [recordList?.totalRecords]);

  const onLoadMoreClick = () => {
    appendPatientRecordList(dispatch, {
      page: currentPage + 1,
      limit: 3,
      sortOrder,
      patientInformationId,
    });
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
          <select
            onChange={(e) => {
              setSortOrder(e.target.value);
            }}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
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
