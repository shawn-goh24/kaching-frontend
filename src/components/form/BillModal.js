import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { yyyyMmDdConverter } from "../../utils/utils";
import CreatableSelect from "react-select/creatable";

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

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={billModal}
      onClose={closeHandler}
      css={{ height: "600px" }}
    >
      <Modal.Header>
        <Text h1>{title} Bill</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          ref={nameRef}
          label="Name"
          type="text"
          initialValue={bill && bill.name}
        />
        <Input
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
        <Button
          auto
          onPress={() => {
            closeHandler();
            if (title === "Edit") {
              handleEdit(bill.id, nameRef.current.value, dateRef.current.value);
            } else {
              handleAdd(nameRef.current.value, dateRef.current.value);
            }
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
