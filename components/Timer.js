import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "-日 --:--"
    };
  }

  diffCurrentTime = targetDate => {
    const diffTime = Math.floor((targetDate - new Date()) / 1000);
    const daySec = 60 * 60 * 24;
    const hourSec = 60;
    const minuteSec = 60;
    const second = diffTime % minuteSec;
    const minute = Math.floor(diffTime / minuteSec) % hourSec;
    const hour = Math.floor(diffTime / (hourSec * minuteSec)) % daySec;
    const day = Math.floor(diffTime / (hourSec * minuteSec * daySec));
    return `${day}日 ${hour}:${minute}`;
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        date: this.diffCurrentTime(this.props.endDate)
      });
    }, 1000);
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
    padding: 3,
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
    paddingRight: 15,
    paddingLeft: 15
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
