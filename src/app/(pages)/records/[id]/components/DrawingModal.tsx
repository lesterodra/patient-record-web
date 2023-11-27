import DrawingCanvas from "@/app/components/DrawingCanvas";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const DrawingModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <Button>Save</Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DrawingModal;
