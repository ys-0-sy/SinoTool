import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Event } from "./components/Event";

export class GuerrillaEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guerrillaTime: ["1:30", "2:30", "8:30", "12:00", "17:30", "20:30", "23:30"]
    }
  }

  render() {
    return (
      <View style={styles.content_block}>
        <Text style={styles.title_bold}>討伐イベント</Text>
        <View style={styles.base_box}>
          {this.props.events.map(event => {
            if (event.endDate >= Date.now()) {
              return <Event event={event} />;
            }
          })}
          <View style={styles.base_box, { flexDirection: 'row' }}>
            {this.state.guerrillaTime.map(time => {
              return (
                <Text style={styles.text_small_bold}>
                  {time}
                </Text>
              )
            })}
          </View>
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
    flex: 1,
    fontSize: 13,
    color: "#140505",
    fontWeight: "bold",
    fontFamily: "Didot",
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
