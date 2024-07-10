import api from "../services/api.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function formatJWTTokenToUser(token) {
  const decodedJwt = _parseJwt(token);
  if (!decodedJwt) return null;

  const {
    payload: { userId },
  } = decodedJwt;
  console.log(userId);
  return { userId };
}

function _parseJwt(token) {
  const [header, payload, signature] = token.split(".");

  const fixedHeader = header.replace(/-/g, "+").replace(/_/g, "/");
  const fixedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");

  const decodedHeader = atob(fixedHeader);
  const decodedPayload = atob(fixedPayload);

  const headerObj = JSON.parse(decodedHeader);
  const payloadObj = JSON.parse(decodedPayload);

  return {
    header: headerObj,
    payload: payloadObj,
    signature,
  };
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [token, setToken] = useLocalStorage("jwt-taskify", null);
  const { toast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const { userId } = formatJWTTokenToUser(token);
        const response = await api.get(`/auth/${userId}`);
        setLoggedInUser(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
    navigate("/");
    toast({
      title: "Logout Successfuly Complete",
      description: "You have successfully logged out.",
    });
  }

  async function login(userData) {
    try {
      const response = await api.post("/auth/login", userData);
      setToken(response.data.token);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Username or password not match.",
        status: "error",
      });
    }
  }

  async function register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      toast({
        title: "Registration Successful",
        description: "You have successfully registered.",
      });
      return true;
    } catch (error) {
      console.error("Error registering:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An error occurred during registration.",
        status: "error",
      });
    }
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
