import { Card } from "@nextui-org/react";
import React from "react";
import { currencyFormatter } from "../../../utils/utils";
import { Typography } from "@mui/material";

export default function TotalAmountCard({ currUser, text, amount, icon }) {
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
