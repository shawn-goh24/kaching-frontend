import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { getGroupedCategories, yyyyMmDdConverter } from "../../utils/utils";
import Select from "react-select";

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dateRef = useRef();
  const amountRef = useRef();
  const [groupedOptions, setGroupedOptions] = useState([]);
  const [categoryLists, setCategoryLists] = useState([]);

  useEffect(() => {
    const [groupedOptions, categoryLists] =
      getGroupedCategories(userCategories);
    setGroupedOptions(groupedOptions);
    setCategoryLists(categoryLists);
  }, [userCategories]);

  const closeHandler = () => {
    setBudgetModal(false);
  };

  // let categoryLists;
  // if (userCategories.Categories) {
  //   categoryLists = userCategories.Categories.map((cat) => ({
  //     value: cat.id,
  //     label: cat.name,
  //   }));
  // }
  // let expenseCategories;
  // if (userCategories.Categories) {
  //   expenseCategories = userCategories.Categories.map(
  //     (cat) =>
  //       cat.incomeExpenseId === 1 && {
  //         value: cat.id,
  //         label: cat.name,
  //       }
  //   ).filter((cat) => cat !== false);
  // }
  // let incomeCategories;
  // if (userCategories.Categories) {
  //   incomeCategories = userCategories.Categories.map(
  //     (cat) =>
  //       cat.incomeExpenseId === 2 && {
  //         value: cat.id,
  //         label: cat.name,
  //       }
  //   ).filter((cat) => cat !== false);
  // }
  // let groupedOptions;
  // if (userCategories.Categories) {
  //   groupedOptions = [
  //     {
  //       label: "Expense",
  //       options: expenseCategories,
  //     },
  //     {
  //       label: "Income",
  //       options: incomeCategories,
  //     },
  //   ];
  // }

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
            required
            ref={dateRef}
            type="date"
            initialValue={date && yyyyMmDdConverter(date)}
          />
          <Text h4>Amount</Text>
          <Input required ref={amountRef} type="number" />
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
