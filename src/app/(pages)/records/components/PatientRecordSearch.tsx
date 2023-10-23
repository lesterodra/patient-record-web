"use client";

import { Button } from "flowbite-react";
import PatientRecordAdvanceSearchModal from "./PatientRecordAdvanceSearchModal";

const PatientRecordSearch = () => {
  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          className="rounded-md"
          placeholder="Quick Search..."
        />
        <Button onClick={() => {}}>GO</Button>
        <PatientRecordAdvanceSearchModal />
      </div>
    </div>
  );
};

export default PatientRecordSearch;
