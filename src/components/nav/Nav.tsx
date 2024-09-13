import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authentication";
//import MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
//import file
import Icon from "../../public/images/icon-example-image.svg";
const Nav: React.FC = () => {
  const pages = ["manage", "about", "contact"];
  const authContext = useAuth();
  const navigate = useNavigate();
  const backToHomePage = (event: React.MouseEvent<HTMLElement>) => {
    navigate("/");
  };
  const goToLoginPage = (event: React.MouseEvent<HTMLElement>) => {
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={backToHomePage} sx={{ p: 0, mr: 1 }}>
            <Avatar alt="Remy Sharp" src={Icon} />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  navigate(`/${page}`);
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {authContext?.isAuthenticated() ? (
            <div style={{ display: "flex" }}>
              <Typography alignContent="center" align="center" sx={{ mr: 1 }}>
                {authContext.user?.username.toLocaleUpperCase()}
              </Typography>
              <Button color="inherit" onClick={() => authContext.logout()}>
                Logout
              </Button>
            </div>
          ) : (
            <Button color="inherit" onClick={goToLoginPage}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
