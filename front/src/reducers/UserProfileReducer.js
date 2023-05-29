import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAILD,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_RESET,
  PROFILE_SELFI_UPLOAD_REQUEST,
  PROFILE_SELFI_UPLOAD_SUCCESS,
  PROFILE_SELFI_UPLOAD_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILD,
  USER_UPDATE_SUCCESS_FINISH,
} from "../constants/UserLoginConstants";

export const UpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { updating: true, success_update: false };
    case USER_UPDATE_SUCCESS:
      return {
        updating: false,
        success_update: true,
        update_profile_status: action.payload,
      };
    case USER_UPDATE_SUCCESS_FINISH:
      return {
        updating: false,
        success_update: false,
        update_profile_status: action.payload,
      };
    case USER_UPDATE_FAILD:
      return {
        updating: false,
        success_update: false,
        update_failed: action.payload,
      };
    default:
      return state;
  }
};

export const FetchProfileReducer = (state = { profile_status: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, profile_loading: true };
    case USER_PROFILE_SUCCESS:
      return { profile_loading: false, profile_status: action.payload };
    case USER_PROFILE_FAILD:
      return { profile_loading: false, profile_error: action.payload };
    case USER_PROFILE_RESET:
      return { profile_status: {} };
    default:
      return state;
  }
};

export const SelfiUploadReducder = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_SELFI_UPLOAD_REQUEST:
      return { ...state, uploading: true };
    case PROFILE_SELFI_UPLOAD_SUCCESS:
      return { uploading: false, upload_res: action.payload };
    case PROFILE_SELFI_UPLOAD_FAILED:
      return { uploading: false, upload_error: action.payload };
    default:
      return state;
  }
};
