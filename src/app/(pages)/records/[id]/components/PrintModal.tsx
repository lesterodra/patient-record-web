import { Button, Modal, Tabs } from "flowbite-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Sample from "./print/Sample";

type PrintModalProps = {
  patientRecordId: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const PrintModal = (props: PrintModalProps) => {
  const { isOpen, setIsOpen, patientRecordId } = props;
  const sampleRef = useRef(null);

  const samplePrint = useReactToPrint({
    content: () => sampleRef.current,
  });

  return (
    <div>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Print</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Tabs.Group aria-label="Tabs with underline" style="underline">
              <Tabs.Item active title="Profile">
                <Button onClick={samplePrint}>Print</Button>
                <div className="invisible absolute">
                  <div ref={sampleRef}>
                    <Sample />
                    <div className="break-before-page">page 2</div>
                  </div>
                </div>
              </Tabs.Item>
            </Tabs.Group>
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

export default PrintModal;
