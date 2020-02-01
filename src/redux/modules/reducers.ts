import * as creators from "./actionCreators";
import * as types from "./actionTypes";
import { CreatorsToActions } from "./creatorsToActions";
import { Notifications } from "expo";
import moment from "moment";

type EventsState = {
  eventsAll: creators.Event[];
  guerrillaEvents: creators.Event[];
  constantEvents: creators.Event[];
};
type Actions = CreatorsToActions<typeof creators>;

// reducers.js
const initalEventsState: EventsState = {
  eventsAll: new Array(),
  guerrillaEvents: new Array(),
  constantEvents: new Array()
};

export const events = (
  state: EventsState = initalEventsState,
  action: Actions
): EventsState => {
  switch (action.type) {
    case types.SET_EVENT:
      return {
        ...state,
        eventsAll: state.eventsAll.concat(action.event),
        guerrillaEvents: action.event.isGuerrilla
          ? state.guerrillaEvents.concat(action.event)
          : state.guerrillaEvents,
        constantEvents: !action.event.isGuerrilla
          ? state.constantEvents.concat(action.event)
          : state.constantEvents
      };
    case types.SET_EVENT_IMGURL:
      const newEvent = [
        ...state.eventsAll.slice(0, action.index),
        Object.assign({}, state.eventsAll[action.index], {
          imgUrl: action.imgUrl
        }),
        ...state.eventsAll.slice(action.index + 1)
      ];
      return Object.assign({}, state, {
        eventsAll: newEvent,
        guerrillaEvents: newEvent.filter(event => event.isGuerrilla),
        constantEvents: newEvent.filter(event => !event.isGuerrilla)
      });
    case types.SET_GUERRILLALIST_IMGURL:
      const newGuerrillaEvents = [
        ...state.eventsAll.slice(0, action.index),
        Object.assign({}, state.eventsAll[action.index], {
          guerrilla: {
            ...state.eventsAll[action.index].guerrilla,
            imgUrl: action.imgUrl
          }
        }),
        ...state.eventsAll.slice(action.index + 1)
      ];
      return Object.assign({}, state, {
        eventsAll: newGuerrillaEvents,
        guerrillaEvents: newGuerrillaEvents.filter(event => event.isGuerrilla)
      });
    default:
      return state;
  }
};

type ConfigState = {
  notificationState: boolean;
  guerrillaTime: string[];
};

const CONFIG_INITIAL_STATE = {
  notificationState: false,
  guerrillaTime: ["01:30", "02:30", "08:30", "12:00", "17:30", "20:30", "23:30"]
};

export const config = (
  state: ConfigState = CONFIG_INITIAL_STATE,
  action: Actions
) => {
  switch (action.type) {
    case "TOGGLE_NOTIFICATION_STATE":
      const convertToMoment = (time: String) => {
        return moment(moment().format("YYYY-MM-DD ") + time);
      };

      const isFuture = time => {
        return 0 <= convertToMoment(time).diff(moment());
      };
      if (!state.notificationState) {
        state.guerrillaTime.map(time => {
          const notifTime = isFuture(time)
            ? convertToMoment(time)
            : convertToMoment(time).add(1, "days");
          Notifications.scheduleLocalNotificationAsync(
            { title: "討伐時間のお知らせ", body: "討伐開始です！" },
            {
              time: notifTime.toDate(),
              repeat: "day"
            }
          );
        });
      } else {
        Notifications.cancelAllScheduledNotificationsAsync();
      }
      return {
        ...state,
        notificationState: !state.notificationState
      };
    default:
      return state;
  }
};
