import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/authentication";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import ManagePage from "./pages/Manage";
import CreateDevicePage from "./pages/CreateDevise";
import Nav from "./components/nav/Nav";
import BgImage from "./public/images/bg-example-image.svg";
const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Nav />
        <div style={{ display: "flex" }}>
          <img
            src={BgImage}
            alt="background image"
            style={{
              position: "absolute",
              zIndex: 0,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.5,
            }}
          />
          <div style={{ zIndex: 10 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/manage" element={<ManagePage />} />
              <Route path="/manage/create" element={<CreateDevicePage />} />
              {/* <Route path="/manage/edit" element={<ManagePage />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
