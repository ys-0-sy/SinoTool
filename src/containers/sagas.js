import { all } from "redux-saga";
import mySaga from "../firebase";

function* rootSaga() {
  yield all([...mySaga]);
}
