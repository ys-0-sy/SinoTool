import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Switch } from "react-native";
import Event from "./Event";
import { GuerrillaTimer } from "./GuerrillaTimer";
import { IInitialState } from "../redux/states";
import { ConfigActions } from "../redux/config/actions";

type GuerrillaEventsProps = {};

const guerrillaEventsSelector = (state: IInitialState) =>
  state.events.guerrillaEvents;
const notificationStateSelector = (state: IInitialState) =>
  state.config.notificationState;

const GuerrillaEvents: React.FC<GuerrillaEventsProps> = props => {
  const dispatch = useDispatch();
  const guerrillaEvents = useSelector(guerrillaEventsSelector);
  const notificationState = useSelector(notificationStateSelector);

  const toggleNotificationState = () =>
    dispatch(ConfigActions.toggleNotificationState);
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
          onValueChange={toggleNotificationState}
        />
      </View>
      <View style={styles.base_box}>
        {guerrillaEvents.map(event => {
          if (
            event.endDate >= Date.now() &&
            event.startDate <= Date.now() &&
            event.endDate <= limitDate
          ) {
            return (
              <View>
                <Event key={event.id} event={event} />
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

const mapStateToProps = state => {
  return {
    guerrillaEvents: state.events.guerrillaEvents,
    notificationState: state.config.notificationState
  };
};

export default connect(mapStateToProps)(GuerrillaEvents);
