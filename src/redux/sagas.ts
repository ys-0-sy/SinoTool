import { fork, call, put } from "redux-saga/effects";
import { fetchDb, fetchImgUrl } from "./modules/firebase";
import { EventActions } from "./events/actions";
import { FirebaseEvent } from "./modules/firebase";
import { Event } from "./events";

type ReturnfetchDb = { snapshot: FirebaseEvent[]; err?: string };

function* fetchEvents() {
  console.log("fetchEvents function");
  const { snapshot, err }: ReturnfetchDb = yield call(fetchDb, "eventsList");
  console.log("fetched Data from db");
  if (snapshot) {
    const newEvents: Event[] = snapshot.map(event => {
      return {
        ...event,
        endDate: event.endDate.toDate(),
        startDate: event.startDate.toDate()
      };
    });
    yield put(EventActions.setEvent({ event: newEvents }));
  } else {
    console.warn(err);
  }
  for (let i = 0; i < snapshot.length; i++) {
    const { url, err }: { url: string; err?: string } = yield call(
      fetchImgUrl,
      snapshot[i].image
    );
    if (url) {
      yield put(EventActions.setEventImgUrl({ index: i, imgUrl: url }));
    } else {
      console.warn(err);
    }

    if (snapshot[i].isGuerrilla) {
      const { url, err } = yield call(
        fetchImgUrl,
        snapshot[i].guerrilla.image[0]
      );
      if (url) {
        yield put(
          EventActions.setGuerrillaListImgUrl({ index: i, imgUrl: url })
        );
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
