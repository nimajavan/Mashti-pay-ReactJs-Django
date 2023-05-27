import axios from "axios";
import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAILD,
  USER_PROFILE_SUCCESS,
  PROFILE_SELFI_UPLOAD_REQUEST,
  PROFILE_SELFI_UPLOAD_SUCCESS,
  PROFILE_SELFI_UPLOAD_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILD,
  USER_LOGIN_SUCCESS,
} from "../constants/UserLoginConstants";
import axiosInstance from "../utils/axiosInstance";

export const FetchUserProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const authRequestAxios = axiosInstance(userInfo, dispatch);
    const { data } = await authRequestAxios.get(
      "http://127.0.0.1:8000/api/v1/profile/"
    );
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (profile_error) {
    dispatch({
      type: USER_PROFILE_FAILD,
      payload: profile_error.response.data.code,
    });
  }
};

export const UpdateProfileAction =
  (name, last_name, email, bank_card_num, bank_shaba_num) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const authRequestAxios = axiosInstance(userInfo, dispatch);
      const { data } = await authRequestAxios.post(
        "http://127.0.0.1:8000/api/v1/profile/",
        {
          name: name,
          email: email,
          last_name: last_name,
          bank_card_num: bank_card_num,
          bank_shaba_num: bank_shaba_num,
        }
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (update_failed) {
      dispatch({
        type: USER_UPDATE_FAILD,
        payload: update_failed.response.data,
      });
    }
  };

export const UploadSelfiAction = (img_data) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_SELFI_UPLOAD_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/v1/profile/",
      img_data,
      config
    );
    dispatch({ type: PROFILE_SELFI_UPLOAD_SUCCESS, payload: data });
    dispatch(FetchUserProfileAction(userInfo.token));
  } catch (upload_error) {
    dispatch({
      type: PROFILE_SELFI_UPLOAD_FAILED,
      payload: upload_error.response.data,
    });
  }
};
