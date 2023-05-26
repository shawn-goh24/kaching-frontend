import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import useMediaQuery from "../../hooks/useMediaQuery";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Avatar, Badge, Button, Text } from "@nextui-org/react";
import { Outlet, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

export default function SideBar({
  currUser,
  notifications,
  selectedPage,
  setSelectedPage,
}) {
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "75px",
          display: `${isDrawerOpen ? "none" : "flex"}`,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#202A44",
          position: "fixed",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mt={2}>
            <Avatar
              src={currUser && currUser.imageUrl}
              text={currUser.firstName}
              bordered
              size="lg"
              css={{ marginBottom: 10 }}
            />
            <Divider />
          </Box>
          <Tooltip title="Home" placement="right">
            <IconButton
              onClick={goToHome}
              sx={{
                color: "lightgrey",
                "&:hover": {
                  backgroundColor: "#587EDE",
                  color: "lightgray",
                },
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dashboard" placement="right">
            <IconButton
              onClick={goToDashboard}
              sx={{
                color: `${
                  selectedPage === "dashboard" ? "#587EDE" : "lightgrey"
                }`,
                "&:hover": {
                  backgroundColor: "#587EDE",
                  color: "lightgray",
                },
              }}
            >
              <DashboardIcon />
            </IconButton>
          </Tooltip>
          <Badge
            color="error"
            content={badgeCount}
            isInvisible={isInvisible}
            placement="bottom-right"
          >
            <Tooltip title="Notifications" placement="right">
              <IconButton
                onClick={goToNotification}
                sx={{
                  color: `${
                    selectedPage === "notifications" ? "#587EDE" : "lightgrey"
                  }`,
                  "&:hover": {
                    backgroundColor: "#587EDE",
                    color: "lightgray",
                  },
                }}
              >
                <EmailIcon />
              </IconButton>
            </Tooltip>
          </Badge>
          <Divider />
          <Tooltip title="Settings" placement="right">
            <IconButton
              onClick={goToSettings}
              sx={{
                color: `${
                  selectedPage === "settings" ? "#587EDE" : "lightgrey"
                }`,
                "&:hover": {
                  backgroundColor: "#587EDE",
                  color: "lightgray",
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Open sidebar" placement="right">
            <IconButton
              onClick={() => setIsDrawerOpen((prev) => !isDrawerOpen)}
              sx={{
                color: "#587EDE",
                "&:hover": {
                  backgroundColor: "#587EDE",
                  color: "lightgray",
                },
              }}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box
        display={isDrawerOpen ? "flex" : "none"}
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: "100vh",
          width: `${isSmallScreen ? "70%" : "450px"}`,
          backgroundColor: "#202A44",
          position: "fixed",
          zIndex: "99",
        }}
      >
        <Box>
          <Box mt={10}>
            <Avatar
              src={currUser && currUser.imageUrl}
              text={currUser.firstName}
              bordered
              color="primary"
              css={{ width: "175px", height: "175px" }}
            />
            <Text h1 css={{ color: "lightgray" }}>
              Shawn Goh
            </Text>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box mb={3}>
              <Button
                light
                icon={<HomeIcon sx={{ mr: "10px" }} />}
                onPress={goToHome}
                css={{
                  color: "lightgrey",
                  "&:hover": {
                    backgroundColor: "#587EDE",
                    color: "lightgray",
                  },
                }}
              >
                Home
              </Button>
              <Button
                light
                icon={<DashboardIcon sx={{ mr: "10px" }} />}
                onPress={() => {
                  goToDashboard();
                  setIsDrawerOpen((prev) => !isDrawerOpen);
                }}
                css={{
                  color: `${
                    selectedPage === "dashboard" ? "#587EDE" : "lightgrey"
                  }`,
                  "&:hover": {
                    backgroundColor: "#587EDE",
                    color: "lightgray",
                  },
                }}
              >
                Dashboard
              </Button>
              <Button
                light
                icon={<EmailIcon sx={{ mr: "10px" }} />}
                onPress={() => {
                  goToNotification();
                  setIsDrawerOpen((prev) => !isDrawerOpen);
                }}
                css={{
                  color: `${
                    selectedPage === "notifications" ? "#587EDE" : "lightgrey"
                  }`,
                  "&:hover": {
                    backgroundColor: "#587EDE",
                    color: "lightgray",
                  },
                }}
              >
                Notifications
              </Button>
            </Box>
            <Box>
              <Text h3 css={{ color: "lightgray" }}>
                Settings
              </Text>
              <Button
                light
                icon={<SettingsIcon sx={{ mr: "10px" }} />}
                onPress={() => {
                  goToSettings();
                  setIsDrawerOpen((prev) => !isDrawerOpen);
                }}
                css={{
                  color: `${
                    selectedPage === "settings" ? "#587EDE" : "lightgrey"
                  }`,
                  "&:hover": {
                    backgroundColor: "#587EDE",
                    color: "lightgray",
                  },
                }}
              >
                Settings
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", textAlign: "end", mr: 4 }}>
          <Tooltip title="Open sidebar" placement="right">
            <IconButton
              onClick={() => setIsDrawerOpen((prev) => !isDrawerOpen)}
              sx={{
                color: "#587EDE",
                "&:hover": {
                  backgroundColor: "#587EDE",
                  color: "lightgray",
                },
              }}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
