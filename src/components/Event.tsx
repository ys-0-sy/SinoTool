import React, { Component } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import Timer from "./Timer";

interface EventProps {
  event: any;
}

export default class Event extends Component<EventProps> {
  constructor(props: EventProps) {
    super(props);
  }

  isUndefined = (valiable: any): boolean => {
    return typeof valiable === "undefined";
  };

  render() {
    const event = this.props.event;
    let image;
    if (!this.isUndefined(event.imgUrl)) {
      image = (
        <Image
          style={[styles.image, { backgroundColor: "#dddddd" }]}
          source={{ uri: event.imgUrl }}
        />
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
        <Timer endDate={this.props.event.endDate} />
      </View>
    );
  }
}

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
