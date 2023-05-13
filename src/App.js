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

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [currUser, setCurrUser] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [transactions, setTransactions] = useState("");
  const [userCategories, setUserCategories] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserApi();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getUserTransactionsApi();
    getCategoriesApi();
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

  // get all user transactions
  const getUserTransactionsApi = async () => {
    const currentYear = new Date().getFullYear();
    if (accessToken) {
      let user = await axios.get(
        `http://localhost:8080/transaction/${currUser.id}/${currentYear}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTransactions(user.data);
    }
  };

  // get categories
  const getCategoriesApi = async () => {
    if (accessToken) {
      let categories = await axios.get(
        `http://localhost:8080/user/category/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserCategories(categories.data);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<NavigationBar />} />
        <Route path="/user/home" element={<NavigationBar />} />
      </Routes>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user">
          <Route path="home" element={<Home />} />
          <Route path="dashboard/:name" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
