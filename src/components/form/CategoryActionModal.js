import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import Select from "react-select";
import axios from "axios";
import { Colorful } from "@uiw/react-color";
import { Box } from "@mui/material";

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

  // close category modal
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
      setColor(selectedCategory.color);
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

  // handle react-select input
  const handleIncomeExpenseChange = (selectedOption) => {
    setSelectedIncomeExpense(selectedOption);
  };

  // edit category
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditCategory(
      selectedCategory.id,
      nameRef.current.value,
      color,
      selectedIncomeExpense
    );
    closeHandler();
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={categoryModal}
      onClose={closeHandler}
      css={{ height: "700px" }}
    >
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Text h1>Edit Category</Text>
        </Modal.Header>
        <Modal.Body css={{ height: "90%" }}>
          <Text h4>Name</Text>
          <Input
            aria-label="Name"
            required
            ref={nameRef}
            type="text"
            initialValue={selectedCategory && selectedCategory.name}
          />
          <Text h4>Color</Text>
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Box display="flex" flexDirection="column" alignItems="center">
              <div
                style={{
                  height: "48px",
                  width: "48px",
                  backgroundColor: `${color}`,
                  borderRadius: "5px",
                }}
              />
              <Text h5>{color}</Text>
            </Box>
            <Colorful
              disableAlpha={true}
              color={color}
              onChange={(color) => {
                setColor(color.hex);
              }}
            />
          </Box>
          <Text h4>Income/Expense</Text>
          <Select
            required
            value={selectedIncomeExpense}
            options={incomeExpenseList}
            onChange={handleIncomeExpenseChange}
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
