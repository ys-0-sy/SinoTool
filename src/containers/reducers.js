import { setEvent, setEventImgUrl } from "./actions";
import { combineReducers } from "redux";
// reducers.js
INITIAL_STATE = {
  eventsAll: new Array(),
  guerrillaEvents: new Array(),
  constantEvents: new Array()
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_EVENT":
      return {
        ...state,
        eventsAll: state.eventsAll.concat(action.event),
        guerrillaEvents: state.guerrillaEvents.concat(
          action.event.filter(event => {
            return event.guerrilla;
          })
        ),
        constantEvents: state.constantEvents.concat(
          action.event.filter(event => {
            return !event.guerrilla;
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
        guerrillaEvents: newEvent.filter(event => event.guerrilla),
        constantEvents: newEvent.filter(event => !event.guerrilla)
      });
    default:
      return state;
  }
};

export const reducers = combineReducers({
  events: reducer
});
