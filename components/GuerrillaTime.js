import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

export class GuerrillaTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guerrillaTime: [
        "01:30",
        "02:30",
        "08:30",
        "12:00",
        "17:30",
        "20:30",
        "23:30"
      ]
    };
  }

  isFuture = time => {
    return 0 <= moment(moment().format("YYYY-MM-DD ") + time).diff(moment());
  };

  render() {
    return (
      <View>
        <View style={(styles.base_box, { flexDirection: "row" })}>
          {this.state.guerrillaTime.map((time, index) => {
            if (index <= 3) {
              return (
                <Text
                  style={
                    this.isFuture(time)
                      ? styles.text_small_bold
                      : styles.text_small_bold_unhilight
                  }
                  key={time}
                >
                  {time}
                </Text>
              );
            }
          })}
        </View>
        <View style={(styles.base_box, { flexDirection: "row" })}>
          {this.state.guerrillaTime.map((time, index) => {
            if (index > 3) {
              return (
                <Text
                  style={
                    this.isFuture(time)
                      ? styles.text_small_bold
                      : styles.text_small_bold_unhilight
                  }
                  key={time}
                >
                  {time}
                </Text>
              );
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
  text_small_bold_unhilight: {
    width: 75,
    fontSize: 15,
    color: "#707070",
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
