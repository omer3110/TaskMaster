import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/Auth.context";

const RequireAuth = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);

  if (!loggedInUser) {
    // Redirect to login page if not logged in
    return <Navigate to="/auth/login" />;
  }

  // Render children if logged in
  return children;
};

export default RequireAuth;
