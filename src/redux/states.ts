import { ConfigInitialState, IConfigState } from "./config";
import { EventsInitialState, IEventsState } from "./events";

export interface IInitialState {
  events: Readonly<IEventsState>;
  config: Readonly<IConfigState>;
}

export const IntialState: IInitialState = {
  events: EventsInitialState,
  config: ConfigInitialState
};
