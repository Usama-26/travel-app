import authActionTypes from "./auth.actionTypes";
import actionTypes from "./auth.actionTypes";

export function loginRequest(payload, callback) {
  return { type: actionTypes.LOGIN_REQUEST, payload, callback };
}

export function userSignUpRequest(payload, callback) {
  return { type: actionTypes.USER_SIGNUP_REQUEST, payload, callback };
}

export function loginSuccess(user, token) {
  return { type: actionTypes.LOGIN_SUCCESS, user, token };
}

export function updateSuccess(results) {
  return { type: actionTypes.UPDATE_SUCCESS, results };
}

export function signUpSuccess() {
  return { type: actionTypes.SIGNUP_SUCCESS };
}

export function logOutRequest() {
  return { type: actionTypes.LOGOUT };
}

export function logOutSuccess(payload) {
  return { type: actionTypes.LOGOUT_SUCCESS, payload };
}

export function forgotpasswordrequests(payload, callback) {
  return {
    type: actionTypes.FORGOTPASSWORD_REQUEST,
    payload,
    callback,
  };
}

export function resetPasswordRequests(payload, callback) {
  return {
    type: actionTypes.RESETPASSWORD_REQUEST,
    payload,
    callback,
  };
}

export function verifyEmail(payload, callback) {
  return {
    type: actionTypes.VERIFY_EMAIL,
    payload,
    callback,
  };
}

export function userUpdateSuccess(result) {
  return {
    type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
    result,
  };
}
export function googleAuthRequest(payload, callback) {
  return { type: actionTypes.GOOGLE_AUTH, payload, callback };
}
export function changePasword(payload) {
  return { type: actionTypes.CHANGE_PASSWORD_REQUEST, payload };
}
