import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Header } from "./Header";
import { Events } from "./Events";

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endDate: new Date(Date.UTC(2019, 11, 12, 3, 4, 5))
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <SafeAreaView style={styles.content_block}>
          <Text style={styles.title_bold}>開催中のイベント</Text>
          <View style={styles.base_box}>
            <Events endDate={this.state.endDate} />
            <Events />
            <Events />
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.content_block}>
          <Text style={styles.title_bold}>討伐イベント</Text>
          <View style={styles.base_box}>
            <Events />
          </View>
        </SafeAreaView>
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
    marginTop: 30,
    marginBottom: 0
  },
  title_bold: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Didot"
  },
  base_box: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#707070",
    padding: 3
  }
});
