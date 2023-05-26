import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { yyyyMmDdConverter, getGroupedCategories } from "../../utils/utils";
import Select from "react-select";

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const nameRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const [groupedOptions, setGroupedOptions] = useState([]);
  const [categoryLists, setCategoryLists] = useState([]);

  useEffect(() => {
    const [groupedOptions, categoryLists] = getGroupedCategories(categories);
    setGroupedOptions(groupedOptions);
    setCategoryLists(categoryLists);
  }, [categories]);

  useEffect(() => {
    if (categoryLists && categoryLists.length > 0 && editTransaction) {
      setSelectedCategories(categoryLists[editTransaction.Category.id - 1]);
    }
  }, [editTransaction]);

  // close transaction modal
  const closeHandler = () => {
    setOpenModal(false);
  };

  // handle category selection on react-select
  const handleSelectChange = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  // edit or add transaction
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Text h1>{title} Transaction</Text>
        </Modal.Header>
        <Modal.Body>
          <Text h4>Name</Text>
          <Input
            aria-label="Transaction Name"
            required
            ref={nameRef}
            type="text"
            initialValue={editTransaction && editTransaction.name}
          />
          <Text h4>Date</Text>
          <Input
            aria-label="Transaction Date"
            required
            ref={dateRef}
            type="date"
            initialValue={
              editTransaction
                ? yyyyMmDdConverter(editTransaction.date)
                : yyyyMmDdConverter(new Date())
            }
          />
          <Text h4>Amount</Text>
          <Input
            aria-label="Transaction Amount"
            required
            ref={amountRef}
            type="number"
            step=".01"
            initialValue={editTransaction && editTransaction.amount}
          />
          <Text h4>Category</Text>
          <Select
            required
            styles={selectFieldStyles}
            defaultValue={
              editTransaction && editTransaction.Category
                ? selectedCategories
                : ""
            }
            options={groupedOptions}
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
