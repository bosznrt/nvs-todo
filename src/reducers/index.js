import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import localforage from "localforage";

import userReducer from "./user";

const persistConfig = {
  key: "root",
  storage: localforage,
};

const AppReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
});

export default AppReducer;
