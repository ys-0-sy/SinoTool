import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Timer } from "./components/Timer";

export class Events extends Component {
  render() {
    return (
      <View style={styles.base_box}>
        <View style={styles.content_box}>
          <Timer />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base_box: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#707070"
  },
  content_box: {
    margin: 10
  }
});
