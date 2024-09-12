import React, { useState } from "react";
import { RegisterModel } from "../models/auth";
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

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
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
  function isValidEmail(email: string): boolean {
    const filter = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;
    return filter.test(email);
  }

  function isValidPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    return regex.test(password);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageError(null);
    if (!isValidEmail(email)) {
      setMessageError("Invalid email.");
    } else if (!isValidPassword(password)) {
      setMessageError(
        "Password must contain both uppercase and lowercase letters, numbers, and be between 8 and 15 characters long."
      );
    } else {
      const message = await authContext?.registerUser(
        email,
        username,
        password
      );
      if (message === "User has been created successfully.") {
        setMessageError(null);
      } else if (message) {
        setMessageError(message);
      } else {
        setMessageError(null);
      }
    }
  };

  const goToLoginPage = (event: React.MouseEvent<HTMLElement>) => {
    navigate("/login");
  };
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Register Form
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
              label="Username"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
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
        <Button size="small" onClick={goToLoginPage}>
          Already have account?
        </Button>
      </CardActions>
    </Card>
  );
};

export default RegisterPage;
