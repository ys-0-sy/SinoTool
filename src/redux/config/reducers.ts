import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Notifications } from "expo";
import moment from "moment";

import {
  ConfigActions,
  ConfigInitialState,
  IConfigState,
  IConfigPayload
} from ".";

const convertToMoment = (time: String): moment.Moment => {
  return moment(moment().format("YYYY-MM-DD ") + time);
};

const isFuture = (time: string): boolean => {
  return 0 <= convertToMoment(time).diff(moment());
};

export const configReducer = reducerWithInitialState(ConfigInitialState).case(
  ConfigActions.toggleNotificationState,
  (state: Readonly<IConfigState>): IConfigState => {
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
  }
);
