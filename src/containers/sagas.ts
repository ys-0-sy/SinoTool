import { fork, call, put } from "redux-saga/effects";
import { fetchDb, fetchImgUrl } from "../firebase";
import {
  setEvent,
  setEventImgUrl,
  setGuerrillaList,
  setGuerrillaListImgUrl
} from "./actions";

function* fetchEvents() {
  console.log("fetchEvents function");
  const { snapshot, err } = yield call(fetchDb, "eventsList");
  console.log("fetched Data from db");
  if (snapshot) {
    const newEvents = snapshot.map(event => {
      return {
        ...event,
        endDate: new Date(event.endDate.seconds * 1000),
        startDate: new Date(event.startDate.seconds * 1000)
      };
    });
    yield put(setEvent(newEvents));
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

    if (snapshot[i].isGuerrilla) {
      const { url, err } = yield call(
        fetchImgUrl,
        snapshot[i].guerrilla.image[0]
      );
      if (url) {
        yield put(setGuerrillaListImgUrl(i, url));
      } else {
        console.warn(err);
      }
    }
  }
}

function* fetchGuerrillalist() {
  console.log("fetchGuerrilla function");
  const { snapshot, err } = yield call(fetchDb, "guerrillaList");
  console.log("fetched Data from db");
  if (snapshot) {
    yield put(setGuerrillaList(snapshot));
  } else {
    console.warn(err);
  }
  for (let i = 0; i < snapshot.length; i++) {
    const { url, err } = yield call(fetchImgUrl, snapshot[i].image[0]);
    if (url) {
      yield put(setGuerrillaListImgUrl(i, url));
    } else {
      console.warn(err);
    }
  }
}

function* mySaga() {
  yield fork(fetchEvents);
  //yield fork(fetchGuerrillalist);
}

export default mySaga;
