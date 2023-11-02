import { Button, Modal } from "flowbite-react";

const ConfirmationDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  return (
    <Modal show={isOpen} size="sm" onClose={() => setIsOpen(false)}>
      <Modal.Header>Confirmation!</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>Are you sure you want to delete?</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={() => {}}>Yes</Button>
        <Button color="red" onClick={() => setIsOpen(false)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
