import { fork, call, put } from "redux-saga/effects";
import { fetchDb, fetchImgUrl } from "./modules/firebase";
import { EventActions } from "./events/actions";

type ReturnfetchDb = { snapshot: Event[]; err?: string };

function* fetchEvents() {
  console.log("fetchEvents function");
  const { snapshot, err }: ReturnfetchDb = yield call(fetchDb, "eventsList");
  console.log("fetched Data from db");
  if (snapshot) {
    const newEvents = snapshot.map(event => {
      return {
        ...event,
        endDate: new Date(event.endDate.seconds * 1000),
        startDate: new Date(event.startDate.seconds * 1000)
      };
    });
    yield put(EventActions.setEvent(newEvents));
  } else {
    console.warn(err);
  }
  for (let i = 0; i < snapshot.length; i++) {
    const { url, err } = yield call(fetchImgUrl, snapshot[i].image);
    if (url) {
      yield put(EventActions.setEventImgUrl(i, url));
    } else {
      console.warn(err);
    }

    if (snapshot[i].isGuerrilla) {
      const { url, err } = yield call(
        fetchImgUrl,
        snapshot[i].guerrilla.image[0]
      );
      if (url) {
        yield put(EventActions.setGuerrillaListImgUrl(i, url));
      } else {
        console.warn(err);
      }
    }
  }
}

function* mySaga() {
  yield fork(fetchEvents);
}

export default mySaga;
