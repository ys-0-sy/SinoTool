import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

export class Timer extends Component {
  render() {
    return (
      <View style={styles.base_box}>
        <Text style={styles.text_small_bold}>終了まで</Text>
        <View style={styles.timer_box}>
          <Text style={styles.text_small_bold}>--日 --:--</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base_box: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#707070",
    padding: 0,
    width: 100,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  timer_box: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#707070",
    padding: 0,
    width: 60
  },
  text_small_bold: {
    fontSize: 9,
    color: "#140505",
    fontWeight: "bold",
    fontFamily: "Didot",
    marginTop: 3,
    textAlign: "center"
  }
});
