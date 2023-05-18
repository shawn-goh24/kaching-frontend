import { Badge, Dropdown, Text, User } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserAvatar({ currUser, accessToken }) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const [isInvisible, setIsInvisible] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const handleEvents = (e) => {
    if (e === "dashboard") {
      navigate("/user/dashboard");
    } else if (e === "settings") {
      navigate("/user/settings");
    } else if (e === "notification") {
      navigate("/user/notifications");
    } else {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  const [notifications, setNotifications] = useState([]);

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
      setNotifications(allNotification.data);

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

  useEffect(() => {
    getNotificationsApi();
  }, [accessToken]);

  return (
    <Dropdown placement="bottom-left">
      <Badge
        color="error"
        content={notifications && badgeCount}
        isInvisible={notifications && isInvisible}
        placement="top-left"
      >
        <Dropdown.Trigger>
          <User
            bordered
            as="button"
            size="md"
            color="primary"
            name={user && user.name}
            src={user && user.picture}
          />
        </Dropdown.Trigger>
      </Badge>
      <Dropdown.Menu
        color="primary"
        aria-label="User Actions"
        onAction={handleEvents}
      >
        <Dropdown.Item key="profile" css={{ height: "$18" }}>
          <Text b color="inherit" css={{ d: "flex" }}>
            Signed in as
          </Text>
          <Text b color="inherit" css={{ d: "flex" }}>
            {user && user.email}
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="dashboard" withDivider>
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item key="notification">
          Notifications{" "}
          <span
            style={{
              backgroundColor: "lightgrey",
              padding: "3px",
              borderRadius: "5px",
              display: `${badgeCount === 0 && "none"}`,
            }}
          >
            {notifications && badgeCount}
          </span>
        </Dropdown.Item>
        <Dropdown.Item key="settings" withDivider>
          Settings
        </Dropdown.Item>
        <Dropdown.Item key="logout" color="error">
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
