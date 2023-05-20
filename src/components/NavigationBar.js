import React from "react";
import logo from "../assets/logo.svg";
import { Navbar, Button, Avatar } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import UserAvatar from "./UserAvatar";
import { Outlet } from "react-router-dom";

export default function NavigationBar({ currUser, accessToken }) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="#">Dashboard</Navbar.Link>
          <Navbar.Link href="#">Transaction</Navbar.Link>
        </Navbar.Content>

        {isAuthenticated ? (
          <Navbar.Content>
            <UserAvatar currUser={currUser} accessToken={accessToken} />
          </Navbar.Content>
        ) : (
          <Navbar.Content>
            <Navbar.Link color="inherit">
              <Button
                auto
                light
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: {
                      redirect_uri: "http://localhost:3000/user/home",
                    },
                  })
                }
              >
                Login
              </Button>
            </Navbar.Link>
            <Navbar.Item>
              <Button
                auto
                flat
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: {
                      redirect_uri: "http://localhost:3000/user/home",
                    },
                  })
                }
              >
                Sign Up
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        )}
      </Navbar>
      <Outlet />
    </>
  );
}
