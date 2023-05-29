import React, { useEffect, useState } from "react";
import { Box, IconButton, Snackbar } from "@mui/material";
import { Button, Input, Text } from "@nextui-org/react";
import { MuiColorInput } from "mui-color-input";
import Select from "react-select";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

export default function AddCategory({ currUser, accessToken }) {
  const [newCatName, setNewCatName] = useState("");
  const [color, setColor] = useState(
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );
  const [selectedIncomeExpense, setSelectedIncomeExpense] = useState([]);
  const [incomeExpenseList, setIncomeExpenseList] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

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
    setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    setSelectedIncomeExpense([]);
  };

  // add new category into database
  const handleAddCategory = async () => {
    const newCat = await axios.post(
      "http://localhost:8080/category/new",
      {
        name: newCatName,
        color: `${color}`,
        incomeExpenseId: selectedIncomeExpense.value,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // add to userCategory table
    await axios.post(
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
    setSnackOpen(true);
  };

  // handle color input
  const handleColor = (color) => {
    console.log(color);
    setColor(color);
  };

  // handle react-select input
  const handleIncomeExpenseChange = (selectedOption) => {
    setSelectedIncomeExpense(selectedOption);
  };

  // handle submit of new category form
  const handleSubmit = (e) => {
    e.preventDefault();

    handleAddCategory();
  };

  // close snackbar
  const handleCloseSnack = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  // snackbar actions
  const snackAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box>
          <Text h3>Category Name:</Text>
          <Input
            aria-label="Category Name"
            required
            value={newCatName}
            fullWidth
            placeholder="Insert Category"
            onChange={(e) => setNewCatName(e.target.value)}
            css={{ mb: 20 }}
          />
          <Text h3>Color:</Text>
          <MuiColorInput
            aria-label="Color"
            required
            format="hex"
            value={color}
            onChange={handleColor}
          />
          <Text h3 css={{ mt: 20 }}>
            Income or Expense:
          </Text>
          <Select
            aria-label="Income Expense"
            required
            value={selectedIncomeExpense}
            options={incomeExpenseList}
            onChange={handleIncomeExpenseChange}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" marginTop={7}>
          <Button light onPress={handleClearCategory}>
            Clear
          </Button>
          <Button flat type="submit">
            Add new category
          </Button>
        </Box>
      </form>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message="New category added"
        action={snackAction}
      />
    </Box>
  );
}
