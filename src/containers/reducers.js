import {
  setEvent,
  setEventImgUrl,
  setGuerrillaList,
  setGuerrillaListImgUrl
} from "./actions";
import { combineReducers } from "redux";
// reducers.js
INITIAL_STATE = {
  eventsAll: new Array(),
  guerrillaEvents: new Array(),
  constantEvents: new Array(),
  guerrillaList: new Array()
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_EVENT":
      return {
        ...state,
        eventsAll: state.eventsAll.concat(action.event),
        guerrillaEvents: state.guerrillaEvents.concat(
          action.event.filter(event => {
            return event.isGuerrilla;
          })
        ),
        constantEvents: state.constantEvents.concat(
          action.event.filter(event => {
            return !event.isGuerrilla;
          })
        )
      };
    case "SET_EVENT_IMGURL":
      const newEvent = [
        ...state.eventsAll.slice(0, action.index),
        Object.assign({}, state.eventsAll[action.index], {
          imgUrl: action.imgUrl
        }),
        ...state.eventsAll.slice(action.index + 1)
      ];
      return Object.assign({}, state, {
        eventsAll: newEvent,
        guerrillaEvents: newEvent.filter(event => event.isGuerrilla),
        constantEvents: newEvent.filter(event => !event.isGuerrilla)
      });
    case "SET_GUERRILLALIST":
      return {
        ...state,
        guerrillaList: state.guerrillaList.concat(action.event)
      };
    case "SET_GUERRILLALIST_IMGURL":
      console.log("reducer: setGuerrilaListImageURL");
      const newGuerrillaEvents = [
        ...state.eventsAll.slice(0, action.index),
        Object.assign({}, state.eventsAll[action.index], {
          guerrilla: {
            ...state.eventsAll[action.index].guerrilla,
            imgUrl: action.imgUrl
          }
        }),
        ...state.eventsAll.slice(action.index + 1)
      ];
      console.log(newGuerrillaEvents.filter(event => event.isGuerrilla));
      return Object.assign({}, state, {
        eventsAll: newGuerrillaEvents,
        guerrillaEvents: newGuerrillaEvents.filter(event => event.isGuerrilla)
      });
    default:
      return state;
  }
};

export const reducers = combineReducers({
  events: reducer
});
