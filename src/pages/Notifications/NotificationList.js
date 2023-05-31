import React, { useContext, useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { Box } from "@mui/material";
import axios from "axios";
import { Button, Modal, Text } from "@nextui-org/react";
import { AccessTokenContext, CurrUserContext } from "../../App";

export default function NotificationList({ setNotifications }) {
  const [notis, setNotis] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState();

  const currUser = useContext(CurrUserContext);
  const accessToken = useContext(AccessTokenContext);

  useEffect(() => {
    getNotificationsApi();
  }, [accessToken]);

  // get all notification by user
  const getNotificationsApi = async () => {
    if (accessToken) {
      const allNotification = await axios.get(
        `${process.env.REACT_APP_BACKEND}/notification/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotis(allNotification.data);
    }
  };

  // close delete modal
  const closeHandler = () => {
    setDeleteModal(false);
  };
  // open delete modal
  const handleOpenDeleteModal = (noti) => {
    setDeleteModal(true);
    setNotificationToDelete(noti);
  };

  // update notification to read/unread
  const handleReadNotifications = async (isRead, notificationId) => {
    const allNotification = await axios.put(
      `${process.env.REACT_APP_BACKEND}/notification/${currUser.id}/${notificationId}`,
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

  // delete notification
  const handleDeleteNotification = async (notificationId) => {
    const allNotification = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/notification/${currUser.id}/${notificationId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setNotifications(allNotification.data);
    setNotis(allNotification.data);
  };

  // list of notifications components
  const notificationCards = () => {
    if (notis.length > 0) {
      return notis.map((notification) => {
        return (
          <NotificationCard
            key={notification.id}
            notification={notification}
            handleRead={handleReadNotifications}
            handleDeleteModal={handleOpenDeleteModal}
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
              handleDeleteNotification(notificationToDelete.id);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}
