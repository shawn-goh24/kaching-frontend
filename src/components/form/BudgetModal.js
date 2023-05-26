import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { getGroupedCategories, yyyyMmDdConverter } from "../../utils/utils";
import Select from "react-select";

// Select field styles for react-select
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dateRef = useRef();
  const amountRef = useRef();
  const [groupedOptions, setGroupedOptions] = useState([]);
  const [categoryLists, setCategoryLists] = useState([]);

  useEffect(() => {
    const [groupedOptions, categoryLists] =
      getGroupedCategories(userCategories);
    // grouped categories
    setGroupedOptions(groupedOptions);
    // list of categories
    setCategoryLists(categoryLists);
  }, [userCategories]);

  // close budget modal
  const closeHandler = () => {
    setBudgetModal(false);
  };

  // handle category select change on react-select
  const handleSelectChange = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  // add budget
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
        <Modal.Body css={{ height: "430px" }}>
          <Text h4>Category</Text>
          <Select
            required
            styles={selectFieldStyles}
            defaultValue={
              userCategories && userCategories.Category
                ? categoryLists[userCategories.Category.id - 1]
                : ""
            }
            options={groupedOptions}
            onChange={handleSelectChange}
          />
          <Text h4>Date</Text>
          <Input
            aria-label="Budget Date"
            required
            ref={dateRef}
            type="date"
            initialValue={date && yyyyMmDdConverter(date)}
          />
          <Text h4>Amount</Text>
          <Input
            aria-label="Budget amount"
            required
            ref={amountRef}
            type="number"
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
