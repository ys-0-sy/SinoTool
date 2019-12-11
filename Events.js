import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Timer } from "./components/Timer";

export class Events extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("./assets/event1.png")} />
        <Timer endDate={this.props.endDate} />
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
