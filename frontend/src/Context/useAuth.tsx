import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import {
  registerAPI,
  loginAPI,
  logoutAPI,
  changePasswordAPI,
} from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<void>;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  // used for the async pattern.
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // get values from localstorage
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    // check if the values have been gotten, and set them to user
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      // adding token to header.
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  // create the register function
  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          // here after the API is called, we toss the token into the storage.
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          // set the user and token and the ! is to say its nullable
          setToken(res?.data.token!);
          setUser(userObj!);
          // display a success message
          toast.success("Login Success!");
          navigate("/");
        }
      })
      // A hail mary, so very low chance to happen.
      .catch((e) => toast.warning("Server error occured"));
  };

  // create the login function
  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          window.location.href = "/";
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  // check if the user is logged in, this returns true if user exists.
  const isLoggedIn = () => {
    return !!user;
  };

  const isAdmin = () => {
    if (!token) return false;
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.role === "Admin"; // Adjust this according to your token structure
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call the API to invalidate the JWT on the server side
      await logoutAPI();
    } catch (error) {
      // If there's an error, you might want to display a message or log it
      toast.warning("Error logging out. Please try again.");
    } finally {
      // Clean up local user session regardless of API call success or failure
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
      window.location.href = "/";
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise<void> => {
    try {
      const response = await changePasswordAPI(
        currentPassword,
        newPassword,
        confirmNewPassword
      );
      if (response) {
        toast.success("Password changed successfully!");
      }
    } catch (error) {
      toast.error("Failed to change password.");
    }
  };

  // react renders a lot, so that's why we name the values that we want to render explicitly.
  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        token,
        logout,
        isLoggedIn,
        isAdmin,
        registerUser,
        changePassword
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

// creating a custom hook.
export const useAuth = () => React.useContext(UserContext);
