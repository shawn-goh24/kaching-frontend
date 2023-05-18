import React from "react";
import { Box, Container, Typography } from "@mui/material";
import NotificationList from "./NotificationList";

export default function Notifications({
  currUser,
  accessToken,
  notifications,
  setNotifications,
}) {
  return (
    <Box sx={{ mx: "75px", width: "100%" }}>
      <Container>
        <Typography variant="h3">Notifications</Typography>
        <NotificationList
          currUser={currUser}
          accessToken={accessToken}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      </Container>
    </Box>
  );
}
