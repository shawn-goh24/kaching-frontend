import { Avatar, Box, IconButton, Snackbar } from "@mui/material";
import { Button, Input, Text } from "@nextui-org/react";
import Select from "react-select";
import { useAuth0 } from "@auth0/auth0-react";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { uploadBytes, getDownloadURL, ref as sRef } from "firebase/storage";
import { storage } from "../../firebase";
import { AccessTokenContext, CurrUserContext } from "../../App";

let cc = require("currency-codes");

const selectFieldStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default function ProfileSetting({ setCurrUser }) {
  const { user } = useAuth0();
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [currency, setCurrency] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);
  const [isGoogleAuth, setIsGoogleAuth] = useState();
  const [selectedProfilePic, setSelectedProfilePic] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  const currUser = useContext(CurrUserContext);
  const accessToken = useContext(AccessTokenContext);

  // set default states
  useEffect(() => {
    if (currUser) {
      setFirstName(currUser.firstName);
      setLastName(currUser.lastName);
      setEmail(currUser.email);
      setCurrency(currUser.mainCurrency);
      findCurrencyId(currUser.mainCurrency);
      setProfileUrl(currUser.imageUrl);
    }
  }, [currUser]);

  // check if user is authenticated from google
  useEffect(() => {
    if (user) {
      setIsGoogleAuth(user.sub.includes("google"));
    }
  }, [user]);

  // handle react-select selection
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
    setSelectedProfilePic("");
    setProfileUrl(currUser.imageUrl);
  };

  // handle edit user profile
  const handleEditUserProfile = async () => {
    if (accessToken) {
      let updatedUser;

      const imageUrl = await handleChangeProfilePic();
      // console.log(imageUrl);
      if (imageUrl) {
        setProfileUrl(imageUrl);
      }

      if (isGoogleAuth) {
        updatedUser = await axios.put(
          `http://localhost:8080/user/edit/${currUser.id}`,
          {
            mainCurrency: currency,
            imageUrl: `${imageUrl ? imageUrl : currUser.imageUrl}`,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        updatedUser = await axios.put(
          `http://localhost:8080/user/edit/${currUser.id}`,
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mainCurrency: currency,
            imageUrl: `${imageUrl ? imageUrl : currUser.imageUrl}`,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      setCurrUser(updatedUser.data);
    }
  };

  // upload avatar and change image
  const uploadAvatar = (event) => {
    const previewImage = URL.createObjectURL(event.target.files[0]);
    setSelectedProfilePic(event.target.files[0]);
    setProfileUrl(previewImage);
    setHasChanged(true);
    // console.log(previewImage);
  };

  const handleChangeProfilePic = () => {
    const storageRef = sRef(storage, `avatar/${email}`);
    return new Promise((resolve, reject) => {
      // If user uploads a new profile image
      // then upload it onto database and get the download url
      if (selectedProfilePic !== "") {
        uploadBytes(storageRef, selectedProfilePic).then((snapshot) => {
          resolve(getDownloadURL(snapshot.ref));
        });
      } else {
        // console.log(false);
        resolve(false);
      }
    });
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

  // console.log("currUser", currUser.imageUrl);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Text h3>First Name:</Text>
          <Input
            aria-label="First Name"
            disabled={user && isGoogleAuth && true}
            placeholder="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setHasChanged(true);
            }}
            css={{ mb: 20 }}
          />
          <Text h3>Last Name:</Text>
          <Input
            aria-label="Last Name"
            disabled={user && isGoogleAuth && true}
            placeholder="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setHasChanged(true);
            }}
            css={{ mb: 20 }}
          />
          <Text h3>Email:</Text>
          <Input
            aria-label="Email"
            disabled={user && isGoogleAuth && true}
            placeholder="Email"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setHasChanged(true);
            }}
            css={{ mb: 20 }}
          />
        </Box>
        <Box sx={{ marginX: "50px" }}>
          <IconButton name="addAvatar" component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={uploadAvatar}
            />
            <Box>
              <Avatar
                src={profileUrl}
                sx={{ width: "135px", height: "135px" }}
              />
              <CameraAltIcon
                sx={{ position: "absolute", right: 12, bottom: 14 }}
              />
            </Box>
          </IconButton>
        </Box>
      </Box>
      <Text h3>Currency:</Text>
      <Select
        aria-label="Currency"
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
            setSnackOpen(true);
            setSelectedProfilePic("");
          }}
        >
          Save Changes
        </Button>
      </Box>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message="Profile settings edited successfully"
        action={snackAction}
      />
    </Box>
  );
}
