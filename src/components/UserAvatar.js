import { Badge, Dropdown, Text, User } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AccessTokenContext, CurrUserContext } from "../App";

export default function UserAvatar({ setSelectedPage }) {
  const { logout, user } = useAuth0();
  const navigate = useNavigate();
  const [isInvisible, setIsInvisible] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const currUser = useContext(CurrUserContext);
  const accessToken = useContext(AccessTokenContext);

  useEffect(() => {
    getNotificationsApi();
  }, [accessToken]);

  // get notifications from db, and set the badge number based on number of unread notification
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

      let count = 0;
      if (allNotification.data.length > 0) {
        for (let notification of allNotification.data) {
          if (!notification.isRead) {
            count++;
          }
        }
      }
      setBadgeCount(count);

      if (count > 0) {
        setIsInvisible(false);
      } else {
        setIsInvisible(true);
      }
    }
  };

  // navigate to different pages
  const handleEvents = (e) => {
    if (e === "dashboard") {
      navigate("/user/dashboard");
      setSelectedPage("dashboard");
    } else if (e === "settings") {
      navigate("/user/settings");
      setSelectedPage("settings");
    } else if (e === "notification") {
      navigate("/user/notifications");
      setSelectedPage("notifications");
    } else {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  return (
    <Dropdown placement="bottom-left">
      <Badge
        color="error"
        content={badgeCount}
        isInvisible={isInvisible}
        placement="top-left"
      >
        <Dropdown.Trigger>
          <User
            bordered
            as="button"
            size="md"
            src={currUser && currUser.imageUrl && currUser.imageUrl}
            text={
              currUser && currUser.firstName ? currUser.firstName : user.name
            }
            name={
              currUser && currUser.firstName ? currUser.firstName : user.name
            }
          />
        </Dropdown.Trigger>
      </Badge>
      <Dropdown.Menu
        color="primary"
        aria-label="User Actions"
        onAction={handleEvents}
      >
        <Dropdown.Item
          key="profile"
          aria-label="Profile"
          css={{ height: "$18" }}
        >
          <Text b color="inherit" css={{ d: "flex" }}>
            Signed in as
          </Text>
          <Text b color="inherit" css={{ d: "flex" }}>
            {user && user.email}
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="dashboard" aria-label="Dashboard" withDivider>
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item key="notification" aria-label="Notification">
          Notifications
          <span
            style={{
              backgroundColor: "lightgrey",
              padding: "3px",
              borderRadius: "5px",
              marginLeft: "5px",
              display: `${badgeCount === 0 && "none"}`,
            }}
          >
            {badgeCount}
          </span>
        </Dropdown.Item>
        <Dropdown.Item key="settings" aria-label="Settings" withDivider>
          Settings
        </Dropdown.Item>
        <Dropdown.Item key="logout" aria-label="Logout" color="error">
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
