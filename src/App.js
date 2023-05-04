import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import Error from "./pages/Error404/Error404";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NavigationBar />} />
      </Routes>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/:id">
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
