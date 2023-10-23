"use client";

import { useState } from "react";
import { Pagination, Table } from "flowbite-react";
import Link from "next/link";
import PatientRecordModal from "@/app/components/PatientRecordModal";

const samplePatientRecords = [
  {
    id: "1",
    recordNo: "RC-000000001",
    patientNo: "EC-2309-00001",
    patientName: "Lorem Ipsum San-san",
    gender: "Male",
    recordDate: "January 1, 1990",
  },
  {
    id: "2",
    recordNo: "RC-000000002",
    patientNo: "EC-2309-00002",
    patientName: "Lorem Ipsum San-san",
    gender: "Female",
    recordDate: "March 1, 1990",
  },
  {
    id: "3",
    recordNo: "RC-000000003",
    patientNo: "EC-2309-00003",
    patientName: "Lorem Ipsum San-san",
    gender: "Male",
    recordDate: "February 1, 1992",
  },
];

const PatientRecords = () => {
  const [isPatientRecordModalOpen, setIsPatientRecordModalOpen] =
    useState<boolean>(false);

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
            <Table.HeadCell className="w-3">
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {samplePatientRecords.map((patientRecord) => (
              <Table.Row
                key={patientRecord.id}
                className="bg-white text-black dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{patientRecord.recordNo}</Table.Cell>
                <Table.Cell>{patientRecord.patientNo}</Table.Cell>
                <Table.Cell className="text-black font-bold">
                  {patientRecord.patientName}
                </Table.Cell>
                <Table.Cell>{patientRecord.gender}</Table.Cell>
                <Table.Cell>{patientRecord.recordDate}</Table.Cell>
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

export default PatientRecords;
