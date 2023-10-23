import CheckboxItem from "@/app/components/CheckboxItem";
import DrawingCanvas from "@/app/components/DrawingCanvas";
import Dropdown from "@/app/components/Dropdown";
import NewCanvas from "@/app/components/NewCanvas";
import { REASON_FOR_VISIT } from "@/utils/constants";
import { Table } from "flowbite-react";

const MedicalInformationInput = () => {
  return (
    <>
      <div className=" flex justify-between  mb-5">
        <CheckboxItem name="missing" isRow items={["OR", "CONS"]} />
      </div>
      <p className="mb-3 font-bold text-xl">Reason for your Visit/Complaints</p>
      <div className="flex gap-10">
        <CheckboxItem name="reason" items={REASON_FOR_VISIT.slice(0, 6)} />
        <CheckboxItem name="reason" items={REASON_FOR_VISIT.slice(6, 12)} />
        <CheckboxItem name="reason" items={REASON_FOR_VISIT.slice(12, 18)} />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Previous Meds</p>
      <textarea cols={40} rows={3} className="rounded-md" />
      <p className="mb-3 mt-8 font-bold text-xl">Auto Refraction</p>
      <div className="flex items-end gap-3">
        <p>OD:</p>
        <input type="text" className="border-t-0 border-l-0 border-r-0" />
      </div>
      <div className="flex items-end gap-3">
        <p>OS:</p>
        <input type="text" className="border-t-0 border-l-0 border-r-0" />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Visual Acuity</p>
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
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              OD
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              OS
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
            <Table.Cell className="p-0">
              <input type="text" className="rounded-md w-20" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <p className="mb-3 mt-8 font-bold text-xl">Refraction</p>
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>OD:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
        <div className="flex items-end gap-3">
          <p>D(-)</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
        <div className="flex items-end gap-3">
          <p>Dx</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
      </div>
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>OS:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
        <div className="flex items-end gap-3">
          <p>D(-)</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
        <div className="flex items-end gap-3">
          <p>Dx</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
      </div>
      <div className="flex mb-5">
        <div className="flex items-end gap-3">
          <p>Add:(J.)</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
        <div className="flex items-end gap-3">
          <p>PD</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
          <span>mm</span>
        </div>
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Intra Ocular Pressure</p>
      <div className="flex gap-3 mb-5">
        <div className="flex items-end gap-3">
          <p>Time:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-24"
          />
        </div>
        <div className="flex items-end gap-3">
          <p>OD:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
        <div className="flex items-end gap-3">
          <p>OS:</p>
          <input
            type="text"
            className="border-t-0 border-l-0 border-r-0 w-16"
          />
        </div>
      </div>
      <div className="flex items-end gap-3">
        <Dropdown
          label="MD"
          options={["Lorem Ipsum", "John Doe", "Jane Doe"]}
        />
      </div>
      <p className="mb-3 mt-8 font-bold text-xl">Diagnosis</p>
      <div className="flex gap-3 mb-5">
        <DrawingCanvas />
      </div>
    </>
  );
};

export default MedicalInformationInput;
