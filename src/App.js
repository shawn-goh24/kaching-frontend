import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import Error from "./pages/Error404/Error404";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import NavigationBar from "./components/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "./pages/Dashboard/SideBar";
import Notifications from "./pages/Notifications/Notifications";

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [currUser, setCurrUser] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserApi();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getNotificationsApi();
  }, [accessToken]);

  // get user
  const getUserApi = async () => {
    let token = await getAccessTokenSilently();
    // check user
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
    setAccessToken(token);
    setCurrUser(request.data);
  };

  const getNotificationsApi = async () => {
    if (accessToken) {
      const allNotification = await axios.get(
        `http://localhost:8080/notification/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotifications(allNotification.data);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <NavigationBar
              accessToken={accessToken}
              currUser={currUser}
              setSelectedPage={setSelectedPage}
            />
          }
        >
          <Route index element={<LandingPage />} />
          <Route
            path="home"
            element={<Home accessToken={accessToken} currUser={currUser} />}
          />
        </Route>
        <Route
          path="/user"
          element={
            <SideBar
              accessToken={accessToken}
              currUser={currUser}
              notifications={notifications}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          }
        >
          <Route
            path="dashboard"
            element={
              <Dashboard accessToken={accessToken} currUser={currUser} />
            }
          />
          <Route
            path="settings"
            element={
              <Settings
                currUser={currUser}
                accessToken={accessToken}
                setCurrUser={setCurrUser}
              />
            }
          />
          <Route
            path="notifications"
            element={
              <Notifications
                currUser={currUser}
                accessToken={accessToken}
                setNotifications={setNotifications}
              />
            }
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

{
  /* <>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<LandingPage />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/user" element={<SideBar />}>
          <Route
            path="dashboard"
            element={
              <Dashboard accessToken={accessToken} currUser={currUser} />
            }
          />
          <Route
            path="settings"
            element={<Settings currUser={currUser} accessToken={accessToken} />}
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </> */
}

{
  /* <>
      <Routes>
        <Route
          path="/"
          element={
            <NavigationBar accessToken={accessToken} currUser={currUser} />
          }
        />
        <Route
          path="/user/home"
          element={
            <NavigationBar accessToken={accessToken} currUser={currUser} />
          }
        />
      </Routes>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <div style={{ display: "flex" }}>
        <Routes>
          <Route
            path="/user/dashboard"
            element={
              <SideBar
                accessToken={accessToken}
                currUser={currUser}
                notifications={notifications}
              />
            }
          />
          <Route
            path="/user/settings"
            element={
              <SideBar
                accessToken={accessToken}
                currUser={currUser}
                notifications={notifications}
              />
            }
          />
          <Route
            path="/user/notifications"
            element={
              <SideBar
                accessToken={accessToken}
                currUser={currUser}
                notifications={notifications}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path="/user">
            <Route path="home" element={<Home />} />
            <Route
              path="dashboard"
              element={
                <Dashboard accessToken={accessToken} currUser={currUser} />
              }
            />
            <Route
              path="settings"
              element={
                <Settings currUser={currUser} accessToken={accessToken} />
              }
            />
            <Route
              path="notifications"
              element={
                <Notifications
                  currUser={currUser}
                  accessToken={accessToken}
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </> */
}
