import React from "react";
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { currencyFormatter } from "../../utils/utils";
import "./transactioncard.css";

export default function TransactionCard({
  transaction,
  openTransactionModal,
  openDeleteModal,
  currUser,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // close moreicon menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // category tags
  const tag = () => {
    if (transaction.Category) {
      return (
        <Chip
          variant="outlined"
          size="small"
          label={transaction.Category.name}
          sx={{
            marginLeft: "15px",
            color: `${transaction.Category.color}`,
            borderColor: `${transaction.Category.color}`,
          }}
        />
      );
    }
  };

  return (
    <>
      <Paper className="transaction-card">
        <div className="flex">
          <div
            style={{
              height: "60px",
              width: "3px",
              backgroundColor: `${
                transaction.Category
                  ? transaction.Category.color
                  : "argb(0,0,0,0)"
              }`,
            }}
          />
          <div
            className="vertical-center flex-direction-column"
            style={{
              marginLeft: "12px",
            }}
          >
            <div className="horizontal-center">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {transaction.name}
              </Typography>
              {tag()}
            </div>
            <Typography variant="caption">
              {new Date(transaction.date).toLocaleDateString()}
            </Typography>
          </div>
        </div>
        <div className="horizontal-center">
          <Box>
            {transaction.Category.incomeExpenseId === 1 ? (
              <Typography color="error">
                -{" "}
                {currencyFormatter(currUser.mainCurrency).format(
                  transaction.amount
                )}
              </Typography>
            ) : (
              <Typography color="primary">
                {currencyFormatter(currUser.mainCurrency).format(
                  transaction.amount
                )}
              </Typography>
            )}
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
        </div>
      </Paper>
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
            openTransactionModal(transaction);
            handleClose();
          }}
        >
          <EditIcon sx={{ marginRight: "10px" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            openDeleteModal(transaction);
            handleClose();
          }}
          sx={{ color: "red" }}
        >
          <DeleteIcon sx={{ marginRight: "10px" }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
