"use client";

import { useEffect, useState } from "react";
import { Pagination, Table } from "flowbite-react";
import PatientRecordModal from "@/app/components/PatientRecordModal";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getPatientRecordList } from "@/utils/dataFetchers";

const PatientRecords = () => {
  const [isPatientRecordModalOpen, setIsPatientRecordModalOpen] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { recordList } = useAppSelector((state) => state.recordReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getPatientRecordList(dispatch, { page: currentPage, limit: 5 });
  }, [currentPage]);

  return (
    <>
      <PatientRecordModal
        isOpen={isPatientRecordModalOpen}
        setIsOpen={setIsPatientRecordModalOpen}
      />
      <div className="mt-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-52">Record No.</Table.HeadCell>
            <Table.HeadCell className="w-52">Patient No.</Table.HeadCell>
            <Table.HeadCell>Patient name</Table.HeadCell>
            <Table.HeadCell className="w-52">Gender</Table.HeadCell>
            <Table.HeadCell className="w-60">Record date</Table.HeadCell>
            <Table.HeadCell className="w-60">Status</Table.HeadCell>
            <Table.HeadCell className="w-3">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {recordList?.data.map((patientRecord) => (
              <Table.Row
                key={patientRecord.id}
                className="bg-white text-black dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{patientRecord.recordNo}</Table.Cell>
                <Table.Cell>
                  {patientRecord.patientInformation?.patientNo}
                </Table.Cell>
                <Table.Cell className="text-black font-bold">
                  {patientRecord.patientInformation?.lastName},{" "}
                  {patientRecord.patientInformation?.firstName}{" "}
                  {patientRecord.patientInformation?.middleName}
                </Table.Cell>
                <Table.Cell>
                  {patientRecord.patientInformation?.gender}
                </Table.Cell>
                <Table.Cell>{patientRecord.createdAt}</Table.Cell>
                <Table.Cell>For Doctors checkup</Table.Cell>
                <Table.Cell>
                  <p
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    onClick={() => {
                      setIsPatientRecordModalOpen(true);
                    }}
                  >
                    View
                  </p>
                  <p
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    onClick={() => {}}
                  >
                    Edit
                  </p>
                  <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                    Delete
                  </p>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="flex justify-between items-center">
          <div>
            <p>Showing 10 of 100 Records</p>
          </div>
          <Pagination
            currentPage={recordList?.page ?? 1}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            totalPages={recordList?.totalPage ?? 0}
          />
        </div>
      </div>
    </>
  );
};

export default PatientRecords;
