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
import Dropdown from "@/app/components/Dropdown";
import FormDropdownWithId from "@/app/components/FormDropdownWithId";
import { PREVIOUS_SURGERIES, RECORD_STATUSES } from "@/utils/constants";

const PatientRecordAdvanceSearchModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { patientRecordListQueryParameters } = useAppSelector(
    (state) => state.recordReducer.value
  );
  const { doctorList } = useAppSelector((state) => state.userReducer.value);

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
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Advance Search</Modal.Header>
        <Modal.Body>
          <div className="">
            <p>Record Information</p>
            <div className="flex flex-wrap gap-5 mb-5 border border-gray-500 p-3 rounded">
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
              <DatePicker
                label="Follow Up date"
                value={patientRecordListQueryParameters?.followUpDate ?? ""}
                onChange={(e) => {
                  dispatch(
                    updatePatientRecordListQueryParameters({
                      followUpDate: e.target.value,
                    })
                  );
                }}
              />
              <FormDropdownWithId
                label="Status"
                selected={patientRecordListQueryParameters?.status}
                options={RECORD_STATUSES}
                onChange={(e) => {
                  dispatch(
                    updatePatientRecordListQueryParameters({
                      status: e.target.value,
                    })
                  );
                }}
              />
              <FormDropdownWithId
                label="MD"
                selected={patientRecordListQueryParameters?.medicalDoctorUserId}
                options={
                  doctorList
                    ? doctorList.map((user) => ({
                        label: `${user.lastName}, ${user.firstName}`,
                        value: user.id,
                      }))
                    : []
                }
                onChange={(e) => {
                  dispatch(
                    updatePatientRecordListQueryParameters({
                      medicalDoctorUserId: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  );
                }}
              />
              <Dropdown
                label="Surgery"
                selected={patientRecordListQueryParameters?.surgery}
                options={PREVIOUS_SURGERIES}
                onChange={(e) => {
                  dispatch(
                    updatePatientRecordListQueryParameters({
                      surgery: e.target.value,
                    })
                  );
                }}
              />
            </div>
            <p>Patient Information</p>
            <div className="flex flex-wrap gap-5 border border-gray-500 p-3 rounded">
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
            </div>
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
