import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home(props) {
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();
  const [currUser, setCurrUser] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const userApi = async () => {
    let token = await getAccessTokenSilently();
    setAccessToken(token);
    let request = await axios.post(
      "http://localhost:8080/user/home",
      {
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(request);
  };

  useEffect(() => {
    setCurrUser(user);
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log(user);
      userApi();
    }
  }, [isAuthenticated]);

  return (
    <>
      <h1>Home</h1>
      <h3>Users</h3>
      <button
        onClick={() =>
          axios.get("http://localhost:8080/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        }
      >
        Click me
      </button>
    </>
  );
}
