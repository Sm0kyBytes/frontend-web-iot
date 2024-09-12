import React, { useState } from "react";
import { LoginModel } from "../models/auth";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";
//import MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useAuth();
  const navigate = useNavigate();

  const [messageError, setMessageError] = useState<string | null>(null);
  const cardStyle = {
    minWidth: 300,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #888888",
    boxShadow: "5px 10px #888888",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageError(null);
    const data: LoginModel = {
      email,
      password,
    };
    const message = await authContext?.loginUser(email, password);
    if (message && message !== "Login successfully.") {
      setMessageError(message);
    } else if (message) {
      setMessageError(message);
    } else {
      setMessageError(null);
    }
  };

  const goToRegisterPage = (event: React.MouseEvent<HTMLElement>) => {
    navigate("/register");
  };
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Login Form
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          // noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div
            className="input-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              required
              label="Email"
              type="email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
            <TextField
              required
              label="Password"
              type="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
            <Button type="submit" fullWidth sx={{ fontWeight: 700 }}>
              Submit
            </Button>
          </div>
          {messageError ? (
            <Typography sx={{ color: "red" }}>*{messageError}</Typography>
          ) : null}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={goToRegisterPage}>
          Do not have account?
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginPage;
