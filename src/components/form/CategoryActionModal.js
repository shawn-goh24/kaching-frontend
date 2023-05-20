import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import { yyyyMmDdConverter } from "../../utils/utils";
import Select from "react-select";
import { MuiColorInput } from "mui-color-input";
import axios from "axios";

export default function CategoryActionModal({
  categoryModal,
  setCategoryModal,
  selectedCategory,
  accessToken,
  handleEditCategory,
}) {
  const [selectedIncomeExpense, setSelectedIncomeExpense] = useState([]);
  const [incomeExpenseList, setIncomeExpenseList] = useState([]);
  const [color, setColor] = useState();
  const nameRef = useRef();

  const closeHandler = () => {
    setCategoryModal(false);
  };

  useEffect(() => {
    if (accessToken) {
      getIncomeExpenseApi();
    }
  }, [accessToken]);

  useEffect(() => {
    if (selectedCategory) {
      setColor(selectedCategory.color.substring(1));
      setSelectedIncomeExpense(
        incomeExpenseList[selectedCategory.incomeExpenseId - 1]
      );
    }
  }, [selectedCategory]);

  // get income expense table from database
  const getIncomeExpenseApi = async () => {
    if (accessToken) {
      const response = await axios.get("http://localhost:8080/incomeexpense", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const list = response.data.map((data) => ({
        value: data.id,
        label: data.name,
      }));

      setIncomeExpenseList(list);
    }
  };

  // handle color input
  const handleColor = (color) => {
    setColor(color);
  };

  // handle react-select input
  const handleIncomeExpenseChange = (selectedOption) => {
    setSelectedIncomeExpense(selectedOption);
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={categoryModal}
      onClose={closeHandler}
      css={{ height: "600px" }}
    >
      <Modal.Header>
        <Text h1>Edit Category</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          ref={nameRef}
          label="Name"
          type="text"
          initialValue={selectedCategory && selectedCategory.name}
        />
        <MuiColorInput format="hex" value={color} onChange={handleColor} />
        <Select
          value={selectedIncomeExpense}
          options={incomeExpenseList}
          onChange={handleIncomeExpenseChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto light onPress={closeHandler}>
          Close
        </Button>
        <Button
          auto
          onPress={() => {
            handleEditCategory(
              selectedCategory.id,
              nameRef.current.value,
              color,
              selectedIncomeExpense
            );
            closeHandler();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
