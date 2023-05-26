import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Avatar, Badge, Text } from "@nextui-org/react";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";

export default function NewSideBar({
  currUser,
  notifications,
  selectedPage,
  setSelectedPage,
}) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [isInvisible, setIsInvisible] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
    setSelectedPage("home");
  };
  const goToSettings = () => {
    navigate("/user/settings");
    setSelectedPage("settings");
  };
  const goToDashboard = () => {
    navigate("/user/dashboard");
    setSelectedPage("dashboard");
  };
  const goToNotification = () => {
    navigate("/user/notifications");
    setSelectedPage("notifications");
  };

  // get all user's notification from db
  const getNotificationsApi = () => {
    if (notifications) {
      let count = 0;
      if (notifications.length > 0) {
        for (let notification of notifications) {
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
  }, [notifications]);

  const Menus = [
    {
      title: "Home",
      action: goToHome,
      icon: <HomeIcon fontSize="large" />,
      hovered: "home",
    },
    {
      title: "Dashboard",
      action: goToDashboard,
      icon: <DashboardIcon fontSize="large" />,
      hovered: "dashboard",
    },
    {
      title: "Notifications",
      action: goToNotification,
      icon: <EmailIcon fontSize="large" />,
      hovered: "notifications",
    },
    {
      title: "Settings",
      action: goToSettings,
      icon: <SettingsIcon fontSize="large" />,
      hovered: "settings",
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          height: "100vh",
          width: `${sideBarOpen ? "300px" : "50px"}`,
          backgroundColor: "#202A44",
          position: "relative",
          transitionDuration: "200ms",
          padding: "20px",
          paddingTop: "30px",
        }}
      >
        <ChevronLeftIcon
          sx={{
            position: "absolute",
            color: "black",
            border: "2px solid #202A44",
            background: "white",
            right: "-12px",
            top: "43px",
            cursor: "pointer",
            borderRadius: "100%",
            transform: `${sideBarOpen && "rotate(180deg)"}`,
          }}
          onClick={() => setSideBarOpen((prevState) => !prevState)}
        />
        <div
          style={{
            display: "flex",
            columnGap: "16px",
            alignItems: "center",
            marginBottom: "58px",
          }}
        >
          <Avatar
            src={currUser && currUser.imageUrl}
            text={currUser.firstName}
            bordered
            size="lg"
          />
          <Text
            h3
            css={{
              color: "white",
              transitionDuration: "300ms",
              transform: `${!sideBarOpen && "scale(0)"}`,
            }}
          >
            {currUser.firstName}
          </Text>
        </div>
        <div>
          {Menus.map((menu, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                  marginTop: "20px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#587EDE",
                    color: "lightgray",
                    borderRadius: "15px",
                    ".menu-text": {
                      color: "lightgray",
                    },
                    ".menu-icon": {
                      color: "lightgray",
                    },
                  },
                }}
                onClick={menu.action}
              >
                <Badge
                  color="error"
                  content={badgeCount}
                  isInvisible={
                    menu.title === "Notifications" ? isInvisible : true
                  }
                  placement="bottom-right"
                >
                  <Tooltip title={menu.title} placement="right">
                    <IconButton
                      className="menu-icon"
                      onClick={menu.action}
                      sx={{
                        color: `${
                          selectedPage === menu.hovered
                            ? "#587EDE"
                            : "lightgrey"
                        }`,
                      }}
                    >
                      {menu.icon}
                    </IconButton>
                  </Tooltip>
                </Badge>
                <Text
                  className="menu-text"
                  h3
                  css={{
                    color: "white",
                    transitionDuration: "300ms",
                    transform: `${!sideBarOpen && "scale(0)"}`,
                    color: `${
                      selectedPage === menu.hovered ? "#587EDE" : "lightgrey"
                    }`,
                  }}
                >
                  {menu.title}
                </Text>
              </Box>
            );
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
