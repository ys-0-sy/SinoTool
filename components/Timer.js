import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

export class Timer extends Component {
  render() {
    return (
      <View>
        <Text>test</Text>
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
