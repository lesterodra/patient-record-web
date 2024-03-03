"use client";

import { Button } from "flowbite-react";
import PatientRecordAdvanceSearchModal from "./PatientRecordAdvanceSearchModal";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { getPatientRecordList } from "@/utils/dataFetchers";
import { updatePatientRecordListQueryParameters } from "@/redux/features/record-slice";
import SearchFilterDisplay from "@/app/components/SearchFilterDisplay";

const PatientRecordSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { patientRecordListQueryParameters } = useAppSelector(
    (state) => state.recordReducer.value
  );

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          className="rounded-md"
          placeholder="Quick Search..."
          onChange={(e) => {
            dispatch(
              updatePatientRecordListQueryParameters({
                quickSearchInput: e.target.value,
              })
            );
          }}
        />
        <Button
          onClick={async () => {
            await getPatientRecordList(dispatch, {
              quickSearchInput:
                patientRecordListQueryParameters?.quickSearchInput,
              page: 1,
              limit: 5,
            });
          }}
        >
          GO
        </Button>
        <PatientRecordAdvanceSearchModal />
      </div>
      <SearchFilterDisplay />
    </div>
  );
};

export default PatientRecordSearch;
