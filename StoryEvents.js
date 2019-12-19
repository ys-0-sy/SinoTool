import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Events } from "./components/Events";

export class StoryEvents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.content_block}>
        <Text style={styles.title_bold}>開催中のイベント</Text>
        <View style={styles.base_box}>
          <Events events={this.props.events} />
        </View >
      </View>

    )
  }
}

const styles = StyleSheet.create({
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