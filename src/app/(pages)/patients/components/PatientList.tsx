"use client";

import { useState } from "react";
import type { PatientInformation } from "@prisma/client";
import { Pagination, Table } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpdatePatientModal from "./UpdatePatientModal";
import { getValueDisplay } from "@/utils/displayParser";

const PatientList = ({
  patientList,
}: {
  patientList: PatientInformation[];
}) => {
  const [isUpdatePatientModalOpen, setIsUpdatePatientModalOpen] =
    useState<boolean>(false);

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
            {patientList.map((patient) => (
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
            {patientList.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5}>No Records found!</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <div className="flex justify-between items-center">
          <div>
            <p>Showing 10 of 100 Records</p>
          </div>
          <Pagination
            currentPage={1}
            onPageChange={(page) => {
              // setCurrentPage(page);
            }}
            totalPages={100}
          />
        </div>
      </div>
    </>
  );
};

export default PatientList;
