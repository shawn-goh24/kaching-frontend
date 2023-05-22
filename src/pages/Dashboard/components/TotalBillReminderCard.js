import { Card } from "@nextui-org/react";
import React from "react";

export default function TotalBillReminderCard({ icon, count }) {
  return (
    <Card>
      <Card.Body>
        {icon}
        {count}
        <br />
        Bills
      </Card.Body>
    </Card>
  );
}
