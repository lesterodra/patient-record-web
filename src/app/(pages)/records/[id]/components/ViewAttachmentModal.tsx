import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const ViewAttachmentModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button
        color="green"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        View Attachments
      </Button>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Attachments</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>hello</div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button color="red" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAttachmentModal;
