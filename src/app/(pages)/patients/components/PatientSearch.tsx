"use client";

import { Button } from "flowbite-react";
import AdvanceSearchModal from "./AdvanceSearchModal";

const PatientSearch = () => {
  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          className="rounded-md"
          placeholder="Quick Search..."
        />
        <Button onClick={() => {}}>GO</Button>
        <AdvanceSearchModal />
      </div>
    </div>
  );
};

export default PatientSearch;
