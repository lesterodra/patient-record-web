"use client";

import { useEffect, useState } from "react";
import { Pagination, Table } from "flowbite-react";
import Link from "next/link";
import UpdatePatientModal from "./UpdatePatientModal";
import { getValueDisplay } from "@/utils/displayParser";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import useSWRMutation from "swr/mutation";
import { fetchPatients } from "@/redux/features/patient-slice";

const getPatients = async (url: string) => {
  const response = await fetch(url);

  return response.json();
};

const PatientList = () => {
  const [isUpdatePatientModalOpen, setIsUpdatePatientModalOpen] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { patientList } = useAppSelector((state) => state.patientReducer.value);

  const { trigger, data } = useSWRMutation(
    `api/patients?page=${currentPage}&limit=3`,
    getPatients
  );

  useEffect(() => {
    trigger();
  }, []);

  useEffect(() => {
    trigger();
  }, [currentPage]);

  useEffect(() => {
    dispatch(fetchPatients(data));
  }, [data]);

  return (
    <>
      <UpdatePatientModal
        isOpen={isUpdatePatientModalOpen}
        setIsOpen={setIsUpdatePatientModalOpen}
      />
      <div className="mt-5">
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
                  <Link
                    className="underline text-blue-500"
                    href={`/patients/${patient.id}`}
                  >
                    {getValueDisplay(patient.patientNo)}
                  </Link>
                </Table.Cell>
                <Table.Cell className="text-black font-bold">
                  {`${patient.lastName}, ${patient.firstName} ${
                    patient.middleName ?? ""
                  }`}
                </Table.Cell>
                <Table.Cell>{getValueDisplay(patient.gender)}</Table.Cell>
                <Table.Cell>{getValueDisplay(patient.birthDate)}</Table.Cell>
                <Table.Cell>
                  <p
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                    onClick={() => {
                      setIsUpdatePatientModalOpen(true);
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
            {patientList?.totalRecords === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5}>No Records found!</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <div className="flex justify-between items-center">
          <div>
            <p>
              Showing 1 to {currentPage * (patientList?.limit ?? 3)} of{" "}
              {patientList?.totalRecords} Records
            </p>
          </div>
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            totalPages={patientList?.totalPage || 0}
          />
        </div>
      </div>
    </>
  );
};

export default PatientList;
