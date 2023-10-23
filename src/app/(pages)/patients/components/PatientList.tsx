"use client";

import { useState } from "react";
import { Pagination, Table } from "flowbite-react";
import Link from "next/link";
import UpdatePatientModal from "./UpdatePatientModal";

const samplePatients = [
  {
    id: "1",
    patientNo: "EC-2309-00001",
    patientName: "Lorem Ipsum San-san",
    gender: "Male",
    birthDate: "January 1, 1990",
  },
  {
    id: "2",
    patientNo: "EC-2309-00002",
    patientName: "Lorem Ipsum San-san",
    gender: "Female",
    birthDate: "March 1, 1990",
  },
  {
    id: "3",
    patientNo: "EC-2309-00003",
    patientName: "Lorem Ipsum San-san",
    gender: "Male",
    birthDate: "February 1, 1992",
  },
];

const PatientList = () => {
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
            {samplePatients.map((patient) => (
              <Table.Row
                key={patient.id}
                className="bg-white text-black dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{patient.patientNo}</Table.Cell>
                <Table.Cell className="text-black font-bold">
                  {patient.patientName}
                </Table.Cell>
                <Table.Cell>{patient.gender}</Table.Cell>
                <Table.Cell>{patient.birthDate}</Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/patients/1"
                  >
                    <p>View</p>
                  </Link>
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
