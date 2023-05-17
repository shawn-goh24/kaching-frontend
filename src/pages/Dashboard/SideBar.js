import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import useMediaQuery from "../../hooks/useMediaQuery";
import React, { useState } from "react";
import logoImg from "../../assets/logoImg.svg";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Avatar, Button, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/user/home");
  };
  const goToSettings = () => {
    navigate("/user/settings");
  };
  const goToDashboard = () => {
    navigate("/user/dashboard");
  };

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
          // transition: "width 200ms ease-in-out",
          backgroundColor: "#D2F2FF",
          position: "fixed",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mt={2}>
            {/* <img src={logoImg} alt="logo image" /> */}
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              bordered
              color="primary"
              size="lg"
              css={{ marginBottom: 10 }}
            />
            <Divider />
          </Box>
          <Tooltip title="Home" placement="right">
            <IconButton onClick={goToHome}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dashboard" placement="right">
            <IconButton onClick={goToDashboard}>
              <DashboardIcon />
            </IconButton>
          </Tooltip>
          <Divider />
          <Tooltip title="Profile Settings" placement="right">
            <IconButton>
              <SettingsIcon onClick={goToSettings} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Open sidebar" placement="right">
            <IconButton
              onClick={() => setIsDrawerOpen((prev) => !isDrawerOpen)}
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
          backgroundColor: "#D2F2FF",
          position: "absolute",
          zIndex: "99",
        }}
      >
        <Box>
          <Box mt={10}>
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              bordered
              color="primary"
              css={{ width: "175px", height: "175px" }}
            />
            <Text h1>Shawn Goh</Text>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box mb={3}>
              <Button
                light
                icon={<HomeIcon sx={{ mr: "10px" }} />}
                onPress={goToHome}
              >
                Home
              </Button>
              <Button
                light
                icon={<DashboardIcon sx={{ mr: "10px" }} />}
                onPress={goToDashboard}
              >
                Dashboard
              </Button>
            </Box>
            <Box>
              <Text h3>Settings</Text>
              <Button
                light
                icon={<SettingsIcon sx={{ mr: "10px" }} />}
                onPress={goToSettings}
              >
                Profile
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", textAlign: "end", mr: 4 }}>
          <Tooltip title="Open sidebar" placement="right">
            <IconButton
              onClick={() => setIsDrawerOpen((prev) => !isDrawerOpen)}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}
