import { IInitialState } from "../states";

export const eventsAllSelector = (state: IInitialState) =>
  state.events.eventsAll;

export const constantEventsSelector = (state: IInitialState) =>
  state.events.constantEvents;

export const guerrillaEventsSelector = (state: IInitialState) =>
  state.events.guerrillaEvents;
