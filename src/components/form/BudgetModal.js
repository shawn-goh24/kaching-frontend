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

export default function CategoryModal({
  title, // edit or add title
  budgetModal,
  setBudgetModal,
  userCategories,
  date,
  handleBudget,
}) {
  const [selected, setSelected] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const nameRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();

  // useEffect(() => {
  //   console.log(userCategories);
  // });

  // useEffect(() => {
  //   if (editTransaction && editTransaction.Category)
  //     setSelected(new Set([`${editTransaction.Category.name}`]));
  // }, [editTransaction]);

  const closeHandler = () => {
    setBudgetModal(false);
  };

  let categoryLists;
  if (userCategories.Categories) {
    categoryLists = userCategories.Categories.map((cat) => ({
      // value is what we store
      value: cat.id,
      // label is what we display
      label: cat.name,
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
      open={budgetModal}
      onClose={closeHandler}
      css={{ height: "600px" }}
    >
      <Modal.Header>
        <Text h1>{title} Category</Text>
      </Modal.Header>
      <Modal.Body>
        <CreatableSelect
          styles={selectFieldStyles}
          defaultValue={
            userCategories && userCategories.Category
              ? categoryLists[userCategories.Category.id - 1]
              : ""
          }
          options={categoryLists}
          onChange={handleSelectChange}
        />
        <Input
          ref={dateRef}
          label="Date"
          type="date"
          initialValue={date && yyyyMmDdConverter(date)}
        />
        <Input
          ref={amountRef}
          label="Amount"
          type="number"
          // initialValue={userCategories && userCategories.amount}
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
            handleBudget(
              userCategories.id,
              selectedCategories.value,
              dateRef.current.value,
              amountRef.current.value
            );
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
