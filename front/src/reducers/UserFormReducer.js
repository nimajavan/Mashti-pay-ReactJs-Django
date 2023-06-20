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
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FIALD,
  TICKET_SEND_REQUEST,
  TICKET_SEND_SUCCESS,
  TICKET_SEND_FIALD,
  TICKET_SEND_END,
} from "../constants/UserFormConstants";

export const GetDollarPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case DOLLAR_PRICE_REQUEST:
      return { ...state, loading_price: true };
    case DOLLAR_PRICE_SUCCESS:
      return { loading_price: false, price: action.payload };
    case DOLLAR_PRICE_FIALD:
      return { loading_price: false, dollar_error: action.payload };
    default:
      return state;
  }
};

export const BuyOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case BUY_ORDER_REQUEST:
      return { ...state, buy_order_loading: true };
    case BUY_ORDER_SUCCESS:
      return { buy_order_loading: false, buy_order_state: action.payload };
    case BUY_ORDER_FIALD:
      return { buy_order_loading: false, buy_order_error: action.payload };
    default:
      return state;
  }
};

export const SellOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case SELL_ORDER_REQUEST:
      return { ...state, sell_order_loading: true };
    case SELL_ORDER_SUCCESS:
      return { sell_order_loading: false, sell_order_state: action.payload };
    case SELL_ORDER_FIALD:
      return { sell_order_loading: false, sell_order_error: action.payload };
    default:
      return state;
  }
};

export const GetOrdersReducer = (state = { items: {} }, action) => {
  switch (action.type) {
    case BUY_ORDERS_STATUS_REQUEST:
      return { ...state, orders_loading: true };
    case BUY_ORDERS_STATUS_SUCCESS:
      return { orders_loading: false, items: action.payload };
    case BUY_ORDERS_STATUS_FIALD:
      return { orders_loading: false, itmes_error: action.payload };
    default:
      return state;
  }
};

export const GetSellOrdersReducer = (state = { sell_items: {} }, action) => {
  switch (action.type) {
    case SELL_ORDERS_STATUS_REQUEST:
      return { ...state, sell_orders_loading: true };
    case SELL_ORDERS_STATUS_SUCCESS:
      return { sell_orders_loading: false, sell_items: action.payload };
    case SELL_ORDERS_STATUS_FIALD:
      return { sell_orders_loading: false, sell_itmes_error: action.payload };
    default:
      return state;
  }
};

export const GetCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ORDER_REQUEST:
      return { ...state, get_cart_loading: true };
    case CART_ORDER_SUCCESS:
      return { get_cart_loading: false, cart: action.payload };
    case CART_ORDER_FIALD:
      return { get_cart_loading: false, cart_error: action.payload };
    default:
      return state;
  }
};

export const GetTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_REQUEST:
      return { ...state, ticket_loading: true };
    case TICKET_SUCCESS:
      return { ticket_loading: false, tickets: action.payload };
    case TICKET_FIALD:
      return { ticket_loading: false, ticket_error: action.paylaod };
    default:
      return state;
  }
};

export const SendTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_SEND_REQUEST:
      return { send_loading: true };
    case TICKET_SEND_SUCCESS:
      return { send_loading: false, send_code: action.payload };
    case TICKET_SEND_FIALD:
      return { send_loading: false, send_code_error: action.payload };
    case TICKET_SEND_END:
      return {
        send_loading: false,
        send_code_error: "",
        send_code: "",
      };
    default:
      return state;
  }
};
