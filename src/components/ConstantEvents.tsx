import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RenderEvent } from "./RenderEvent";
import { useSelector } from "react-redux";
import { IInitialState } from "../redux/states";

const constantEventsSelector = (state: IInitialState) =>
  state.events.constantEvents;

export const ConstantEvents: React.FC = () => {
  const constantEvents = useSelector(constantEventsSelector);
  const limitDate = new Date();
  limitDate.setMonth(limitDate.getMonth() + 1);
  return (
    <View style={styles.content_block}>
      <Text style={styles.title_bold}>開催中のイベント</Text>
      <View style={styles.base_box}>
        {constantEvents.map(event => {
          if (
            event.endDate.getTime() >= Date.now() &&
            event.startDate.getTime() <= Date.now() &&
            event.endDate <= limitDate
          ) {
            return <RenderEvent key={event.name} event={event} />;
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
    marginBottom: 0
  },
  title_bold: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Didot"
  },
  base_box: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#707070",
    padding: 3
  }
});
