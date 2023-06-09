import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import Error from "./pages/Error404/Error404";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import NavigationBar from "./components/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Notifications from "./pages/Notifications/Notifications";
import NewSideBar from "./pages/Dashboard/NewSideBar";

export const AccessTokenContext = createContext();
export const CurrUserContext = createContext();

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
      `${process.env.REACT_APP_BACKEND}/user/home`,
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
        `${process.env.REACT_APP_BACKEND}/notification/${currUser.id}`,
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
      <AccessTokenContext.Provider value={accessToken}>
        <CurrUserContext.Provider value={currUser}>
          <Routes>
            <Route
              path="/"
              element={<NavigationBar setSelectedPage={setSelectedPage} />}
            >
              <Route index element={<LandingPage />} />
              <Route path="home" element={<Home />} />
            </Route>
            <Route
              path="/user"
              element={
                <NewSideBar
                  notifications={notifications}
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="settings"
                element={<Settings setCurrUser={setCurrUser} />}
              />
              <Route
                path="notifications"
                element={<Notifications setNotifications={setNotifications} />}
              />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </CurrUserContext.Provider>
      </AccessTokenContext.Provider>
    </>
  );
}

export default App;
