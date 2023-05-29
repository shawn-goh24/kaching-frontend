import React from "react";
import { Card, Text } from "@nextui-org/react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function FeatureCard(props) {
  const icon = () => {
    if (props.iconText === "track") {
      return (
        <ReceiptIcon
          fontSize="large"
          style={{ width: "75px", height: "75px", paddingBottom: "50px" }}
        />
      );
    } else if (props.iconText === "overview") {
      return (
        <VisibilityIcon
          fontSize="large"
          style={{ width: "75px", height: "75px", paddingBottom: "50px" }}
        />
      );
    } else {
      return (
        <NotificationsIcon
          fontSize="large"
          style={{ width: "75px", height: "75px", paddingBottom: "50px" }}
        />
      );
    }
  };

  return (
    <Card
      css={{ $$cardColor: "#E6E6FA", backdropFilter: "blur(11.4px)" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
    >
      <Card.Body
        style={{
          textAlign: "center",
          width: "70%",
        }}
      >
        {icon()}
        <Text h6 size={15} color="white" css={{ m: 0, color: "black" }}>
          {props.text}
        </Text>
      </Card.Body>
    </Card>
  );
}
