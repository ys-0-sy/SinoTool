import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlightBase
} from "react-native";
import { Timer } from "./Timer";
import { Asset } from "expo-asset";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
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
