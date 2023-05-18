import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { Box } from "@mui/material";
import axios from "axios";

export default function NotificationList({
  currUser,
  accessToken,
  notifications,
  setNotifications,
}) {
  const handleRead = async (isRead, notificationId) => {
    const allNotification = await axios.put(
      `http://localhost:8080/notification/${currUser.id}/${notificationId}`,
      {
        isRead: isRead,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setNotifications(allNotification.data);
    console.log(allNotification.data);
  };

  const notificationCards = () => {
    if (notifications.length > 0) {
      return notifications.map((notification) => {
        return (
          <NotificationCard
            key={notification.id}
            notification={notification}
            handleRead={handleRead}
          />
        );
      });
    }
  };

  return <Box>{notificationCards()}</Box>;
}
