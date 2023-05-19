import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MarkunreadIcon from "@mui/icons-material/Markunread";

export default function NotificationCard({
  notification,
  handleRead,
  handleDelete,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        paddingX: "10px",
        backgroundColor: `${notification.isRead && "#D9D9D9"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "50px",
        transition: "all .2s ease-in-out",
        "&:hover": {
          ".date": {
            display: "none",
          },
          ".action": {
            display: "flex",
          },
          transform: "scale(1.01)",
        },
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "250px",
            fontWeight: `${!notification.isRead && "bold"}`,
          }}
        >
          {notification.title}
        </Box>
        <Box sx={{ fontWeight: `${!notification.isRead && "bold"}` }}>
          {notification.description}
        </Box>
      </Box>
      <Box className="date" sx={{ display: "flex" }}>
        <Typography variant="subtitle2">
          {new Date(notification.date).toLocaleDateString()}
        </Typography>
      </Box>
      <Box className="action" sx={{ display: "none" }}>
        <IconButton
          sx={{ mx: "5px" }}
          onClick={() => handleDelete(notification.id)}
        >
          <DeleteForeverIcon />
        </IconButton>
        <IconButton
          onClick={() => handleRead(!notification.isRead, notification.id)}
        >
          <MarkunreadIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
