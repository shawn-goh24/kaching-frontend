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

export default function EditTransaction({
  openModal,
  setOpenModal,
  editTransaction,
  handleEdit,
  categories,
}) {
  const [selected, setSelected] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const nameRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
    if (editTransaction.Category)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    closeHandler();
    handleEdit(
      editTransaction.id,
      dateRef.current.value,
      nameRef.current.value,
      amountRef.current.value,
      selectedCategories.value
    );
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={openModal}
      onClose={closeHandler}
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Text h1>Edit Transaction</Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            required
            ref={nameRef}
            label="Name"
            type="text"
            initialValue={editTransaction.name}
          />
          <Input
            required
            ref={dateRef}
            label="Date"
            type="date"
            initialValue={yyyyMmDdConverter(editTransaction.date)}
          />
          <Input
            required
            ref={amountRef}
            label="Amount"
            type="number"
            initialValue={editTransaction.amount}
          />
          <CreatableSelect
            required
            styles={selectFieldStyles}
            defaultValue={
              editTransaction.Category
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
          <Button auto type="submit">
            Confirm
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
