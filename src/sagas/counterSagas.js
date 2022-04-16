import { DECREMENT,INCREAMENT} from "../actions/actionTypes";
import { put,takeEvery } from "redux-saga/effects";
import {delay} from 'redux-saga';

export function* watchIncrement(){
    yield takeEvery(INCREAMENT,increment);
}
export function* watchDecrement(){
    yield takeEvery(DECREMENT,decrement);
}

function increment(){
    console.log("this is increment saga")
}
 function decrement(){
    console.log("this is decrement saga")
}