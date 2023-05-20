import { Box, Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export default function AddCategoryFab({ setOpenAddTransactionModal }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 62,
        right: 62,
        zIndex: 1,
      }}
    >
      <Tooltip title="Add Transaction" placement="top-start">
        <Fab
          onClick={() => {
            setOpenAddTransactionModal(true);
          }}
          color="secondary"
          aria-label="Add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}
