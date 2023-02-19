import UserDashboardRepository from "../../repositories/userDashboardRepository";

import { all, call, put, takeEvery, cancel } from "redux-saga/effects";
import Router from "next/router";
import { postJobSuccess, userUpdateSuccess } from "../auth/auth.actions";
import {
  getFreeelancersSuccess,
  postTripSuccess,
  remomvePostDraft,
  removeTripSuccess,
  updateTripSuccess,
} from "./userDashboard.actions";
import userDashboardActionTypes from "./userDashboard.actionTypes";
import chatsRepository from "../../repositories/chatsRepository";
import userDashboardRepository from "../../repositories/userDashboardRepository";
import alert from "@/src/components/notifications/Alert";

function* updateUserProfilePicSaga(action) {
  try {
    const { result } = yield call(
      UserDashboardRepository.updateUserProfilePic,
      action.payload,
      action.userId
    );

    action.callback();
    alert.showSuccessAlert("Your Profile Pic has been updated successfully!!!");
    yield put(userUpdateSuccess(result));
  } catch (error) {
    if (action && action.callback) {
      console.log("Error: ", error);
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* postTripSaga(action) {
  try {
    const { result } = yield call(
      userDashboardRepository.postTrip,
      action.payload
    );
    action.callback();
    alert.showSuccessAlert("Your Trip has been posted successfully!!!");
    console.log(action);
    if (action.draft) {
      console.log(action.index);
      yield put(remomvePostDraft(action.index));
    }
    yield put(postTripSuccess(result));
    Router.push("/activitys");
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* updateTripSaga(action) {
  try {
    const { result } = yield call(
      userDashboardRepository.updateTrip,
      action.postId,
      action.payload
    );
    action.callback();
    alert.showSuccessAlert("Your Trip has been updated successfully!!!");

    yield put(updateTripSuccess(result));
    Router.push("/activitys");
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* deleteTripSaga(action) {
  try {
    const { result } = yield call(
      userDashboardRepository.deleteTrip,
      action.payload
    );
    action.callback();
    alert.showSuccessAlert("Your Trip has been removed successfully!!!");
    yield put(removeTripSuccess({ id: action.payload }));
    Router.push("/activitys");
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* updateUserProfileSaga(action) {
  try {
    const { result } = yield call(
      UserDashboardRepository.updateUserProfile,
      action.payload,
      action.userId
    );

    alert.showSuccessAlert("Your profile has been updated successfully!!!");
    action.callback();
    Router.push("/profile");
    yield put(userUpdateSuccess(result));
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* getFreelancers(action) {
  try {
    const { result } = yield call(
      UserDashboardRepository.getFreelancers,
      action.query
    );
    action.callback();
    yield put(getFreeelancersSuccess(result));
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* sendProposal(action) {
  try {
    const { result } = yield call(
      UserDashboardRepository.sendProposal,
      action.payload
    );
    action.callback();
    alert.showSuccessAlert(
      "congratulations! you have successfully submitted your proposal"
    );
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* sendMessage(action) {
  try {
    const { result } = yield call(chatsRepository.createChat, action.payload);
    action.callback();
    Router.push("/chat");
  } catch (error) {
    if (action && action.callback) {
      action.callback();
      console.log(error);
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* markProjectComplete(action) {
  try {
    const { result } = yield call(
      projectsRepository.markProjectComplete,
      action.projectId
    );
    action.callback();
    alert.showSuccessAlert("Project has been marked as completed");
  } catch (error) {
    if (action && action.callback) {
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
function* sendFeedback(action) {
  try {
    const { result } = yield call(
      userDashboardRepository.sendFeedback,
      action.userId,
      action.payload
    );

    alert.showSuccessAlert("Your Review has been saved!");
    action.callback();
  } catch (error) {
    if (action && action.callback) {
      alert.showErrorAlert(error);
    }
  } finally {
    yield cancel();
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(
      userDashboardActionTypes.UPDATE_PROFILE_PIC_REQUEST,
      updateUserProfilePicSaga
    ),
    takeEvery(
      userDashboardActionTypes.UPDATE_PROFILE_REQUEST,
      updateUserProfileSaga
    ),
    takeEvery(userDashboardActionTypes.POST_TRIP_REQUEST, postTripSaga),
    takeEvery(userDashboardActionTypes.UPDATE_TRIP_REQUEST, updateTripSaga),
    takeEvery(userDashboardActionTypes.DELETE_POST_REQUEST, deleteTripSaga),

    // takeEvery(userDashboardActionTypes.SEND_PROPOSAL_REQUEST, sendProposal),
    takeEvery(userDashboardActionTypes.SEND_MESSAGE_REQUEST, sendMessage),
  ]);
}
