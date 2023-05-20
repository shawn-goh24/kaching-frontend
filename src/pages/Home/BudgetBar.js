import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Progress } from "@nextui-org/react";
import React from "react";
import { currencyFormatter } from "../../utils/utils";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BudgetBar({
  budget,
  name,
  amount,
  max,
  barPercentage,
  handleEditModal,
  handleDeleteModal,
  userCategories,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "3px",
          }}
        >
          <div style={{ marginRight: 2, fontSize: "18px" }}>
            <Typography>{name}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <Typography
              sx={{ color: `${barPercentage > 100 ? "red" : "black"}` }}
            >
              {currencyFormatter(userCategories.mainCurrency).format(amount)}
            </Typography>
            <span style={{ fontSize: 12, color: "grey", marginLeft: "4px" }}>
              / {currencyFormatter(userCategories.mainCurrency).format(max)}
            </span>
          </div>
        </Box>
        <Progress
          color={barPercentage > 100 ? "error" : "primary"}
          value={barPercentage}
        />
      </Box>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleEditModal(budget);
            handleClose();
          }}
        >
          <EditIcon sx={{ marginRight: "10px" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteModal(budget);
            handleClose();
          }}
          sx={{ color: "red" }}
        >
          <DeleteIcon sx={{ marginRight: "10px" }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}
