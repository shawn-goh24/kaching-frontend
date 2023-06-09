import React from "react";
import { Box, Container, Typography } from "@mui/material";
import NotificationList from "./NotificationList";

export default function Notifications({ setNotifications }) {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Box>
        <Typography variant="h3" sx={{ pt: 3 }}>
          Notifications
        </Typography>
        <NotificationList setNotifications={setNotifications} />
      </Box>
    </Container>
  );
}
