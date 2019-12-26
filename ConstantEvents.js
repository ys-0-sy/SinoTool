import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Event } from "./components/Event";

export class ConstantEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasData: false
    };
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.content_block}>
        <Text style={styles.title_bold}>開催中のイベント</Text>
        <View style={styles.base_box}>
          {this.props.events.map(event => {
            if (event.endDate <= Date.now()) {
              return <Event key={event} event={event} />;
            }
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content_block: {
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
