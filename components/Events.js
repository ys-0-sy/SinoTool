import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlightBase
} from "react-native";
import { Timer } from "./Timer";
import firebase from "../firebase";

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReadytoFetchData: false
    };
  }

  isUndefined = valiable => {
    return typeof valiable === "undefined";
  };

  componentWillUpdate() {
    if (
      !this.isUndefined(this.props.event) ||
      !this.isUndefined(this.props.event.imgUrl)
    ) {
      this.setState({ isReadytoFetchData: true });
    }
  }

  render() {
    const isReadytoFetchData = this.state.isReadytoFetchData;
    const event = this.props.event;
    let image;
    if (isReadytoFetchData) {
      image = <Image style={styles.image} source={{ uri: event.imgUrl }} />;
    } else {
      image = (
        <Image style={styles.image} source={require("../assets/event1.png")} />
      );
    }

    return (
      <View style={styles.container}>
        <Text>event</Text>
        {image}
        <Timer endDate={event.endDate} />
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
