import axios from "axios";
import {
  SEND_CODE_REQUEST,
  USER_REGISTER_REQUEST,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILD,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILD,
} from "../constants/UserLoginConstants";

export const SendSmsAction = (phone) => async (dispatch) => {
  axios.defaults.withCredentials = true;
  try {
    dispatch({ type: SEND_CODE_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/v1/send_sms/",
      { phone: phone },
      config
    );
    dispatch({ type: SEND_CODE_SUCCESS, payload: data });
  } catch (sms_error) {
    dispatch({
      type: SEND_CODE_FAILD,
      payload: sms_error.response.data,
    });
  }
};

export const UserRegisterAction =
  (phone, password, code) => async (dispatch) => {
    axios.defaults.withCredentials = true;
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/v1/register_user/",
        { phone: phone, password: password, code: code },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAILD,
        payload: error.response.data,
      });
    }
  };
