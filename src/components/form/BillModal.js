import React, { useRef } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { yyyyMmDdConverter } from "../../utils/utils";

export default function BillModal({
  title, // edit or add title
  billModal,
  setBillModal,
  bill,
  handleEdit,
  handleAdd,
}) {
  const nameRef = useRef();
  const dateRef = useRef();

  const closeHandler = () => {
    setBillModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    closeHandler();
    if (title === "Edit") {
      handleEdit(bill.id, nameRef.current.value, dateRef.current.value);
    } else {
      handleAdd(nameRef.current.value, dateRef.current.value);
    }
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={billModal}
      onClose={closeHandler}
      css={{ height: "600px" }}
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Text h1>{title} Bill</Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            required
            ref={nameRef}
            label="Name"
            type="text"
            initialValue={bill && bill.name}
          />
          <Input
            required
            ref={dateRef}
            label="Date"
            type="date"
            initialValue={bill && yyyyMmDdConverter(bill.date)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto light onPress={closeHandler}>
            Close
          </Button>
          <Button auto type="submit">
            Confirm
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
