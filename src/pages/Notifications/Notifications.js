import React from "react";
import { Box, Container, Typography } from "@mui/material";
import NotificationList from "./NotificationList";

export default function Notifications({
  currUser,
  accessToken,
  setNotifications,
}) {
  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{ pt: 3 }}>
          Notifications
        </Typography>
        <NotificationList
          currUser={currUser}
          accessToken={accessToken}
          setNotifications={setNotifications}
        />
      </Box>
    </Container>
  );
}
