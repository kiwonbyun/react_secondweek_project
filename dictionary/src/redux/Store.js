import { createStore, combineReducers } from "redux";
import chineseword from "./modules/chineseword";

const rootReducer = combineReducers({ chineseword });

const store = createStore(rootReducer);

export default store;
