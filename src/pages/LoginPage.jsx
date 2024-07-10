import React, { useContext, useState } from "react";
import api from "../services/api.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";

const LoginPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    navigate("/");
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (await login(formData)) {
      navigate("/task");
    }

    // console.log(formData);
    // try {
    //   const response = await api.post("/auth/login", formData);
    //   console.log("User token is:", response.data.token);
    //   setToken(response.data.token);

    //   navigate("/");
    // } catch (error) {
    //   console.error("Error creating user:", error);
    // }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Please enter your login details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                type="username"
                name="username"
                placeholder="Enter your username"
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginPage;
