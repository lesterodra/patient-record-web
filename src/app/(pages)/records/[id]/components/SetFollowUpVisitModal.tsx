import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";
import { AppDispatch } from "@/redux/store";
import { ERROR_MESSAGE } from "@/utils/constants";
import { updateRecordFollowUpDate } from "@/utils/dataFetchers";
import { convertToDateString } from "@/utils/displayParser";
import { Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type SetFollowUpVisitModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  followUpDate: string | null;
  patientRecordId: number;
  onFollowUpDateChange: (followUpDate: string) => void;
};

const SetFollowUpVisitModal = (props: SetFollowUpVisitModalProps) => {
  const {
    isOpen,
    setIsOpen,
    followUpDate,
    patientRecordId,
    onFollowUpDateChange,
  } = props;
  const { register, handleSubmit, formState, getValues, setError } = useForm({
    values: {
      followUpDate,
    },
  });
  const dateObject = new Date();
  const dateNextThreeDays = new Date(
    dateObject.setDate(dateObject.getDate() + 3)
  );
  const dateString = convertToDateString(dateNextThreeDays);
  const dispatch = useDispatch<AppDispatch>();

  const onSaveButtonClick = async () => {
    const { followUpDate: followUpDateValue } = getValues();

    if (
      new Date(followUpDateValue ?? "") <
      new Date(convertToDateString(dateNextThreeDays))
    ) {
      setError("followUpDate", { message: "Date should be 3 days from now." });
      return;
    }

    await updateRecordFollowUpDate(
      dispatch,
      patientRecordId,
      followUpDateValue as string
    );

    if (onFollowUpDateChange) {
      onFollowUpDateChange(followUpDateValue as string);
    }
  };

  return (
    isOpen && (
      <div>
        <Modal show={isOpen} size="sm" onClose={() => setIsOpen(false)}>
          <Modal.Header>Set Follow-up Visit</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-5">
                <input
                  className="rounded"
                  type="date"
                  min={dateString}
                  {...register("followUpDate", {
                    required: ERROR_MESSAGE.REQUIRED,
                  })}
                />
                <p className="text-xs text-red-500">
                  {formState.errors.followUpDate?.message?.toString()}
                </p>
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
            <Button color="yellow" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  );
};

export default SetFollowUpVisitModal;
