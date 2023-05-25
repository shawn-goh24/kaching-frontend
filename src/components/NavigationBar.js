import React from "react";
import logo from "../assets/logo.svg";
import { Navbar, Button, Avatar } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import UserAvatar from "./UserAvatar";
import { Outlet } from "react-router-dom";

export default function NavigationBar({
  currUser,
  accessToken,
  setSelectedPage,
}) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <img src={logo} alt="logo" />
        </Navbar.Brand>

        {isAuthenticated ? (
          <Navbar.Content>
            <UserAvatar
              currUser={currUser}
              accessToken={accessToken}
              setSelectedPage={setSelectedPage}
            />
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
                      redirect_uri: "http://localhost:3000/home",
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
                      redirect_uri: "http://localhost:3000/home",
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
