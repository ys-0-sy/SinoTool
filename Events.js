import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Timer } from "./components/Timer";
import firebase from "react-native-firebase";

export class Events extends Component {
  constructor(props) {
    super(props);
  }

  isUndefined = valiable => {
    return typeof valiable === "undefined";
  };

  url = path => {
    console.log(path);
    const storageRef = firebase.storage().ref();
    return storageRef
      .child(path)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        return url;
      });
  };
  render() {
    return (
      <View>
        {this.props.events.map(event => {
          console.log(this.url(event.imgPath));
          if (this.isUndefined(event)) {
            return (
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={require("./assets/event1.png")}
                />
                <Timer />
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={require("./assets/event1.png")}
                  loadingIndicatorSource={require("./assets/event1.png")}
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
