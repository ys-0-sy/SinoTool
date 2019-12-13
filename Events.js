import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Timer } from "./components/Timer";

export class Events extends Component {
  constructor(props) {
    super(props);
  }

  event = props => {
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/event1.png")} />
      <Timer endDate={this.props.endDate} />
    </View>;
  };

  isPrimitive = () => {
    console.log(this.props.events.length === 0);
    if (this.props.events.length !== 0) {
      return <Text>"not 0"</Text>;
    } else {
      return <Text>"aa"</Text>;
    }
  };

  render() {
    return <View>{this.isPrimitive()}</View>;
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 75,
    resizeMode: "contain"
  },
  container: {
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
    margin: 3
  }
});
