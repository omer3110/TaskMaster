import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AuthContext } from "@/contexts/Auth.context";

function Header() {
  const { loggedInUser, logout } = useContext(AuthContext);

  return (
    <header className="bg-white/5 sm:p-4 p-1 sm:px-28 flex justify-between items-center h-14 border-b-2 mb-8">
      <div>
        <Link to="/">
          <img src={logo} alt="" className="h-6 sm:h-10 sm:w-34" />
        </Link>
      </div>
      <nav>
        <ul className="flex gap-2">
          <li className="text-sm sm:text-lg">
            <Link to="/about">About</Link>
          </li>
          <li className="text-sm sm:text-lg">
            <Link to="/contact">Contact</Link>
          </li>
          {loggedInUser && (
            <li className="text-sm sm:text-lg">
              <Link to="/task">Tasks</Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="flex items-center gap-1 sm:gap-2">
        {loggedInUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8">
                <AvatarImage />
                <AvatarFallback>
                  {loggedInUser.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <div>Logout</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>Hello Guest</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Welcome</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/auth/login">
                <DropdownMenuItem className=" cursor-pointer">
                  Login
                </DropdownMenuItem>
              </Link>
              <Link to="/auth/register">
                <DropdownMenuItem className=" cursor-pointer">
                  Register
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
