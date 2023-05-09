import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { yyyyMmDdConverter } from "../../utils/utils";
import CreatableSelect from "react-select/creatable";

// Select field styles
const selectFieldStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default function TransactionModal({
  title, // edit or add title
  openModal, // modal visible?
  setOpenModal, // set state of modal
  editTransaction, // transaction details
  handleEdit, // handle edits to db
  categories, // all categories from user
  handleAddTransaction, // handle add transaction to db
}) {
  const [selected, setSelected] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const nameRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    if (editTransaction && editTransaction.Category)
      setSelected(new Set([`${editTransaction.Category.name}`]));
  }, [editTransaction]);

  // const handler = () => setVisible(true);

  const closeHandler = () => {
    setOpenModal(false);
    console.log("closed");
  };

  let categoryLists;
  if (categories) {
    categoryLists = categories.map((cat) => ({
      // value is what we store
      value: cat.Category.id,
      // label is what we display
      label: cat.Category.name,
    }));
  }

  const handleSelectChange = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={openModal}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text h1>{title} Transaction</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          ref={nameRef}
          label="Name"
          type="text"
          initialValue={editTransaction && editTransaction.name}
        />
        <Input
          ref={dateRef}
          label="Date"
          type="date"
          initialValue={
            editTransaction && yyyyMmDdConverter(editTransaction.date)
          }
        />
        <Input
          ref={amountRef}
          label="Amount"
          type="number"
          initialValue={editTransaction && editTransaction.amount}
        />
        <CreatableSelect
          styles={selectFieldStyles}
          defaultValue={
            editTransaction && editTransaction.Category
              ? categoryLists[editTransaction.Category.id - 1]
              : ""
          }
          options={categoryLists}
          onChange={handleSelectChange}
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
            title === "Edit"
              ? handleEdit(
                  editTransaction.id,
                  dateRef.current.value,
                  nameRef.current.value,
                  amountRef.current.value,
                  selectedCategories.value
                )
              : handleAddTransaction(
                  dateRef.current.value,
                  nameRef.current.value,
                  amountRef.current.value,
                  selectedCategories.value
                );
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
