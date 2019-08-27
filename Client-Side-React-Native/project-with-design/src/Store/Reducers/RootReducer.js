import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import MainReducer from "./MainReducer";
import OrderTruckReducer from "./OrderTruckReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  main: MainReducer,
  orderTruck: OrderTruckReducer
});

export default RootReducer;
