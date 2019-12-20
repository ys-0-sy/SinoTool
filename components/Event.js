import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlightBase
} from "react-native";
import { Timer } from "./Timer";

export class Event extends Component {
  constructor(props) {
    super(props);
  }

  isUndefined = valiable => {
    return typeof valiable === "undefined";
  };

  render() {
    const event = this.props.event;
    let image;
    console.log(this.isUndefined(event.imgUrl));
    if (!this.isUndefined(event.imgUrl)) {
      image = (
        <Image
          style={styles.image}
          source={{ uri: event.imgUrl }}
          loadingIndicatorSource={require("../assets/event1.png")}
        />
      );
    } else {
      image = (
        <Image style={styles.image} source={require("../assets/event1.png")} />
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
    resizeMode: "contain"
  },
  container: {
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
    margin: 3
  }
});
