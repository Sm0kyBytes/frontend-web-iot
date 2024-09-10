import React, { useState } from "react";
import { LoginModel } from "../models/auth";
import { useAuth } from "../context/authentication";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: LoginModel = {
      email,
      password,
    };
    authContext?.loginUser(email, password);
  };
  return (
    <div>
      <h1>Login Page</h1>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login Form</h2>
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
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
