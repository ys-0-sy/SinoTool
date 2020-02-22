import { reducerWithInitialState } from "typescript-fsa-reducers";

import {
  IEventsPayload,
  IImgEventsPayload,
  EventActions,
  IEventsState,
  EventsInitialState
} from ".";
import { GuerrillaEvent } from "./states";

export const eventsReducer = reducerWithInitialState(EventsInitialState)
  .case(
    EventActions.setEvent,
    (
      state: Readonly<IEventsState>,
      payload: Readonly<IEventsPayload>
    ): IEventsState => {
      return {
        ...state,
        eventsAll: state.eventsAll.concat(payload.event),
        guerrillaEvents: state.guerrillaEvents.concat(
          payload.event.filter(event => event.isGuerrilla) as GuerrillaEvent[]
        ),
        constantEvents: state.constantEvents.concat(
          payload.event.filter(event => !event.isGuerrilla)
        )
      };
    }
  )
  .case(
    EventActions.setEventImgUrl,
    (
      state: Readonly<IEventsState>,
      payload: Readonly<IImgEventsPayload>
    ): IEventsState => {
      const newEvent = [
        ...state.eventsAll.slice(0, payload.index),
        Object.assign({}, state.eventsAll[payload.index], {
          imgUrl: payload.imgUrl
        }),
        ...state.eventsAll.slice(payload.index + 1)
      ];
      return Object.assign({}, state, {
        eventsAll: newEvent,
        guerrillaEvents: newEvent.filter(event => event.isGuerrilla),
        constantEvents: newEvent.filter(event => !event.isGuerrilla)
      });
    }
  )
  .case(
    EventActions.setGuerrillaListImgUrl,
    (
      state: Readonly<IEventsState>,
      payload: Readonly<IImgEventsPayload>
    ): IEventsState => {
      const newGuerrillaEvents = [
        ...state.eventsAll.slice(0, payload.index),
        Object.assign({}, state.eventsAll[payload.index], {
          guerrilla: {
            ...state.eventsAll[payload.index].guerrilla,
            imgUrl: payload.imgUrl
          }
        }),
        ...state.eventsAll.slice(payload.index + 1)
      ];
      return Object.assign({}, state, {
        eventsAll: newGuerrillaEvents,
        guerrillaEvents: newGuerrillaEvents.filter(event => event.isGuerrilla)
      });
    }
  );
