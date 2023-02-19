import actionTypes from "./auth.actionTypes";
import userDashboardActionTypes from "../userDashboard/userDashboard.actionTypes";
export const initState = {
  isLoggedIn: false,
  user: null,
  token: null,
};
function AuthReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true, user: action.user, token: action.token },
      };
    case actionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true, user: action.results },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return initState;
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...{ user: action.result },
      };
    case userDashboardActionTypes.POST_TRIP_SUCCESS: {
      const post = action.payload;

      state.user.posts.push(post);
      const updatedUser = state.user;
      console.log(updatedUser);
      return {
        ...state,
        ...{ user: updatedUser },
      };
    }
    case userDashboardActionTypes.UPDATE_TRIP_SUCCESS: {
      const post = action.payload;
      const index = state.user.posts.findIndex((obj) => obj.id === post.id);
      state.user.posts.splice(index, 1, post);
      const updatedUser = state.user;
      console.log(updatedUser);
      return {
        ...state,
        ...{ user: updatedUser },
      };
    }
    case userDashboardActionTypes.DELETE_POST_SUCCESS: {
      const post = action.payload;
      const index = state.user.posts.findIndex((obj) => obj.id === post.id);
      state.user.posts.splice(index, 1);
      const updatedUser = state.user;
      console.log(updatedUser);
      return {
        ...state,
        ...{ user: updatedUser },
      };
    }

    default:
      return state;
  }
}

export default AuthReducer;
