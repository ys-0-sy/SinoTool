// redux.js
import { combineReducers, createStore } from "redux";

// actions.js

export const fetchEvents = event => ({
  type: "FETCH_EVENTS",
  event: event
});

INITIAL_STATE = {
  events: Array
};

// reducers.js
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_EVENTS":
      return { ...state, events: state.events.concat(action.event) };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  events: reducer
});

// store.js
export const store = createStore(reducers);

console.table(store.getState);
