import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserProfile } from "../models/auth";
import { jwtDecode, JwtPayload } from "jwt-decode";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    email: string,
    username: string,
    password: string
  ) => Promise<string>;
  loginUser: (email: string, password: string) => Promise<string>;
  logout: () => void;
  isAuthenticated: () => boolean;
};

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        {
          email,
          username,
          password,
        }
      );

      if (response.status === 200) {
        navigate("/login");
        return "User has been created successfully.";
      } else {
        return "Error is occur during registered.";
      }
    } catch (err: any) {
      switch (err?.status) {
        case 400:
          return "Invalid information.";
        case 404:
          return "This email is already registered.";
        default:
          return "Server error occurred, Please try again later.";
      }
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:4000/users/login", {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        interface UserDataFromToken extends JwtPayload {
          id?: number;
          email?: string;
          username?: string;
        }
        const userDataFromToken: UserDataFromToken =
          jwtDecode<JwtPayload>(token);
        const userObj = {
          id: userDataFromToken?.id || -1,
          username: userDataFromToken?.username || "",
          email: userDataFromToken?.email || "",
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(response?.data.token!);
        setUser(userObj!);
        navigate("/");
        return "Login successfully.";
      } else {
        return "Error is occur during login.";
      }
    } catch (err: any) {
      switch (err?.status) {
        case 400:
          return "Invalid username or password.";
        case 404:
          return "Invalid username or password.";
        default:
          return "Server error occurred, Please try again later.";
      }
    }
  };

  const isAuthenticated = () => Boolean(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isAuthenticated, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
