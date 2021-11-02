import { createStore, combineReducers } from "redux";
import socketManagerReducer from "../utils/socketManager/ducks/reducer";

const store = createStore(
  combineReducers({
    socketManager: socketManagerReducer,
  })
);

export default store;
