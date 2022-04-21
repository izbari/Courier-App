import {delay} from 'redux-saga';
import {register,login,checkDuplicateUser} from  '../api/user';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  logInFailure,
  logInSuccess,
  registerFailure,
  registerSuccess,
} from '../actions';
import {userActionTypes as types} from '../actions/actionTypes';



export function* logInWithCredentials(props) {
  console.log("logInWithCredentials",props)
const {phone} = props.payload;
  console.log("*****",phone)
  try {
    console.log("girdi")
    const user = yield call(login,{props});
    console.log("fonksiyondan dönen user loginwithcredentials",user)
    yield put(logInSuccess(user));
  } catch (error) {

    console.log("eror loginwith credetialsta",error,error.code)
    yield put(logInFailure(error));
  }
}

export function* registerWithCredentials({payload}) {
  try {
    console.log("registerWithCredentials")
    console.log("registerwithcredential payload ",payload)
    yield call(checkDuplicateUser,{user:payload});
    console.log("check1")
    yield call(register,{user:payload});
    console.log("check2")

    yield put(registerSuccess({user:{payload}}));
    console.log("register succes calisti")
  } catch (error) {
    console.log("error in registerwithcredential ",error.message,error.code)
    let msg = error.message;

    msg = error.code == "auth/invalid-email" && "E-posta adresinizi giriniz." || msg;
    msg = error.code == "auth/email-already-in-use" && "Bu e-posta adresi zaten kullanımda." || msg;
    msg = error.code == "auth/weak-password" && "Şifreniz en az 6 karakterden oluşmalıdır." || msg;

    yield put(registerFailure(msg));
  }
}

// export function* logInAfterRegister({payload}) {
//   console.log("logInAfterRegister",payload)
//   yield logInWithCredentials(payload);
// }

export function* onLogInStart() {
  console.log("onLogInStart")
  yield takeLatest(types.LOG_IN_START, logInWithCredentials);
}

export function* onRegisterStart() {
  
  console.log("onRegisterStart")
  yield takeLatest(types.REGISTER_START, registerWithCredentials);
}

// export function* onRegisterSuccess() {
//   console.log("onRegisterSuccess")
//   yield takeLatest(types.REGISTER_SUCCESS, logInAfterRegister);
// }

export function* authSagas() {
  console.log("authSagas")
  yield all([
    call(onLogInStart),
    call(onRegisterStart),
  ]);
}