import * as types from "./actionTypes";

// actions.js
export type Guerrilla = {
  AreaID: string[];
  BannerResource: string[];
  EnemyID: string;
  ID: string;
  KindID: string;
  Name: string;
  NightmareID: string;
  image: string[];
};
export type Event = {
  id: string;
  endDate: firebase.firestore.Timestamp;
  image: string;
  isGuerrilla: boolean;
  name: string;
  guerrilla?: Guerrilla;
  startDate: firebase.firestore.Timestamp;
};

export const setEvent = (event: Event) => {
  return { type: types.SET_EVENT, event: event };
};

export const setEventImgUrl = (index: number, imgUrl: string) => {
  return {
    type: types.SET_EVENT_IMGURL,
    index: index,
    imgUrl: imgUrl
  };
};

export const setGuerrillaListImgUrl = (index: number, imgUrl: string) => {
  return {
    type: types.SET_GUERRILLALIST_IMGURL,
    index: index,
    imgUrl: imgUrl
  };
};

export const toggleNotificationState = () => {
  return {
    type: types.TOGGLE_NOTIFICATION_STATE
  };
};
