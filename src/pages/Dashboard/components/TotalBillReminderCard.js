import { Typography } from "@mui/material";
import { Card } from "@nextui-org/react";
import React from "react";

export default function TotalBillReminderCard({ icon, count }) {
  return (
    <Card>
      <Card.Body>
        {icon}
        <Typography sx={{ fontWeight: "bold" }}>{count}</Typography>
        <Typography variant="subtitle2" color="grey">
          Bills
        </Typography>
      </Card.Body>
    </Card>
  );
}
