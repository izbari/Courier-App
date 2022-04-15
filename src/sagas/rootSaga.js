import { delay } from "redux-saga";
import { all } from "redux-saga/effects";
import { watchDecrement, watchIncrement } from "./counterSagas";

export default function* rootSaga() {
  yield all([watchDecrement(), watchIncrement()]);
}
