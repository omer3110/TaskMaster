import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth.context";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TasksPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import RequireNoAuth from "./components/RequireNoAuth";
import WithLoader from "./components/WithLoader";
import { Toaster } from "./components/ui/toaster";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import UserProfile from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="task" element={<TaskPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="login"
            element={
              <RequireNoAuth>
                <LoginPage />
              </RequireNoAuth>
            }
          />
          <Route
            path="register"
            element={
              <RequireNoAuth>
                <RegisterPage />
              </RequireNoAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
