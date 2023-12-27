import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { AiFillSetting } from "react-icons/ai";
import LabeledInput from "@/app/components/LabeledInput";
import DatePicker from "@/app/components/DatePicker";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getPatientRecordList } from "@/utils/dataFetchers";
import {
  clearPatientRecordListQueryParameters,
  updatePatientRecordListQueryParameters,
} from "@/redux/features/record-slice";

const PatientRecordAdvanceSearchModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { patientRecordListQueryParameters } = useAppSelector(
    (state) => state.recordReducer.value
  );

  const onSearchButtonClick = async () => {
    await getPatientRecordList(dispatch, {
      ...patientRecordListQueryParameters,
      quickSearchInput: undefined,
      page: 1,
      limit: 5,
    });

    setIsOpen(false);
  };

  return (
    <>
      <Button
        color="white"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <AiFillSetting size="20" />
      </Button>
      <Modal show={isOpen} size="md" onClose={() => setIsOpen(false)}>
        <Modal.Header>Advance Search</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <LabeledInput
              label="Record No."
              value={patientRecordListQueryParameters?.recordNo ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    recordNo: e.target.value,
                  })
                );
              }}
            />
            <LabeledInput
              label="Patient No."
              value={patientRecordListQueryParameters?.patientNo ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    patientNo: e.target.value,
                  })
                );
              }}
            />
            <LabeledInput
              label="Patient Last Name"
              value={patientRecordListQueryParameters?.lastName ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    lastName: e.target.value,
                  })
                );
              }}
            />
            <LabeledInput
              label="Patient First Name"
              value={patientRecordListQueryParameters?.firstName ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    firstName: e.target.value,
                  })
                );
              }}
            />
            <LabeledInput
              label="Patient Middle Name"
              value={patientRecordListQueryParameters?.middleName ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    middleName: e.target.value,
                  })
                );
              }}
            />
            <DatePicker
              label="Patient Birth date"
              value={patientRecordListQueryParameters?.birthDate ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    birthDate: e.target.value,
                  })
                );
              }}
            />
            <DatePicker
              label="Record date from"
              value={patientRecordListQueryParameters?.dateFrom ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    dateFrom: e.target.value,
                  })
                );
              }}
            />
            <DatePicker
              label="Record date to"
              value={patientRecordListQueryParameters?.dateTo ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientRecordListQueryParameters({
                    dateTo: e.target.value,
                  })
                );
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={onSearchButtonClick}>Search</Button>
          <Button
            color="green"
            onClick={() => {
              dispatch(clearPatientRecordListQueryParameters());
            }}
          >
            Clear
          </Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PatientRecordAdvanceSearchModal;
