import { Box, Container, Tab, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import ProfileSetting from "./ProfileSetting";

export default function Settings({ currUser, accessToken }) {
  const isMdScreen = useMediaQuery("(max-width: 1440px)");
  const [tabValue, setTabValue] = useState("1");

  const handleChange = (e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Container maxWidth={isMdScreen ? "md" : "lg"}>
        <h1>Edit Profile</h1>
        <ProfileSetting currUser={currUser} accessToken={accessToken} />
        <h1>Category Settings</h1>
        <TabContext
          value={tabValue}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Add Category" value="1" />
              <Tab label="Edit Category" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AddCategory currUser={currUser} accessToken={accessToken} />
          </TabPanel>
          <TabPanel value="2">
            <EditCategory currUser={currUser} accessToken={accessToken} />
          </TabPanel>
        </TabContext>
      </Container>
    </Container>
  );
}
