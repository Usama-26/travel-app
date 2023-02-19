import AuthService from "../../repositories/AuthenticationRepository";
import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  cancel,
  cancelled,
} from "redux-saga/effects";
import Router from "next/router";
import actionTypes from "./auth.actionTypes";
import { loginSuccess, logOutSuccess } from "./auth.actions";
import { appName } from "../../repositories/genericRepository";
import alert from "@/src/components/notifications/Alert";
import socket from "@/socket";

function* userSignUpSaga(action) {
  try {
    const { message, description } = yield call(
      AuthService.userRegister,
      action.payload
    );
    
    alert.showSuccessAlert("You have been registered successfully!");
    Router.push("/login");
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      action.callback();
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}

function* loginSaga(action) {
  try {
    let _tokens;
    let _user;
    if (action.payload.tokens) {
      _tokens = action.payload.tokens;
    } else {
      const { user, tokens } = yield call(AuthService.login, action.payload);
      _tokens = {
        accessToken: tokens.access.token,
      };
      _user = user;
    }

    yield put(loginSuccess(_user, _tokens));
    for (const key of Object.keys(_tokens))
      localStorage.setItem(`user_${key}`, _tokens[key]);

    action.callback();
    alert.showSuccessAlert("you are logged in successfully!!!");
    Router.push("/");
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}

function* logOutSaga(action) {
  try {
    localStorage.removeItem(`user_accessToken`);
    alert.showSuccessAlert("you are logged out successfully!!!");
    yield Router.replace("/login");
    socket.emit("forceDisconnect", action.payload);
    yield put(logOutSuccess());
  } catch (err) {
    console.log(err);
    alert.showErrorAlert(err);
  }
}

function* changePasswordSaga(action) {
  try {
    const result = yield call(AuthService.changePassword, action.payload);
    alert.showSuccessAlert("Your password has been changed successfully!!!");
    Router.replace("/profile");
  } catch (err) {
    console.log(err);
    alert.showErrorAlert(err);
  }
}

function* forgotpasswordSaga({ payload, callback }) {
  try {
    yield call(AuthService.forgetPassword, payload);
    alert.showinfoAlert("please check your email for reset password link");
    if (callback) callback();
  } catch (error) {
    alert.showErrorAlert(error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}

function* resetPasswordSaga({ payload, callback }) {
  try {
    yield call(AuthService.resetPassword, payload);
    alert.showSuccessAlert("Your password has been reset successfully");
    if (callback) callback();
    Router.replace("/login");
  } catch (error) {
    alert.showErrorAlert(error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}
function* verifyEmailSaga({ payload, callback }) {
  try {
    yield call(AuthService.verifyEmail, payload);
    alert.showSuccessAlert("You are Registered successfully!");
    if (callback) callback();
    Router.push("/login");
  } catch (error) {
    alert.showErrorAlert(error);
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}

function* googleAuthSaga(action) {
  let _tokens;
  let _user;

 
_tokens = {
  accessToken: action.payload.tokens.access.token,
};

  _user = action.payload.user;

  yield put(loginSuccess(_user, _tokens));
  for (const key of Object.keys(_tokens))
    localStorage.setItem(`user_${key}`, _tokens[key]);

  action.callback();
  alert.showSuccessAlert("you are logged in successfully!!!");
  Router.push("/");
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.USER_SIGNUP_REQUEST, userSignUpSaga)]);
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
  yield all([
    takeLatest(actionTypes.FORGOTPASSWORD_REQUEST, forgotpasswordSaga),
  ]);
  yield all([takeLatest(actionTypes.RESETPASSWORD_REQUEST, resetPasswordSaga)]);
  yield all([takeLatest(actionTypes.VERIFY_EMAIL, verifyEmailSaga)]);
  yield all([takeLatest(actionTypes.GOOGLE_AUTH, googleAuthSaga)]);
  yield all([
    takeLatest(actionTypes.CHANGE_PASSWORD_REQUEST, changePasswordSaga),
  ]);
}
