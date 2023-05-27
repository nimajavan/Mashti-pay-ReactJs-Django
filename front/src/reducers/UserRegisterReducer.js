import {
  SEND_CODE_REQUEST,
  USER_REGISTER_REQUEST,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILD,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILD,
} from "../constants/UserLoginConstants";

export const SendSmsReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_CODE_REQUEST:
      return { sms_loading: true };
    case SEND_CODE_SUCCESS:
      return { sms_loading: false, sms_status: action.payload };
    case SEND_CODE_FAILD:
      return { sms_loading: false, sms_error: action.payload };
    default:
      return state;
  }
};

export const UserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, status: action.payload };
    case USER_REGISTER_FAILD:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
