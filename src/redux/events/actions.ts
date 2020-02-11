import actionCreatorFactory from "typescript-fsa";
import { Event } from "./states";

const actionCreator = actionCreatorFactory("events");

export interface IEventsPayload {
  event: Event;
}

export type IImgEventsPayload = {
  index: number;
  imgUrl: string;
};

export const EventActions = {
  setEvent: actionCreator<IEventsPayload>("setEvent"),
  setEventImgUrl: actionCreator<IImgEventsPayload>("setEventImgUrl"),
  setGuerrillaListImgUrl: actionCreator<IImgEventsPayload>(
    "setGuerrillaListImgUrl"
  )
};
