import React from "react";
import logo from "../assets/logo.svg";
import { Navbar, Button, Avatar } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavigationBar() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  console.log(user);

  return (
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
          <Navbar.Item>
            <Avatar
              size="md"
              text="User"
              textColor="white"
              color="gradient"
              bordered
            />
          </Navbar.Item>
          <Navbar.Item>
            <Button
              auto
              flat
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </Button>
          </Navbar.Item>
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
  );
}
