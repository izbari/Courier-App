import { combineReducers } from "redux";
import  counterReducers  from './counterReducers';
import authReducers from "./authReducers";

const allReducers= combineReducers({
    counterReducers,
    authReducers
})

export default allReducers;