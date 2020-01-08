import { fork, call, put } from "redux-saga/effects";
import { fetchDb, fetchImgUrl } from "../firebase";
import { setEvent, setEventImgUrl } from "./actions";

Array.prototype.gForEach = function*(fn) {
  for (let i = 0; i < this.length; i++) yield* fn(this[i], i, this);
};

function* fetchEvents() {
  console.log("fetchEvents function");
  const { snapshot, err } = yield call(fetchDb, "events");
  console.log("catched db");
  if (snapshot) {
    yield put(setEvent(snapshot));
  } else {
    console.warn(err);
  }

  for (let i = 0; i < snapshot.length; i++) {
    const { url, err } = yield call(fetchImgUrl, snapshot[i].image);
    if (url) {
      yield put(setEventImgUrl(i, url));
    } else {
      console.warn(err);
    }
  }
}
function* mySaga() {
  yield fork(fetchEvents);
}

export default mySaga;
