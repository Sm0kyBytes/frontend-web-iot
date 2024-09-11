import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import ManagePage from "./pages/Manage";
import CreateDevicePage from "./pages/CreateDevise";
import Nav from "./components/nav/Nav";

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/manage/create" element={<CreateDevicePage />} />
        {/* <Route path="/manage/edit" element={<ManagePage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
