import {
  DOLLAR_PRICE_REQUEST,
  DOLLAR_PRICE_SUCCESS,
  DOLLAR_PRICE_FIALD,
  BUY_ORDER_REQUEST,
  BUY_ORDER_SUCCESS,
  BUY_ORDER_FIALD,
  SELL_ORDER_REQUEST,
  SELL_ORDER_SUCCESS,
  SELL_ORDER_FIALD,
  BUY_ORDERS_STATUS_REQUEST,
  BUY_ORDERS_STATUS_SUCCESS,
  BUY_ORDERS_STATUS_FIALD,
  SELL_ORDERS_STATUS_REQUEST,
  SELL_ORDERS_STATUS_SUCCESS,
  SELL_ORDERS_STATUS_FIALD,
  CART_ORDER_REQUEST,
  CART_ORDER_SUCCESS,
  CART_ORDER_FIALD,
} from "../constants/UserFormConstants";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const GetCartAction = () => async (dispatch, getState) => {
  axios.defaults.withCredentials = true;
  try {
    dispatch({ type: CART_ORDER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      header: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/v1/show_cart/",
      config
    );
    localStorage.setItem("cart", JSON.stringify(data));
    dispatch({ type: CART_ORDER_SUCCESS, payload: data });
  } catch (cart_error) {
    dispatch({ type: CART_ORDER_FIALD, payload: cart_error.response.data });
  }
};

export const RemoveCartAction = (id) => async (dispatch, getState) => {
  axios.defaults.withCredentials = true;
  try {
    dispatch({ type: CART_ORDER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      header: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/v1/remove_cart/",
      { id: id },
      config
    );
    localStorage.setItem("cart", JSON.stringify(data));
    dispatch({ type: CART_ORDER_SUCCESS, payload: data });
  } catch (cart_error) {
    dispatch({ type: CART_ORDER_FIALD, payload: cart_error.response.data });
  }
};

export const GetDollarPriceAction = () => async (dispatch) => {
  try {
    dispatch({ type: DOLLAR_PRICE_REQUEST });
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/v1/get_dollar_price/",
      config
    );
    dispatch({ type: DOLLAR_PRICE_SUCCESS, payload: data });
  } catch (dollar_error) {
    dispatch({
      type: DOLLAR_PRICE_FIALD,
      payload: dollar_error.response.data,
    });
  }
};

export const BuyOrderAction = (quantity) => async (dispatch, getState) => {
  axios.defaults.withCredentials = true;
  try {
    dispatch({ type: BUY_ORDER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const authRequestAxios = axiosInstance(userInfo, dispatch);
    const { data } = await authRequestAxios.post(
      "http://127.0.0.1:8000/api/v1/buy_order/",
      { quantity: quantity }
    );
    dispatch({ type: BUY_ORDER_SUCCESS, payload: data });
  } catch (buy_order_error) {
    dispatch({ type: BUY_ORDER_FIALD, payload: buy_order_error.response.data });
  }
};

export const SellOrderAction =
  (voucher_code, activate_code) => async (dispatch, getState) => {
    axios.defaults.withCredentials = true;
    try {
      dispatch({ type: SELL_ORDER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const authRequestAxios = axiosInstance(userInfo, dispatch);
      const { data } = await authRequestAxios.post(
        "http://127.0.0.1:8000/api/v1/sell_order/",
        { voucher_code: voucher_code, activate_code: activate_code }
      );
      dispatch({ type: SELL_ORDER_SUCCESS, payload: data });
    } catch (buy_order_error) {
      dispatch({
        type: SELL_ORDER_FIALD,
        payload: buy_order_error.response.data,
      });
    }
  };

export const GetOrdersAction =
  (id = null) =>
  async (dispatch, getState) => {
    axios.defaults.withCredentials = true;
    if (!id) {
      try {
        dispatch({ type: BUY_ORDERS_STATUS_REQUEST });
        const {
          userLogin: { userInfo },
        } = getState();
        const authRequestAxios = axiosInstance(userInfo, dispatch);
        const { data } = await authRequestAxios.get(
          "http://127.0.0.1:8000/api/v1/buy_order/"
        );
        dispatch({ type: BUY_ORDERS_STATUS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: BUY_ORDERS_STATUS_FIALD,
          payload: error.response.data,
        });
      }
    } else {
      try {
        dispatch({ type: BUY_ORDERS_STATUS_REQUEST });
        const {
          userLogin: { userInfo },
        } = getState();
        const authRequestAxios = axiosInstance(userInfo, dispatch);
        const { data } = await authRequestAxios.get(
          "http://127.0.0.1:8000/api/v1/buy_order/",
          { id: id }
        );
        dispatch({ type: BUY_ORDERS_STATUS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: BUY_ORDERS_STATUS_FIALD,
          payload: error.response.data,
        });
      }
    }
  };

export const GetSellOrdersAction =
  (id = null) =>
  async (dispatch, getState) => {
    axios.defaults.withCredentials = true;
    if (!id) {
      try {
        dispatch({ type: SELL_ORDERS_STATUS_REQUEST });
        const {
          userLogin: { userInfo },
        } = getState();
        const authRequestAxios = axiosInstance(userInfo, dispatch);
        const { data } = await authRequestAxios.get(
          "http://127.0.0.1:8000/api/v1/sell_order/"
        );
        dispatch({ type: SELL_ORDERS_STATUS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: SELL_ORDERS_STATUS_FIALD,
          payload: error.response.data,
        });
      }
    } else {
      try {
        dispatch({ type: SELL_ORDERS_STATUS_REQUEST });
        const {
          userLogin: { userInfo },
        } = getState();
        const authRequestAxios = axiosInstance(userInfo, dispatch);
        const { data } = await authRequestAxios.get(
          "http://127.0.0.1:8000/api/v1/sell_order/",
          { id: id }
        );
        dispatch({ type: SELL_ORDERS_STATUS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: SELL_ORDERS_STATUS_FIALD,
          payload: error.response.data,
        });
      }
    }
  };
