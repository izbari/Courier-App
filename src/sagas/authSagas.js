import {delay} from 'redux-saga';
import {register,login} from  '../api/user';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  logInFailure,
  logInSuccess,
  registerFailure,
  registerSuccess,
} from '../actions';
import {userActionTypes as types} from '../actions/actionTypes';
import { auth } from '../../firebase';



export function* logInWithCredentials(props) {
  console.log("logInWithCredentials",props)
const {phone} = props.payload;
  console.log("*****",phone)
  try {
    console.log("girdi")
    const user = yield call(login,{phone});
    console.log("fonksiyondan dönen user loginwithcredentials",user)
    yield put(logInSuccess(user));
  } catch (error) {
    console.log("eror loginwith credetialsta",error)
    yield put(logInFailure(error));
  }
}

export function* registerWithCredentials({payload}) {
  try {
    console.log("registerWithCredentials")
    console.log("registerwithcredential payload ",payload)

    yield call(register,{user:payload});
    yield put(registerSuccess({user:{payload}}));
    console.log("register succes calisti")
  } catch (error) {
    console.log("error in registerwithcredential ",error)
    yield put(registerFailure(error));
  }
}

export function* logInAfterRegister(props) {
  console.log("logInAfterRegister")
  yield logInWithCredentials(props.payload);
}

export function* onLogInStart() {
  console.log("onLogInStart")
  yield takeLatest(types.LOG_IN_START, logInWithCredentials);
}

export function* onRegisterStart() {
  
  console.log("onRegisterStart")
  yield takeLatest(types.REGISTER_START, registerWithCredentials);
}

export function* onRegisterSuccess() {
  console.log("onRegisterSuccess")
  yield takeLatest(types.REGISTER_SUCCESS, logInAfterRegister);
}

export function* authSagas() {
  console.log("authSagas")
  yield all([
    call(onLogInStart),
    call(onRegisterStart),
    call(onRegisterSuccess),
  ]);
}