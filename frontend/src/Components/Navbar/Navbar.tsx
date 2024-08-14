import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./GrabandGo.png";
import { useAuth } from "../../Context/useAuth";
import { changePasswordAPI } from "../../Services/AuthService";
import ChangePasswordPopup from "../PopupBoxes/ChangePasswordPopup";
import ChangePassword from "./ChangePassword";
import { toast } from "react-toastify";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [serverError, setServerError] = useState<string>("");

  const handleChangePasswordSubmit = async (
    e: SyntheticEvent,
    close: () => void
  ) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      currentPassword: { value: string };
      newPassword: { value: string };
      confirmNewPassword: { value: string };
    };
    const currentPassword = target.currentPassword.value;
    const newPassword = target.newPassword.value;
    const confirmNewPassword = target.confirmNewPassword.value;

    const result = await changePasswordAPI(
      currentPassword,
      newPassword,
      confirmNewPassword
    );
    if (result?.status === 200 || result?.status === 204) {
      // display a success message
      toast.success("Password changed successfully!");
      close(); // Close the popup after successful submission
    } else {
      toast.error("Failed to change password!");
    }
  };

  return (
    <nav className="sideMargin relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img className="logo" src={logo} alt="" />
          </Link>
        </div>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
            <a
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Logout
            </a>
            <ChangePasswordPopup
              children={
                <ChangePassword
                  closeOnSubmit={() => {}}
                  handleChangePasswordSubmit={handleChangePasswordSubmit}
                />
              }
            />
            {serverError && <h1 className="sideMargin">{serverError}</h1>}
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-darkBlue">
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
