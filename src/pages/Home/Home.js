import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { months } from "../../data/constants.js";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Grid, Tab, Typography, Box, IconButton } from "@mui/material";
import PieChart from "./PieChart.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import BudgetBar from "./BudgetBar.js";
import TransactionCol from "./TransactionCol.js";

import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function Home(props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [date, setDate] = useState(new Date());
  const [value, setValute] = useState("1");
  const [currUser, setCurrUser] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tmpMonth, setTmpMonth] = useState(0);

  // speed dial
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const handleSpeedDialOpen = () => setOpenSpeedDial(true);
  const handleSpeedDialClose = () => setOpenSpeedDial(false);
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);

  // check if screen is md or lower
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  const getUserApi = async () => {
    let token = await getAccessTokenSilently();
    console.log(token);
    // check user
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
    console.log(request.data);
    setAccessToken(token);
    setCurrUser(request.data);
    // get user
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserApi();
    }
  }, [isAuthenticated]);

  const handleChange = (e, newValue) => {
    setValute(newValue);
  };

  const prevMonth = (date) => {
    const tmp = new Date(date);
    let month = tmp.getMonth() - 1;
    let year = tmp.getFullYear();
    if (month < 0) {
      month = 11;
      year = tmp.getFullYear() - 1;
    }
    setDate(new Date(year, month));
  };
  const nextMonth = (date) => {
    const tmp = new Date(date);
    let month = tmp.getMonth() + 1;
    let year = tmp.getFullYear();
    if (month < 0) {
      month = 11;
      year = tmp.getFullYear() + 1;
    }
    setDate(new Date(year, month));
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
        <IconButton sx={{ marginRight: 10 }} onClick={() => prevMonth(date)}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant={isSmallScreen ? "h4" : "h2"}>
          {months[date.getMonth()]} {date.getFullYear()}
        </Typography>
        <IconButton sx={{ marginLeft: 10 }} onClick={() => nextMonth(date)}>
          <NavigateNextIcon />
        </IconButton>
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
      <Grid item xs={12} md={6} sx={{ height: "100%" }}>
        <h2>Transactions</h2>
        <Box sx={{ height: "95%", overflowX: "scroll" }}>
          <TransactionCol
            currUser={currUser}
            accessToken={accessToken}
            openAddTransactionModal={openAddTransactionModal}
            setOpenAddTransactionModal={setOpenAddTransactionModal}
            date={date}
          />
        </Box>
      </Grid>
      <Backdrop open={openSpeedDial} sx={{ zIndex: "999" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={openSpeedDial}
      >
        <SpeedDialAction
          key="addTransaction"
          icon={<ReceiptIcon />}
          tooltipTitle="Add Transaction"
          onClick={() => {
            console.log("Open");
            setOpenAddTransactionModal(true);
            handleSpeedDialClose();
          }}
        />
        {/* <SpeedDialAction
          key="addCategory"
          icon={<FileCopyIcon />}
          tooltipTitle="Add Category"
          onClick={handleSpeedDialClose}
        /> */}
      </SpeedDial>
    </Grid>
  );
}
