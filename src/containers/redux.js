// redux.js
import { combineReducers, createStore } from "redux";

// actions.js

export const setEvent = event => ({
  type: "SET_EVENT",
  event: event
});

export const setEventImgUrl = (index, imgUrl) => ({
  type: "SET_EVENT_IMGURL",
  index: index,
  imgUrl: imgUrl
});

INITIAL_STATE = {
  eventsAll: new Array(),
  guerrillaEvents: new Array(),
  constantEvents: new Array()
};

// reducers.js
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_EVENT":
      return {
        ...state,
        eventsAll: state.eventsAll.concat(action.event),
        guerrillaEvents: action.event.guerrilla
          ? state.guerrillaEvents.concat(action.event)
          : state.guerrillaEvents,
        constantEvents: action.event.guerrilla
          ? state.constantEvents
          : state.constantEvents.concat(action.event)
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

// store.js
export const store = createStore(reducers);
