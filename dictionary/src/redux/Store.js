import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import chineseword from "./modules/chineseword";

const middlewares = [thunk];
const rootReducer = combineReducers({ chineseword });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
