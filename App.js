import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./Header";
import { Events } from "./Events";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content_block}>
          <Text style={styles.title_bold}>開催中のイベント</Text>
          <Events />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content_block: {
    height: 300,
    margin: 10,
    marginTop: 30
  },
  title_bold: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Didot"
  }
});
