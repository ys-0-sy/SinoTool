import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("config");

export interface IConfigPayload {}

export const ConfigActions = {
  toggleNotificationState: actionCreator("toggleNotificationState")
};
