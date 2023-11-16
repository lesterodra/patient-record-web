"use client";

import CheckboxItem from "@/app/components/CheckboxItem";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useRef } from "react";
import sampleDrawing from "../../../public/my-file.png";
import { PatientRecord } from "@prisma/client";

const PatientRecordModal = ({
  isOpen,
  setIsOpen,
  patientRecord,
}: {
  patientRecord: PatientRecord;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  console.log({ patientRecord });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    contextRef.current = context;
    const image = new Image();
    image.onload = function () {
      contextRef?.current?.drawImage(
        image,
        0,
        0,
        canvasRef?.current?.width || 0,
        canvasRef?.current?.height || 0
      );
    };
    image.src = "/my-file.png";
  }, []);

  return (
    <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
      <Modal.Header>Record details: {patientRecord.recordNo}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <div className=" flex justify-between  mb-5">
              <CheckboxItem
                disabled
                name="missing"
                isRow
                items={["OR", "CONS"]}
              />
            </div>
            <div className="my-2">
              <span className="text-xl font-bold">Reason for Visit: </span>BOV,
              Redness
            </div>
            <div className="my-2">
              <span className="text-xl font-bold">Previous Medicines: </span>
              Medicine 1, Medicine 2
            </div>
            <div className="my-2">
              <span className="text-xl font-bold">Auto Refraction: </span>
              OD: 123 OS: 456
            </div>
            <p>
              <span className="text-xl font-bold">Visual Acuity: </span>
            </p>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>EYE</Table.HeadCell>
                <Table.HeadCell>SC</Table.HeadCell>
                <Table.HeadCell>PH</Table.HeadCell>
                <Table.HeadCell>CC</Table.HeadCell>
                <Table.HeadCell>NCC</Table.HeadCell>
                <Table.HeadCell>J.</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    OD
                  </Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-black">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    OS
                  </Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                  <Table.Cell className="p-0">data</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <p className="mb-3 mt-8 font-bold text-xl">Refraction</p>
            <div className="flex mb-5 gap-3">
              <div className="flex items-end gap-3">
                <p className="font-bold">OD:</p>
                data
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">D(-)</p>
                data
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">Dx</p>
                data
              </div>
            </div>
            <div className="flex mb-5 gap-3">
              <div className="flex items-end gap-3">
                <p className="font-bold">OS:</p>
                data
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">D(-)</p>
                data
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">Dx</p>
                data
              </div>
            </div>
            <div className="flex mb-5 gap-3">
              <div className="flex items-end gap-3">
                <p className="font-bold">Add:(J.)</p>
                data
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">PD</p>
                data
                <span>mm</span>
              </div>
            </div>
            <p className="mb-3 mt-8 font-bold text-xl">Intra Ocular Pressure</p>
            <div className="flex gap-3 mb-5">
              <div className="flex items-end gap-3">
                <p className="font-bold">Time:</p>
                data
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">OD:</p>
                data
              </div>
              <div className="flex items-end gap-3">
                <p className="font-bold">OS:</p>
                data
              </div>
            </div>
            <div>
              <span className="mb-3 mt-8 font-bold text-xl">MD: </span>
              <span>Lorem Ipsum</span>
            </div>
            <div>
              <canvas
                ref={canvasRef}
                className="border border-black"
                width="700"
                height="500"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button color="red" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientRecordModal;
