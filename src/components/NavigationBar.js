import React from "react";
import logo from "../assets/logo.svg";
import { Navbar, Button } from "@nextui-org/react";

export default function NavigationBar() {
  return (
    <Navbar isBordered variant="floating">
      <Navbar.Brand>
        <img src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="#">Dashboard</Navbar.Link>
        <Navbar.Link href="#">Transaction</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit">
          <Button auto light>
            Login
          </Button>
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat>
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
