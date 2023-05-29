import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { UserLoginReducer } from "./reducers/UserLoginReducer";
import {
  FetchProfileReducer,
  SelfiUploadReducder,
  UpdateProfileReducer,
} from "./reducers/UserProfileReducer";
import {
  SendSmsReducer,
  UserRegisterReducer,
} from "./reducers/UserRegisterReducer";
import {
  GetDollarPriceReducer,
  BuyOrderReducer,
  SellOrderReducer,
  GetOrdersReducer,
  GetSellOrdersReducer,
  GetCartReducer,
} from "./reducers/UserFormReducer";

const reducer_root = combineReducers({
  userLogin: UserLoginReducer,
  sendSms: SendSmsReducer,
  userRegister: UserRegisterReducer,
  userProfile: FetchProfileReducer,
  userProfileUpdate: UpdateProfileReducer,
  selfiUpload: SelfiUploadReducder,
  dollarPrice: GetDollarPriceReducer,
  buyOrder: BuyOrderReducer,
  sellOrder: SellOrderReducer,
  getOrder: GetOrdersReducer,
  getSellOrder: GetSellOrdersReducer,
  getCart: GetCartReducer,
});

const UserLoginFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const UserProfileFromLocalStorage = localStorage.getItem("profile_status")
  ? JSON.parse(localStorage.getItem("profile_status"))
  : null;

const UserCartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : null;

const middleware_root = [thunk];
const initialState = {
  userLogin: { userInfo: UserLoginFromLocalStorage },
  userProfile: { profile_status: UserProfileFromLocalStorage },
  getCart: { cart: UserCartFromLocalStorage },
};
const store = createStore(
  reducer_root,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware_root))
);

export default store;
