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
  const [notis, setNotis] = useState();

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
    setNotis(allNotification.data);
  };

  const handleDelete = async (notificationId) => {
    const allNotification = await axios.delete(
      `http://localhost:8080/notification/${currUser.id}/${notificationId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setNotifications(allNotification.data);
    setNotis(allNotification.data);
  };

  const getNotificationsApi = async () => {
    if (accessToken) {
      const allNotification = await axios.get(
        `http://localhost:8080/notification/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotis(allNotification.data);
    }
  };

  useEffect(() => {
    getNotificationsApi();
  }, [accessToken]);

  const notificationCards = () => {
    if (notis.length > 0) {
      return notis.map((notification) => {
        return (
          <NotificationCard
            key={notification.id}
            notification={notification}
            handleRead={handleRead}
            handleDelete={handleDelete}
          />
        );
      });
    }
  };

  return <Box>{notis && notificationCards()}</Box>;
}
