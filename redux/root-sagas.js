import { all } from "redux-saga/effects";

import AuthSagas from "./auth/auth.saga";
import UserDashboardSagas from "./userDashboard/userDashboard.saga";

export default function* rootSaga() {
  yield all([AuthSagas(), UserDashboardSagas()]);
}
