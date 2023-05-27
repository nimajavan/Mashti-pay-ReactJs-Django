import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILD,
  USER_LOGOUT,
} from "../constants/UserLoginConstants";

export const UserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILD:
      return { loading: false, error: action.type };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
