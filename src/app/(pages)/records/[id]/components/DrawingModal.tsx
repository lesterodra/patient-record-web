import DrawingCanvas from "@/app/components/DrawingCanvas";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { fetchDrawings, saveDrawing } from "@/utils/dataFetchers";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

type DrawingModalProps = {
  patientRecordId: number;
};

const DrawingModal = (props: DrawingModalProps) => {
  const { patientRecordId } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { drawingDataUrl } = useAppSelector(
    (state) => state.recordReducer.value
  );
  const dispatch = useDispatch<AppDispatch>();

  const onSaveButtonClick = async () => {
    await saveDrawing(dispatch, {
      patientRecordId,
      dataUrl: drawingDataUrl ?? "",
    });
    await fetchDrawings(dispatch, patientRecordId);
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        color="yellow"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Draw
      </Button>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Draw</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex gap-3 mb-5">
              <DrawingCanvas />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={onSaveButtonClick}>Save</Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DrawingModal;
