// actions.js
type Event = {
  id: string;
  endDate: firebase.firestore.Timestamp;
  image: string;
  isGuerrilla: boolean;
  name: string;
  startDate: firebase.firestore.Timestamp;
};

interface SetEventAction {
  type: string;
  event: Event;
}

export const setEvent = (event: Event) =>
  <SetEventAction>{
    type: "SET_EVENT",
    event: event
  };

export const setEventImgUrl = (index: number, imgUrl: string) => ({
  type: "SET_EVENT_IMGURL",
  index: index,
  imgUrl: imgUrl
});

export const setGuerrillaList = (event: Event) => ({
  type: "SET_GUERRILLALIST",
  event: event
});

export const setGuerrillaListImgUrl = (index: number, imgUrl: string) => ({
  type: "SET_GUERRILLALIST_IMGURL",
  index: index,
  imgUrl: imgUrl
});

interface ToggleNotificationState {
  type: string;
}

export const toggleNotificationState = () =>
  <ToggleNotificationState>{
    type: "TOGGLE_NOTIFICATION_STATE"
  };
