import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Switch } from "react-native";
import { RenderEvent } from "./RenderEvent";
import { GuerrillaTimer } from "./GuerrillaTimer";
import { IInitialState } from "../redux/states";
import { ConfigActions } from "../redux/config/actions";

const guerrillaEventsSelector = (state: IInitialState) =>
  state.events.guerrillaEvents;
const notificationStateSelector = (state: IInitialState) =>
  state.config.notificationState;

export const GuerrillaEvents: React.FC = () => {
  const dispatch = useDispatch();
  const guerrillaEvents = useSelector(guerrillaEventsSelector);
  const notificationState = useSelector(notificationStateSelector);

  const limitDate = new Date();
  limitDate.setMonth(limitDate.getMonth() + 1);
  return (
    <View style={styles.content_block}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.title_bold, { flex: 5 }]}>討伐イベント</Text>
        <Text style={[styles.title_bold, { flex: 1 }]}>通知</Text>
        <Switch
          style={{ flex: 1, alignItems: "flex-end", height: 15 }}
          value={notificationState}
          onValueChange={v => {
            dispatch(ConfigActions.toggleNotificationState());
          }}
        />
      </View>
      <View style={styles.base_box}>
        {guerrillaEvents.map(event => {
          if (
            event.endDate.getTime() >= Date.now() &&
            event.startDate.getTime() <= Date.now() &&
            event.endDate <= limitDate
          ) {
            return (
              <View>
                <RenderEvent key={event.id} event={event} />
                <GuerrillaTimer key={event.id} guerrilla={event.guerrilla} />
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content_block: {
    margin: 10,
    marginTop: 30,
    paddingBottom: 100
  },
  text_small_bold: {
    width: 75,
    fontSize: 15,
    color: "#140505",
    fontWeight: "bold",
    fontFamily: "Didot",
    textAlign: "center"
  },
  title_bold: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Didot"
  },
  base_box: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#707070",
    padding: 3
  }
});
