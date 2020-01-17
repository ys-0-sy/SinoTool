import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "--日 --:--"
    };
  }

  zeroPadding = num => {
    return ("00" + num).slice(-2);
  };

  diffCurrentTime = targetDate => {
    if (this.isUndefined(targetDate)) {
      return "-日 --:--";
    } else {
      const diffTime = moment(targetDate).diff(moment(), "days", true);
      const day = Math.floor(diffTime);
      const dayDiff = (diffTime - day) * 24;
      const hour = Math.floor(dayDiff);
      const hourDiff = (dayDiff - hour) * 60;
      const minute = Math.floor(hourDiff);
      return `${day}日 ${this.zeroPadding(hour)}:${this.zeroPadding(minute)}`;
    }
  };

  isUndefined = valiable => {
    return typeof valiable === "undefined";
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        date: this.diffCurrentTime(this.props.endDate)
      });
    }, 1000 * 30);
  }

  render() {
    return (
      <View style={styles.base_box}>
        <Text style={styles.text_small_bold}>終了まで</Text>
        <View style={styles.timer_box}>
          <Text style={styles.text_small_bold}>{this.state.date}</Text>
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
    padding: 5,
    margin: 5,
    marginRight: 0,
    width: 100,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  timer_box: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#707070",
    paddingRight: 10,
    paddingLeft: 10
  },
  text_small_bold: {
    fontSize: 13,
    color: "#140505",
    fontWeight: "bold",
    fontFamily: "Didot",
    marginTop: 3,
    textAlign: "center"
  }
});
