import { Button, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from "react";
import { months } from "../../data/constants.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";

export default function MonthSelection({ date, setDate }) {
  // check if screen is md or lower
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  // change page details to prev/next month
  const handleNextMonth = (date, isNext) => {
    const currentDate = new Date(date);
    let month;
    isNext
      ? (month = currentDate.getMonth() + 1)
      : (month = currentDate.getMonth() - 1);
    let year = currentDate.getFullYear();
    if (month < 0) {
      month = 11;
      isNext
        ? (year = currentDate.getFullYear() + 1)
        : (year = currentDate.getFullYear() - 1);
    }
    setDate(new Date(year, month));
  };

  const currentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    setDate(new Date(year, month));
  };

  return (
    <>
      <IconButton
        sx={{ marginRight: 10 }}
        onClick={() => handleNextMonth(date, false)}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        {months[date.getMonth()]} {date.getFullYear()}
      </Typography>
      <IconButton
        sx={{ marginLeft: 10 }}
        onClick={() => handleNextMonth(date, true)}
      >
        <NavigateNextIcon />
      </IconButton>
      <Button
        sx={{ position: "absolute", right: "10%" }}
        onClick={currentMonth}
      >
        Today
      </Button>
    </>
  );
}
