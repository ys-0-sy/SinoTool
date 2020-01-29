import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Event from "./Event";
import { connect } from "react-redux";

export class ConstantEvents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const limitDate = new Date();
    limitDate.setMonth(limitDate.getMonth() + 1);
    return (
      <View style={styles.content_block}>
        <Text style={styles.title_bold}>開催中のイベント</Text>
        <View style={styles.base_box}>
          {this.props.constantEvents.map(event => {
            if (
              event.endDate >= Date.now() &&
              event.startDate <= Date.now() &&
              event.endDate <= limitDate
            ) {
              return <Event key={event.name} event={event} />;
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

const mapStateToProps = state => {
  return {
    constantEvents: state.events.constantEvents
  };
};

export default connect(mapStateToProps)(ConstantEvents);