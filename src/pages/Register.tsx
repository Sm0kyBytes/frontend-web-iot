import React, { useState } from "react";
import { RegisterModel } from "../models/auth";
import { useAuth } from "../context/authentication";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authContext?.registerUser(email, username, password);
  };
  return (
    <div className="page-container">
      <h1>Register Page</h1>
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register Form</h2>
          <div className="input-container">
            <label>
              Username:
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter username here"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                }}
                value={username}
                required
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              Password:
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password here"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                value={password}
                required
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              Email:
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email here"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
                value={email}
                required
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
