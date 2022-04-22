// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  BASE_API_URL: "add a base api url",
  APPS_API_ENDPOINT: "add apps endpoint",
  MOVIES_API_ENDPOINT: "add movies endpoint",
  USER_LOGIN_API_ENDPOINT: "add user login endpoint",
  REGISTER_API_ENDPOINT: "add registration endpoint",

  TOKEN_KEY_ON_LOCAL_STORAGE: "login-token",

  MSG_USER_REGISTERED: "",
  MSG_ERROR_REGISTERING_USER: "",

  MSG_LOGIN_SUCCESSFUL: "Login successful",
  MSG_LOGIN_UNSUCCESSFUL: "Login unsuccessful",
  MSG_LOGIN_REQUIRED: "Login required",

  MSG_APP_SAVED: "",
  MSG_ERROR_SAVING_APP: "",
  MSG_SAVING: "",

  MSG_SERVICE_ERROR: "",
  MSG_APP_RETRIEVED: "",
  MSG_MOVIE_RETRIEVED: "",
  MSG_SEARCH_COMPLETE: "",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
