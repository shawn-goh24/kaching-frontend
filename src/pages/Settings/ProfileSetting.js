import { Box } from "@mui/material";
import { Button, Input, Text } from "@nextui-org/react";
import Select from "react-select";

import React, { useEffect, useState } from "react";
import axios from "axios";

let cc = require("currency-codes");

const selectFieldStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default function ProfileSetting({ currUser, accessToken }) {
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (currUser) {
      setFirstName(currUser.firstName);
      setLastName(currUser.lastName);
      setEmail(currUser.email);
      setCurrency(currUser.mainCurrency);
      findCurrencyId(currUser.mainCurrency);
    }
  }, [currUser]);

  const handleSelectChange = (selectedOption) => {
    setCurrency(selectedOption.label);
    setSelectedCurrency(selectedOption);
    setHasChanged(true);
  };

  // get currency id number
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

  // handle reset upon discard
  const handleDiscard = () => {
    setFirstName(currUser.firstName);
    setLastName(currUser.lastName);
    setEmail(currUser.email);
    setCurrency(currUser.mainCurrency);
    findCurrencyId(currUser.mainCurrency);
    setHasChanged(false);
  };

  // handle edit user profile
  const handleEditUserProfile = async () => {
    if (accessToken) {
      await axios.put(
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

  return (
    <Box>
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
            handleEditUserProfile();
            setHasChanged(false);
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
