"use client";

import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import UpdatePatientModal from "./UpdatePatientModal";
import {
  convertToReadableDate,
  getValueDisplay,
  isAdminUser,
} from "@/utils/displayParser";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getPatientDetailsById, getPatientList } from "@/utils/dataFetchers";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import PaginationFooter from "@/app/components/PaginationFooter";
import { UserType } from "@/redux/features/user-slice";

type PatientListProps = {
  session: { user: UserType };
};

const PatientList = (props: PatientListProps) => {
  const { session } = props;
  const [isUpdatePatientModalOpen, setIsUpdatePatientModalOpen] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { patientList, patientInformation } = useAppSelector(
    (state) => state.patientReducer.value
  );

  useEffect(() => {
    getPatientList(dispatch, { page: currentPage, limit: 5 });
  }, [currentPage]);

  return (
    <>
      {isUpdatePatientModalOpen && (
        <UpdatePatientModal
          isOpen={isUpdatePatientModalOpen}
          setIsOpen={setIsUpdatePatientModalOpen}
          patientDetails={patientInformation}
        />
      )}
      <div className="mt-5" style={{ overflowX: "auto" }}>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-52">Patient No.</Table.HeadCell>
            <Table.HeadCell>Patient name</Table.HeadCell>
            <Table.HeadCell className="w-52">Gender</Table.HeadCell>
            <Table.HeadCell className="w-60">Birth date</Table.HeadCell>
            <Table.HeadCell className="w-3">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {patientList?.data?.map((patient) => (
              <Table.Row
                key={patient.id}
                className="bg-white text-black dark:border-gray-700 dark:bg-gray-800 hover:bg-slate-100"
              >
                <Table.Cell>
                  <a
                    className="underline text-blue-500"
                    href={`/patients/${patient.id}`}
                  >
                    {getValueDisplay(patient.patientNo)}
                  </a>
                </Table.Cell>
                <Table.Cell className="text-black font-bold">
                  {`${patient.lastName}, ${patient.firstName} ${
                    patient.middleName ?? ""
                  }`}
                </Table.Cell>
                <Table.Cell>{getValueDisplay(patient.gender)}</Table.Cell>
                <Table.Cell>
                  {convertToReadableDate(patient.birthDate ?? "")}
                </Table.Cell>
                <Table.Cell>
                  <p
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    onClick={async () => {
                      await getPatientDetailsById(dispatch, patient.id ?? "");
                      setIsUpdatePatientModalOpen(true);
                    }}
                  >
                    Edit
                  </p>
                  {/* <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">
                    Delete
                  </p> */}
                </Table.Cell>
              </Table.Row>
            ))}
            {patientList?.totalRecords === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5}>No Records found!</Table.Cell>
              </Table.Row>
            )}
            {!patientList && (
              <Table.Row>
                <Table.Cell colSpan={5}>
                  <LoadingSpinner />
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        {patientList && (
          <PaginationFooter
            currentPage={currentPage}
            totalPage={patientList?.totalPage}
            totalRecords={patientList.totalRecords}
            pageSize={patientList.limit}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        )}
      </div>
    </>
  );
};

export default PatientList;
