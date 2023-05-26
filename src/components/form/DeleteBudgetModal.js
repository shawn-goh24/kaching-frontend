import { Button, Modal, Text } from "@nextui-org/react";
import React from "react";

export default function DeleteBudgetModal({
  deleteModal,
  openDeleteModal,
  handleDelete,
  budgetToDelete,
}) {
  // close modal
  const closeHandler = () => {
    openDeleteModal(false);
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={deleteModal}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text h1>Delete Transaction</Text>
      </Modal.Header>
      <Modal.Body>
        <Text h2>Are you sure you want to delete?</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto light onPress={closeHandler}>
          Back
        </Button>
        <Button
          auto
          color="warning"
          onPress={() => {
            closeHandler();
            handleDelete(budgetToDelete.id);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
