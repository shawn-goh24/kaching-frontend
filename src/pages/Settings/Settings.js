import { Box, Container, useMediaQuery } from "@mui/material";
import { Button, Input, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { MuiColorInput } from "mui-color-input";
import axios from "axios";

let cc = require("currency-codes");

const selectFieldStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default function Settings({ currUser, accessToken }) {
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("");
  const [countryList, setCountryList] = useState([]);
  const isMdScreen = useMediaQuery("(max-width: 1440px)");
  const [hasChanged, setHasChanged] = useState(false);
  const [color, setColor] = React.useState(
    Math.floor(Math.random() * 16777215).toString(16)
  );

  const [incomeExpenseList, setIncomeExpenseList] = useState([]);
  const [selectedIncomeExpense, setSelectedIncomeExpense] = useState([]);
  const [newCatName, setNewCatName] = useState("");

  const handleSelectChange = (selectedOption) => {
    setCurrency(selectedOption.label);
    setSelectedCurrency(selectedOption);
    setHasChanged(true);
  };
  const handleIncomeExpenseChange = (selectedOption) => {
    setSelectedIncomeExpense(selectedOption);
  };

  const handleColor = (color) => {
    setColor(color);
  };

  useEffect(() => {
    if (currUser) {
      getIncomeExpenseApi();
      setFirstName(currUser.firstName);
      setLastName(currUser.lastName);
      setEmail(currUser.email);
      setCurrency(currUser.mainCurrency);
      findCurrencyId(currUser.mainCurrency);
    }
  }, [currUser]);

  useEffect(() => {
    if (accessToken) {
      getIncomeExpenseApi();
    }
  }, [accessToken]);

  const findCurrencyId = (currencyCode) => {
    if (cc.codes()) {
      const list = cc.codes().map((country, index) => ({
        value: index,
        label: country,
      }));
      const desiredObject = list.find((obj) => obj.label === currencyCode);
      setCountryList(list);
      setCurrency(desiredObject.label);
      setSelectedCurrency(desiredObject);
      return desiredObject.value;
    }
  };

  const handleDiscard = () => {
    setFirstName(currUser.firstName);
    setLastName(currUser.lastName);
    setEmail(currUser.email);
    setCurrency(currUser.mainCurrency);
    findCurrencyId(currUser.mainCurrency);
    setHasChanged(false);
  };

  const handleChangeUserProfile = async () => {
    if (accessToken) {
      const updatedUser = await axios.put(
        `http://localhost:8080/user/edit/${currUser.id}`,
        {
          mainCurrency: currency,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
  };

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

  const handleAddCategory = async () => {
    alert("handle add cat");
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

  const handleClearCategory = () => {
    setNewCatName("");
    setColor(Math.floor(Math.random() * 16777215).toString(16));
    setSelectedIncomeExpense([]);
  };

  return (
    <Box marginLeft="75px" width="100%">
      <Container maxWidth={isMdScreen ? "md" : "lg"}>
        <h1>Edit Profile</h1>
        <Text h3>First Name:</Text>
        <Input
          disabled
          placeholder="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setHasChanged(true);
          }}
        />
        <Text h3>Last Name:</Text>
        <Input
          disabled
          placeholder="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setHasChanged(true);
          }}
        />
        <Text h3>Email:</Text>
        <Input
          disabled
          placeholder="Email"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setHasChanged(true);
          }}
        />
        <Text h3>Currency:</Text>
        <Select
          styles={selectFieldStyles}
          value={selectedCurrency}
          options={countryList}
          onChange={handleSelectChange}
        />
        <Box
          display="flex"
          justifyContent="flex-end"
          marginTop={7}
          sx={{ visibility: `${hasChanged ? "visible" : "hidden"}` }}
        >
          <Button light onPress={handleDiscard}>
            Discard
          </Button>
          <Button
            flat
            onPress={() => {
              handleChangeUserProfile();
              setHasChanged(false);
            }}
          >
            Save Changes
          </Button>
        </Box>
        <h1>Add new Category</h1>
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
          <CreatableSelect
            value={selectedIncomeExpense}
            options={incomeExpenseList}
            onChange={handleIncomeExpenseChange}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" marginTop={7}>
          <Button light onPress={handleClearCategory}>
            Clear
          </Button>
          <Button flat onPress={handleAddCategory}>
            Add new category
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
