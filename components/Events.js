import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Timer } from "./Timer";
import firebase from "../firebase";

export class Events extends Component {
  constructor(props) {
    super(props);
  }

  isUndefined = valiable => {
    return typeof valiable === "undefined";
  };

  render() {
    return (
      <View>
        {this.props.events.map(event => {
          if (this.isUndefined(event) || this.isUndefined(event.imgUrl)) {
            return (
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={require("../assets/event1.png")}
                />
                <Timer />
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={{ uri: event.imgUrl }}
                  loadingIndicatorSource={require("../assets/event1.png")}
                />
                <Timer endDate={event.endDate} />
              </View>
            );
          }
        })}
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
