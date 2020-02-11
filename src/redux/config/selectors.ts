import { IInitialState } from "../states";

export const notificationStateSelector = (state: IInitialState) =>
  state.config.notificationState;
export const guerrillaTimeSelector = (state: IInitialState) =>
  state.config.guerrillaTime;
