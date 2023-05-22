import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { Box } from "@mui/material";
import axios from "axios";
import { Button, Modal, Text } from "@nextui-org/react";

export default function NotificationList({
  currUser,
  accessToken,
  notifications,
  setNotifications,
}) {
  const [notis, setNotis] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState();

  const closeHandler = () => {
    setDeleteModal(false);
  };
  const handleDeleteModal = (noti) => {
    setDeleteModal(true);
    setNotificationToDelete(noti);
  };

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
            handleDeleteModal={handleDeleteModal}
          />
        );
      });
    }
  };

  return (
    <Box>
      {notis && notificationCards()}
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={deleteModal}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text h1>Delete Notification</Text>
        </Modal.Header>
        <Modal.Body>
          <Text h2>Are you sure you want to delete?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto light onPress={closeHandler}>
            Back
          </Button>
          <Button
            auto
            color="warning"
            onPress={() => {
              closeHandler();
              handleDelete(notificationToDelete.id);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}
