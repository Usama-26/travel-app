import userDashboardActionTypes from "./userDashboard.actionTypes";
export function updateUserProfilePic(payload, userId, callback) {
  return {
    type: userDashboardActionTypes.UPDATE_PROFILE_PIC_REQUEST,
    payload,
    userId,
    callback,
  };
}

export function updateUserProfileRequest(payload, userId, callback) {
  return {
    type: userDashboardActionTypes.UPDATE_PROFILE_REQUEST,
    payload,
    userId,
    callback,
  };
}

export function postTripRequest(payload, callback, draft, index) {
  return {
    type: userDashboardActionTypes.POST_TRIP_REQUEST,
    payload,
    callback,
    draft,
    index,
  };
}

export function postTripSuccess(payload) {
  return {
    type: userDashboardActionTypes.POST_TRIP_SUCCESS,
    payload,
  };
}

export function updateTripRequest(postId, payload, callback) {
  return {
    type: userDashboardActionTypes.UPDATE_TRIP_REQUEST,
    postId,
    payload,
    callback,
  };
}

export function updateTripSuccess(payload) {
  return {
    type: userDashboardActionTypes.UPDATE_TRIP_SUCCESS,
    payload,
  };
}

export function removeTripRequest(payload, callback) {
  return {
    type: userDashboardActionTypes.DELETE_POST_REQUEST,
    payload,
    callback,
  };
}

export function removeTripSuccess(payload) {
  return {
    type: userDashboardActionTypes.DELETE_POST_SUCCESS,
    payload,
  };
}

export function sendMessageRequest(payload, callback) {
  return {
    type: userDashboardActionTypes.SEND_MESSAGE_REQUEST,
    payload,
    callback,
  };
}
export function savePostDraft(payload) {
  return {
    type: userDashboardActionTypes.SAVE_POST_DRAFT,
    payload,
  };
}
export function remomvePostDraft(index) {
  return {
    type: userDashboardActionTypes.REMOVE_FROM_DRAFT,
    index,
  };
}
