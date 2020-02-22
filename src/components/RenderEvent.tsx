import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Timer } from "./Timer";
import { Event } from "../redux/events";

type Props = {
  event: Event;
};

export const RenderEvent: React.FC<Props> = props => {
  const isUndefined = (valiable: any): boolean => {
    return typeof valiable === "undefined";
  };

  let image: JSX.Element;
  if (!isUndefined(props.event.imgUrl)) {
    image = (
      <Image style={[styles.image]} source={{ uri: props.event.imgUrl }} />
    );
  } else {
    image = (
      <ActivityIndicator
        style={[styles.image, { backgroundColor: "#dddddd" }]}
        size="large"
        color="#000000"
      />
    );
  }

  return (
    <View style={styles.container}>
      {image}
      <Timer endDate={props.event.endDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 75,
    width: 100,
    resizeMode: "contain"
  },
  container: {
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
    margin: 3
  }
});
