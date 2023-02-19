import { combineReducers } from "redux";
import auth from "./auth/auth.reducer";
import users from "./userDashboard/userDashboard.reducer";
const rootReducer = combineReducers({
  auth,
  users,
});

export default rootReducer;
