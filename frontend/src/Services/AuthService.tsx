import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserPasswordChangeProfile, UserProfileToken } from "../Models/User";

const api = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/`;

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const changePasswordAPI = async (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  try {
    const data = await axios.post<UserPasswordChangeProfile>(
      api + "account/changePassword",
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const logoutAPI = async () => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/logout", {});
    return data;
  } catch (error) {
    handleError(error);
  }
};
