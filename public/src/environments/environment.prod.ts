export const environment = {
  production: true,
  BASE_API_URL: "http://localhost:3000/api",
  APPS_API_ENDPOINT: "/apps",
  MOVIES_API_ENDPOINT: "/movies",
  USER_LOGIN_API_ENDPOINT: "/users/login",
  REGISTER_API_ENDPOINT: "/users/register",

  TOKEN_KEY_ON_LOCAL_STORAGE: "login-token",

  MSG_USER_REGISTERED: "User registered",
  MSG_ERROR_REGISTERING_USER: "There was problem registering this user",
  MSG_PASSWORD_DOES_NOT_MATCH: "The does not match",
  MSG_ALL_FIELDS_REQUIRED: "All fields are required",

  MSG_LOGIN_SUCCESSFUL: "Login successful",
  MSG_LOGIN_UNSUCCESSFUL: "Login unsuccessful",
  MSG_LOGIN_REQUIRED: "Login required",

  MSG_APP_SAVED: "The application has been saved",
  MSG_ERROR_SAVING_APP: "There was problem saving the app",
  MSG_SAVING: "Saving...",

  MSG_SERVICE_ERROR: "",
  MSG_APP_RETRIEVED: "",
  MSG_MOVIE_RETRIEVED: "",
  MSG_SEARCH_COMPLETE: "",
};
