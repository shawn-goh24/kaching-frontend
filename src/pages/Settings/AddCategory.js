import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Button, Input, Text } from "@nextui-org/react";
import { MuiColorInput } from "mui-color-input";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

export default function AddCategory({ currUser, accessToken }) {
  const [newCatName, setNewCatName] = useState("");
  const [color, setColor] = useState(
    Math.floor(Math.random() * 16777215).toString(16)
  );
  const [selectedIncomeExpense, setSelectedIncomeExpense] = useState([]);
  const [incomeExpenseList, setIncomeExpenseList] = useState([]);

  useEffect(() => {
    if (accessToken) {
      getIncomeExpenseApi();
    }
  }, [accessToken]);

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

  // reset inputs
  const handleClearCategory = () => {
    setNewCatName("");
    setColor(Math.floor(Math.random() * 16777215).toString(16));
    setSelectedIncomeExpense([]);
  };

  // add new category into database
  const handleAddCategory = async () => {
    const newCat = await axios.post(
      "http://localhost:8080/category/new",
      {
        name: newCatName,
        color: `#${color}`,
        incomeExpenseId: selectedIncomeExpense.value,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(newCat.data);

    const newUserCat = await axios.post(
      "http://localhost:8080/category/add",
      {
        userId: currUser.id,
        categoryId: newCat.data.id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    handleClearCategory();
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
    <Box>
      <Box>
        <Text h3>Category Name:</Text>
        <Input
          value={newCatName}
          fullWidth
          placeholder="Insert Category"
          onChange={(e) => setNewCatName(e.target.value)}
        />
        <Text h3>Color:</Text>
        <MuiColorInput format="hex" value={color} onChange={handleColor} />
        <Text h3>Income or Expense:</Text>
        {/* <Box width="225px"> */}
        <CreatableSelect
          value={selectedIncomeExpense}
          options={incomeExpenseList}
          onChange={handleIncomeExpenseChange}
        />
        {/* </Box> */}
      </Box>
      <Box display="flex" justifyContent="flex-end" marginTop={7}>
        <Button light onPress={handleClearCategory}>
          Clear
        </Button>
        <Button flat onPress={handleAddCategory}>
          Add new category
        </Button>
      </Box>
    </Box>
  );
}
