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

export default function BudgetModal({
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

  const handleSubmit = (e) => {
    e.preventDefault();

    closeHandler();
    handleBudget(
      userCategories.id,
      selectedCategories,
      dateRef.current.value,
      amountRef.current.value
    );
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
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Text h1>{title} Category</Text>
        </Modal.Header>
        <Modal.Body>
          <CreatableSelect
            required
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
            required
            ref={dateRef}
            label="Date"
            type="date"
            initialValue={date && yyyyMmDdConverter(date)}
          />
          <Input
            required
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
          <Button auto type="submit">
            Confirm
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
