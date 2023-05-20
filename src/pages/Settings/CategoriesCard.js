import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

export default function CategoriesCard({
  category,
  setCategories,
  handleOpenCategoryModal,
}) {
  return (
    <>
      <Card
        sx={{
          width: 160,
          m: 1,
        }}
      >
        <CardMedia
          component="img"
          height="10"
          sx={{ backgroundColor: `${category.color}` }}
        />
        <CardContent>
          <Box className="active">
            <Typography gutterBottom variant="h6">
              {category.name}
            </Typography>
            <Chip
              label={category.incomeExpenseId === 1 ? "Expense" : "Income"}
              color={category.incomeExpenseId === 1 ? "warning" : "primary"}
              variant="outlined"
              size="small"
            />
          </Box>
        </CardContent>
        <CardActions>
          <IconButton
            size="small"
            onClick={() => handleOpenCategoryModal(category)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setCategories(category.id, "delete")}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
