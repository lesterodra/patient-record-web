"use client";

import { Button } from "flowbite-react";
import AdvanceSearchModal from "./AdvanceSearchModal";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { updatePatientListQueryParameters } from "@/redux/features/patient-slice";
import { getPatientList } from "@/utils/dataFetchers";

const PatientSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { patientListQueryParameters } = useAppSelector(
    (state) => state.patientReducer.value
  );

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        {/* <input
          type="text"
          value={patientListQueryParameters?.quickSearchInput ?? ""}
          className="rounded-md"
          placeholder="Quick Search..."
          onChange={(e) => {
            dispatch(
              updatePatientListQueryParameters({
                quickSearchInput: e.target.value,
              })
            );
          }}
        />
        <Button
          onClick={async () => {
            await getPatientList(dispatch, {
              quickSearchInput: patientListQueryParameters?.quickSearchInput,
              page: 1,
              limit: 5,
            });
          }}
        >
          GO
        </Button> */}
        <AdvanceSearchModal />
      </div>
    </div>
  );
};

export default PatientSearch;
