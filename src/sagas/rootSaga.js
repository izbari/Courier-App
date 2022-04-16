import { delay } from "redux-saga";
import { all,call } from "redux-saga/effects";

import { authSagas} from "./authSagas";

export default function* rootSaga() {
  yield all([call(authSagas)]);
}