import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";
import FormDropdown from "@/app/components/FormDropdown";
import FormDropdownWithId from "@/app/components/FormDropdownWithId";
import { AppDispatch } from "@/redux/store";
import { ERROR_MESSAGE, RECORD_STATUSES } from "@/utils/constants";
import { updateRecordStatus } from "@/utils/dataFetchers";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type ChangeStatusModalProps = {
  currentStatus: string;
  patientRecordId: number;
  onStatusChange?: (status: string) => void;
};

const ChangeStatusModal = (props: ChangeStatusModalProps) => {
  const { currentStatus, patientRecordId, onStatusChange } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState, getValues } = useForm({
    values: {
      status: currentStatus,
    },
  });
  const onSaveButtonClick = async () => {
    const { status } = getValues();

    await updateRecordStatus(dispatch, patientRecordId, status);
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  return (
    <div>
      <Button
        color="green"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Change Status
      </Button>
      <Modal show={isOpen} size="sm" onClose={() => setIsOpen(false)}>
        <Modal.Header>Change record status</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex gap-3 mb-5">
              <FormDropdownWithId
                width="w-full"
                label=""
                options={RECORD_STATUSES}
                formRegister={register("status", {
                  required: ERROR_MESSAGE.REQUIRED,
                })}
                errorMessage={formState?.errors?.status?.message?.toString()}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <ButtonWithSpinner
            isLoading={formState.isSubmitting}
            onClick={handleSubmit(onSaveButtonClick)}
          >
            Save
          </ButtonWithSpinner>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChangeStatusModal;
