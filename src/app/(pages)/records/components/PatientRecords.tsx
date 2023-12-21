"use client";

import { useEffect, useState } from "react";
import { Pagination, Table } from "flowbite-react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  getPatientRecordById,
  getPatientRecordList,
} from "@/utils/dataFetchers";
import Link from "next/link";
import {
  displayDateAndTime,
  displayFullName,
  getValueDisplay,
} from "@/utils/displayParser";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import UpdatePatientRecordModal from "./UpdatePatientRecordModal";

const PatientRecords = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isUpdatePatientRecordModalOpen, setIsUpdatePatientRecordModalOpen] =
    useState<boolean>(false);
  const { recordList, patientRecordListQueryParameters, patientRecord } =
    useAppSelector((state) => state.recordReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getPatientRecordList(dispatch, {
      ...patientRecordListQueryParameters,
      page: currentPage,
      limit: 5,
    });
  }, [currentPage]);

  return (
    <>
      {isUpdatePatientRecordModalOpen && (
        <UpdatePatientRecordModal
          isOpen={isUpdatePatientRecordModalOpen}
          setIsOpen={setIsUpdatePatientRecordModalOpen}
          patientRecord={patientRecord}
        />
      )}
      <div className="mt-5" style={{ overflowX: "auto" }}>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-52">Record No.</Table.HeadCell>
            <Table.HeadCell className="w-52">Patient Details</Table.HeadCell>
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
                <Table.Cell>
                  <Link
                    className="underline text-blue-500"
                    href={`/records/${patientRecord.id}`}
                  >
                    {getValueDisplay(patientRecord.recordNo)}
                  </Link>
                </Table.Cell>
                <Table.Cell className="text-black text-xs">
                  <div>
                    <p>
                      <b>{patientRecord.patientInformation?.patientNo}</b>
                    </p>
                    <p>
                      {displayFullName(
                        patientRecord.patientInformation?.lastName,
                        patientRecord.patientInformation?.firstName,
                        patientRecord.patientInformation?.middleName
                      )}
                    </p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {displayDateAndTime(
                    patientRecord.createdAt as unknown as string
                  )}
                </Table.Cell>
                <Table.Cell>For Doctors checkup</Table.Cell>
                <Table.Cell>
                  <p
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    onClick={async () => {
                      await getPatientRecordById(
                        dispatch,
                        patientRecord?.id?.toString()
                      );
                      setIsUpdatePatientRecordModalOpen(true);
                    }}
                  >
                    Edit
                  </p>
                  <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                    Delete
                  </p>
                </Table.Cell>
              </Table.Row>
            ))}
            {recordList?.totalRecords === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5}>No Records found!</Table.Cell>
              </Table.Row>
            )}
            {!recordList && (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <LoadingSpinner />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        {recordList && (
          <div className="flex justify-between items-center">
            <div>
              <p>
                Showing 1 to {recordList?.data.length} of{" "}
                {recordList?.totalRecords} Records
              </p>
            </div>
            <Pagination
              currentPage={recordList?.page ?? 1}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
              totalPages={recordList?.totalPage ?? 0}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PatientRecords;
