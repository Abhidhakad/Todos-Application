const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/sendOtp",
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",
  RESETPASSTOKEN_API: BASE_URL + "/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/reset-password",
};

export const todos = {
  CREATE_TODO: BASE_URL + "/createtodo",
  ALL_TODOS : BASE_URL + "/getallTodo",
  UPDATE_TODO : BASE_URL + "/updatetodo",
  DELETE_TODO : BASE_URL + "/deletetodo",
  SUCCESS_TODO: BASE_URL + "/successtodo",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_NAME_API: BASE_URL + "/updatename",
  CHANGE_PASSWORD_API: BASE_URL + "/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};