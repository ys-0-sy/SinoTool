import {
  setEvent,
  setEventImgUrl,
  setGuerrillaList,
  setGuerrillaListImgUrl,
  toggleNotificationState
} from "./actions";

import { Notifications } from "expo";
import moment from "moment";

// reducers.js
EVENT_INITIAL_STATE = {
  eventsAll: new Array(),
  guerrillaEvents: new Array(),
  constantEvents: new Array(),
  guerrillaList: new Array()
};

export const events = (state = EVENT_INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_EVENT":
      console.log(state);
      return {
        ...state,
        eventsAll: state.eventsAll.concat(action.event),
        guerrillaEvents: state.guerrillaEvents.concat(
          action.event.filter(event => {
            return event.isGuerrilla;
          })
        ),
        constantEvents: state.constantEvents.concat(
          action.event.filter(event => {
            return !event.isGuerrilla;
          })
        )
      };
    case "SET_EVENT_IMGURL":
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
    case "SET_GUERRILLALIST":
      return {
        ...state,
        guerrillaList: state.guerrillaList.concat(action.event)
      };
    case "SET_GUERRILLALIST_IMGURL":
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

CONFIG_INITIAL_STATE = {
  notificationState: false,
  guerrillaTime: ["01:30", "02:30", "08:30", "12:00", "17:30", "20:30", "23:30"]
};

export const config = (state = CONFIG_INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_NOTIFICATION_STATE":
      convertToMoment = time => {
        return moment(moment().format("YYYY-MM-DD ") + time);
      };

      isFuture = time => {
        return 0 <= this.convertToMoment(time).diff(moment());
      };
      if (!state.notificationState) {
        state.guerrillaTime.map(time => {
          notifTime = this.isFuture(time)
            ? this.convertToMoment(time)
            : this.convertToMoment(time).add(1, "days");
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
