"use client";

import { useEffect, useState } from "react";
import { Badge, Table } from "flowbite-react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  getDoctorList,
  getPatientRecordById,
  getPatientRecordList,
  getUserList,
} from "@/utils/dataFetchers";
import {
  displayDateAndTime,
  displayFullName,
  getDisplayStatus,
  getValueDisplay,
  isAdminUser,
} from "@/utils/displayParser";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import UpdatePatientRecordModal from "./UpdatePatientRecordModal";
import PaginationFooter from "@/app/components/PaginationFooter";
import { UserType } from "@/redux/features/user-slice";

type PatientRecordsProps = {
  session: { user: UserType };
};

const PatientRecords = (props: PatientRecordsProps) => {
  const { session } = props;
  const [isUpdatePatientRecordModalOpen, setIsUpdatePatientRecordModalOpen] =
    useState<boolean>(false);
  const { recordList, patientRecord, patientRecordListSearchParameters } =
    useAppSelector((state) => state.recordReducer.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getDoctorList(dispatch);
    getUserList(dispatch, { limit: 20000 });
    getPatientRecordList(dispatch, {
      ...patientRecordListSearchParameters,
      page: 1,
      limit: 5,
    });
  }, []);

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
            <Table.HeadCell className="w-52">Record</Table.HeadCell>
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
                <Table.Cell className="relative align-baseline">
                  <div>
                    <a
                      className="underline text-blue-500 text-sm"
                      href={`/records/${patientRecord.id}`}
                    >
                      {getValueDisplay(patientRecord.recordNo)}
                    </a>
                    <p className="text-xs">{patientRecord.visitType}</p>
                    <p className="text-xs text-gray-700">
                      {getValueDisplay(
                        patientRecord.surgeries?.join(", ").toString()
                      )}
                    </p>
                    <p className="text-xs">
                      Doctor:{" "}
                      {`${patientRecord.medicalDoctorUser.firstName} ${patientRecord.medicalDoctorUser.lastName}`}
                    </p>
                    <div className="inline-block absolute top-1 right-1">
                      <Badge size="xs">{patientRecord.dilateType}</Badge>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-black text-xs align-baseline">
                  <div>
                    <a
                      className="underline text-blue-500 text-xs font-thin"
                      href={`/patients/${patientRecord.patientInformationId}`}
                      target="_blank"
                    >
                      <b>
                        {getValueDisplay(
                          patientRecord.patientInformation.patientNo
                        )}
                      </b>
                    </a>
                    <p className="text-sm font-bold">
                      {displayFullName(
                        patientRecord.patientInformation?.lastName,
                        patientRecord.patientInformation?.firstName,
                        patientRecord.patientInformation?.middleName
                      )}
                    </p>
                  </div>
                </Table.Cell>
                <Table.Cell className="align-baseline">
                  {displayDateAndTime(
                    patientRecord.createdAt as unknown as string
                  )}
                </Table.Cell>
                <Table.Cell className="align-baseline">
                  {getDisplayStatus(patientRecord.status)}
                </Table.Cell>
                <Table.Cell className="align-baseline">
                  {isAdminUser(session) && (
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
                  )}
                  {/* <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                    Delete
                  </p> */}
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
          <PaginationFooter
            currentPage={recordList.page}
            totalPage={recordList?.totalPage}
            totalRecords={recordList.totalRecords}
            pageSize={recordList.limit}
            onPageChange={(page) => {
              getPatientRecordList(dispatch, {
                ...patientRecordListSearchParameters,
                page,
                limit: 5,
              });
            }}
          />
        )}
      </div>
    </>
  );
};

export default PatientRecords;
