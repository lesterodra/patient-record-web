import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { AiFillSetting } from "react-icons/ai";
import LabeledInput from "@/app/components/LabeledInput";
import DatePicker from "@/app/components/DatePicker";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  clearPatientListQueryParameters,
  updatePatientListQueryParameters,
} from "@/redux/features/patient-slice";
import { getPatientList } from "@/utils/dataFetchers";

const AdvanceSearchModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { patientListQueryParameters } = useAppSelector(
    (state) => state.patientReducer.value
  );

  const onSearchButtonClick = async () => {
    await getPatientList(dispatch, {
      ...patientListQueryParameters,
      page: 1,
      limit: 5,
    });

    setIsOpen(false);
  };

  return (
    <>
      <Button
        color="green"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {/* <AiFillSetting size="20" /> */}
        Search Filters
      </Button>
      <Modal show={isOpen} size="md" onClose={() => setIsOpen(false)}>
        <Modal.Header>Advance Search</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <LabeledInput
              label="Patient No."
              value={patientListQueryParameters?.patientNo ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientListQueryParameters({
                    patientNo: e.target.value,
                  })
                );
              }}
            />
            <LabeledInput
              label="Last Name"
              value={patientListQueryParameters?.lastName ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientListQueryParameters({
                    lastName: e.target.value,
                  })
                );
              }}
            />
            <LabeledInput
              label="First Name"
              value={patientListQueryParameters?.firstName ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientListQueryParameters({
                    firstName: e.target.value,
                  })
                );
              }}
            />
            <LabeledInput
              label="Middle Name"
              value={patientListQueryParameters?.middleName ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientListQueryParameters({
                    middleName: e.target.value,
                  })
                );
              }}
            />
            <DatePicker
              label="Birth Date"
              value={patientListQueryParameters?.birthDate ?? ""}
              onChange={(e) => {
                dispatch(
                  updatePatientListQueryParameters({
                    birthDate: e.target.value,
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
              dispatch(clearPatientListQueryParameters());
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

export default AdvanceSearchModal;
