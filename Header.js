import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

export class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Schedule</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#801E00",
    height: 100
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 55,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Didot"
  }
});
