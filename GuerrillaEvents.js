import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Event } from "./components/Event";
import { GuerrillaTime } from "./components/GuerrillaTime";

export class GuerrillaEvents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.content_block}>
        <Text style={styles.title_bold}>討伐イベント</Text>
        <View style={styles.base_box}>
          {this.props.events.map(event => {
            if (event.endDate <= Date.now()) {
              return <Event key={event} event={event} />;
            }
          })}
          <GuerrillaTime />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content_block: {
    margin: 10,
    marginTop: 30,
    paddingBottom: 10
  },
  text_small_bold: {
    width: 75,
    fontSize: 15,
    color: "#140505",
    fontWeight: "bold",
    fontFamily: "Didot",
    textAlign: "center"
  },
  title_bold: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Didot"
  },
  base_box: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#707070",
    padding: 3
  }
});
