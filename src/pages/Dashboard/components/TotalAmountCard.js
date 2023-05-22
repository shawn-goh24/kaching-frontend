import { Card } from "@nextui-org/react";
import React from "react";
import { currencyFormatter } from "../../../utils/utils";

export default function TotalAmountCard({ currUser, text, amount, icon }) {
  return (
    <Card>
      <Card.Body>
        {icon}
        {currencyFormatter(currUser.mainCurrency).format(amount)} <br />
        {text}
      </Card.Body>
    </Card>
  );
}
