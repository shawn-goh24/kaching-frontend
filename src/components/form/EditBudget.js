import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import Select from "react-select";
import { getGroupedCategories } from "../../utils/utils";

// Select field styles
const selectFieldStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default function EditBudget({
  title, // edit or add title
  openModal, // modal visible?
  setOpenModal, // set state of modal
  budgetToEdit, // transaction details
  handleEdit, // handle edits to db
  userCategories, // all categories from user
}) {
  const [selected, setSelected] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const nameRef = useRef();
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

  useEffect(() => {
    if (budgetToEdit && budgetToEdit.Category)
      setSelected(new Set([`${budgetToEdit.Category.name}`]));
  }, [budgetToEdit]);

  const closeHandler = () => {
    setOpenModal(false);
    console.log("closed");
  };

  // let categoryLists;
  // if (userCategories.Categories) {
  //   categoryLists = userCategories.Categories.map((cat) => ({
  //     value: cat.id,
  //     label: cat.name,
  //   }));
  // }

  const handleSelectChange = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeHandler();
    handleEdit(
      budgetToEdit.id,
      selectedCategories.value,
      amountRef.current.value
    );
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={openModal}
      onClose={closeHandler}
      css={{ height: "600px" }}
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Text h1>{title} Transaction</Text>
        </Modal.Header>
        <Modal.Body css={{ height: "430px" }}>
          <Text h4>Category</Text>
          <Select
            required
            styles={selectFieldStyles}
            defaultValue={
              budgetToEdit && budgetToEdit.Category
                ? categoryLists[budgetToEdit.Category.id - 1]
                : ""
            }
            options={groupedOptions}
            onChange={handleSelectChange}
          />
          <Text h4>Amount</Text>
          <Input
            required
            ref={amountRef}
            type="number"
            initialValue={budgetToEdit && budgetToEdit.amount}
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
