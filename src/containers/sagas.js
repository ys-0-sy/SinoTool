import { fork } from "redux-saga";
import { fetchDb } from "../firebase";

function* fetchEvents() {
  const { snapshot, err } = yield call(fetchDb, "events");
  if (snapshot) {

      yield put();
    });
  } else {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield fork(fetchEvents);
}
