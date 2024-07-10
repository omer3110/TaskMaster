import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/Auth.context";

const RequireNoAuth = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);

  if (loggedInUser) {
    // Redirect to home page if already logged in
    return <Navigate to="/" />;
  }

  // Render children if not logged in
  return children;
};

export default RequireNoAuth;
