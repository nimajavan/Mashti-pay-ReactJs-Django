import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILD,
  USER_LOGOUT,
  USER_PROFILE_RESET,
} from "../constants/UserLoginConstants";

export const UserLoginAction = (phone, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/v1/login/",
      { phone: phone, password: password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILD,
      payload: error.code,
    });
  }
};

export const UserLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("profile_status");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_PROFILE_RESET });
};

export const updateAccessToken = (obj) => (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  userInfo.access = obj.access;
  userInfo.refresh = obj.refresh;

  dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo });
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
