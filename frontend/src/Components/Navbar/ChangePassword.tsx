import { ChangeEvent, SyntheticEvent, useState } from "react";
import Popup from "reactjs-popup";
import { UserPasswordChangeProfile } from "../../Models/User";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface Props {
  closeOnSubmit: () => void;
  handleChangePasswordSubmit: (
    e: SyntheticEvent,
    closeOnSubmit: () => void
  ) => void;
}

const ChangePassword = ({
  handleChangePasswordSubmit,
  closeOnSubmit,
}: Props) => {
  // when using react-hoom-forms, its nice to have a type
  type UserPasswordChangeProfile = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  // yup is a validation library
  const validation = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().required("New password is required"),
    confirmNewPassword: Yup.string().required("Confirmation password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserPasswordChangeProfile>({ resolver: yupResolver(validation) });

  const [showCurrrentPassword, setShowCurrentPassword] = useState(false);
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrrentPassword);
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleNewVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const [showConfNewPassword, setShowConfNewPassword] = useState(false);
  const toggleConfNewVisibility = () => {
    setShowConfNewPassword(!showConfNewPassword);
  };

  return (
    <form
      className="poppup-child-form"
      onSubmit={(e) => handleChangePasswordSubmit(e, closeOnSubmit)}
    >
      <label className="form-label" htmlFor="currentPassword">
        Current password:
      </label>
      <div className="relative">
        <input
          className="form-input"
          type={showCurrrentPassword ? "text" : "password"}
          id="currentPassword"
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3"
          onClick={toggleCurrentPasswordVisibility}
        >
          {showCurrrentPassword ? <BsEye /> : <BsEyeSlash />}
        </button>
      </div>
      <label className="form-label" htmlFor="newPassword">
        New password
      </label>
      <div className="relative">
        <input
          className="form-input"
          type={showNewPassword ? "text" : "password"}
          id="newPassword"
          placeholder="••••••••"
          {...register("newPassword")}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3"
          onClick={toggleNewVisibility}
        >
          {showNewPassword ? <BsEye /> : <BsEyeSlash />}
        </button>
      </div>
      {errors.newPassword ? (
        <p className="text-black">{errors.newPassword.message}</p>
      ) : (
        ""
      )}
      <label className="form-label" htmlFor="confirmNewPassword">
        Confirm new password
      </label>
      <div className="relative">
        <input
          className="form-input"
          type={showConfNewPassword ? "text" : "password"}
          id="confirmNewPassword"
          placeholder="••••••••"
          {...register("confirmNewPassword")}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3"
          onClick={toggleConfNewVisibility}
        >
          {showConfNewPassword ? <BsEye /> : <BsEyeSlash />}
        </button>
      </div>
      {errors.confirmNewPassword ? (
        <p className="text-black">{errors.confirmNewPassword.message}</p>
      ) : (
        ""
      )}
      <button className="form-button" type="submit">
        Save
      </button>
    </form>
  );
};

export default ChangePassword;
