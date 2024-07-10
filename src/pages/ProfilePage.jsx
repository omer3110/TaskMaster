import React, { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import api from "@/services/api.service";
import { AuthContext } from "@/contexts/Auth.context";
import Loader from "@/components/ui/Loader";

const UserProfile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (loggedInUser) {
      setFormData({
        username: loggedInUser.username,
        email: loggedInUser.email,
        password: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
      });
      return;
    }

    try {
      const response = await api.patch(`/user/${loggedInUser._id}`, formData);
      setLoggedInUser(response.data.user);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        status: "error",
      });
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Welcome, {loggedInUser.username}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Thank you for being a part of our community. Here is your profile
            information:
          </p>
          <div className="grid gap-4">
            <div className="flex flex-col">
              <Label htmlFor="username">Username</Label>
              {isEditMode ? (
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1">{formData.username}</p>
              )}
            </div>
            <div className="flex flex-col">
              <Label htmlFor="email">Email</Label>
              {isEditMode ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1">{formData.email}</p>
              )}
            </div>
            {isEditMode && (
              <>
                <div className="flex flex-col">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditMode ? (
            <>
              <Button type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
              <Button variant="secondary" onClick={toggleEditMode}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={toggleEditMode}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
