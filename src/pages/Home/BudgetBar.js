import { Box, LinearProgress, Paper } from "@mui/material";
import React from "react";
import { currencyFormatter } from "../../utils/utils";

export default function BudgetBar({ name, amount, max }) {
  return (
    <Box sx={{ border: "1px solid red" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "3px",
        }}
      >
        <div style={{ marginRight: 2, fontSize: "18px" }}>{name}</div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          {currencyFormatter.format(amount)}
          <span style={{ fontSize: 12, color: "grey", marginLeft: "4px" }}>
            / {currencyFormatter.format(max)}
          </span>
        </div>
      </Box>
      <LinearProgress variant="determinate" value={20} />
    </Box>
  );
}
