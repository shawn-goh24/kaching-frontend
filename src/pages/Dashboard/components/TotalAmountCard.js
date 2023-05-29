import { Card } from "@nextui-org/react";
import React, { useContext } from "react";
import { currencyFormatter } from "../../../utils/utils";
import { Typography } from "@mui/material";
import { CurrUserContext } from "../../../App";

export default function TotalAmountCard({ text, amount, icon }) {
  const currUser = useContext(CurrUserContext);
  return (
    <Card>
      <Card.Body>
        {icon}
        <Typography sx={{ fontWeight: "bold" }}>
          {currencyFormatter(currUser.mainCurrency).format(amount)}
        </Typography>
        <Typography variant="subtitle2" color="grey">
          {text}
        </Typography>
      </Card.Body>
    </Card>
  );
}
