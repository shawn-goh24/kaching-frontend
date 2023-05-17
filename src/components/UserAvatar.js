import { Dropdown, Text, User } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function UserAvatar({}) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const handleEvents = (e) => {
    if (e === "dashboard") {
      navigate("/user/dashboard");
    } else if (e === "settings") {
      navigate("/user/settings");
    } else {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  return (
    <Dropdown placement="bottom-left">
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
