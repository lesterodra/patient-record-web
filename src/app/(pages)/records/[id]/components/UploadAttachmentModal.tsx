import { Button, Modal } from "flowbite-react";
import { useState } from "react";

const UploadAttachmentModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  return (
    <div>
      <Button
        color="red"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Upload Attachments
      </Button>
      <Modal show={isOpen} size="4xl" onClose={() => setIsOpen(false)}>
        <Modal.Header>Upload Attachments</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  console.log("image change");
                  setSelectedImages(e.target.files);
                }}
              />
              <div className="flex gap-2 mt-3 flex-wrap">
                {selectedImages &&
                  new Array(selectedImages.length)
                    .fill(null)
                    .map((_, index) => (
                      <img
                        key={`image-${index}`}
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImages[index])}
                      />
                    ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button>Upload</Button>
          <Button color="red" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadAttachmentModal;
