import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { months } from "../../data/constants.js";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Grid, Tab, Typography, Box } from "@mui/material";
import PieChart from "./PieChart.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import BudgetBar from "./BudgetBar.js";

export default function Home(props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [date, setDate] = useState(new Date());
  const [value, setValute] = useState("1");

  // check if screen is md or lower
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  const userApi = async () => {
    let token = await getAccessTokenSilently();
    let request = await axios.post(
      "http://localhost:8080/user/home",
      {
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(request);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // console.log(user);
      userApi();
    }
  }, [isAuthenticated]);

  const handleChange = (e, newValue) => {
    setValute(newValue);
  };

  return (
    <Grid
      container
      rowGap={5}
      columnGap={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          border: "1px solid red",
        }}
      >
        <NavigateBeforeIcon sx={{ marginRight: 10 }} />
        <Typography variant={isSmallScreen ? "h4" : "h2"}>
          {months[date.getMonth()]} {date.getFullYear()}
        </Typography>
        <NavigateNextIcon sx={{ marginLeft: 10 }} />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{ border: "1px solid red", height: "100%" }}
      >
        <TabContext
          value={value}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Expense" value="1" />
              <Tab label="Income" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <PieChart />
            <BudgetBar name="Food" amount={200} max={1000} />
          </TabPanel>
          <TabPanel value="2">
            <PieChart />
          </TabPanel>
        </TabContext>
      </Grid>
      <Grid item xs={12} md={6} sx={{ border: "1px solid red" }}>
        Right box
      </Grid>
    </Grid>
  );
}
