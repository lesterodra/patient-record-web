import ButtonWithSpinner from "@/app/components/ButtonWithSpinner";
import { AppDispatch } from "@/redux/store";
import { ERROR_MESSAGE } from "@/utils/constants";
import { uploadImages } from "@/utils/dataFetchers";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type UploadAttachmentModalProps = {
  patientRecordId: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const UploadAttachmentModal = (props: UploadAttachmentModalProps) => {
  const { isOpen, setIsOpen, patientRecordId } = props;
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState, getValues, reset } = useForm({
    values: {
      images: [],
    },
  });

  const onSaveImageClick = async () => {
    const { images } = getValues();
    const formData = new FormData();

    formData.append("file", images[0]);
    formData.append("filename", (images[0] as any).name);

    await uploadImages(dispatch, patientRecordId, formData);
    reset();
  };

  return (
    <div>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Upload Attachments</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <input
                type="file"
                accept="image/*"
                {...register("images", {
                  required: ERROR_MESSAGE.REQUIRED,
                  onChange: (e) => {
                    setSelectedImages(e.target.files);
                  },
                })}
              />
              <p className="text-xs text-red-500">
                {formState.errors.images?.message?.toString()}
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {selectedImages &&
                  new Array(selectedImages.length)
                    .fill(null)
                    .map((_, index) => (
                      <Image
                        key={`image-${index}`}
                        alt="not found"
                        width={250}
                        height={250}
                        src={URL.createObjectURL(selectedImages[index])}
                      />
                    ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <ButtonWithSpinner
            isLoading={formState.isSubmitting}
            onClick={handleSubmit(onSaveImageClick)}
          >
            Upload
          </ButtonWithSpinner>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadAttachmentModal;
