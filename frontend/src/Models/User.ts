export type UserProfileToken = {
  userName: string;
  email: string;
  token: string;
};

export type UserPasswordChangeProfile = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UserProfile = {
  userName: string;
  email: string;
};
