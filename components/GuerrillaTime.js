import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import moment, { months } from "moment";
import { Notifications } from "expo";

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
        "18:05",
        "20:30",
        "23:30"
      ],
      date: "--:--",
      nextTime: moment().add(1, "months")
    };
  }

  nextGuerrillaTime = () => {
    let nextTime = moment().add(1, "months");
    this.state.guerrillaTime.forEach(time => {
      if (this.isFuture(time) && this.compareWithTime(time, nextTime)) {
        nextTime = moment(moment().format("YYYY-MM-DD ") + time);
      }
    });
    return nextTime;
  };

  diffCurrentTime = targetDate => {
    if (this.isUndefined(targetDate)) {
      return "-日 --:--";
    } else {
      const diffTime = moment(targetDate).diff(moment(), "days", true);
      const secondDiff = hourDiff * 60;
      const day = Math.floor(diffTime);
      const dayDiff = (diffTime - day) * 60;
      const hour = Math.floor(dayDiff);
      const hourDiff = (dayDiff - hour) * 60;
      const minute = Math.floor(hourDiff);
      return `${day}日 ${this.zeroPadding(hour)}:${this.zeroPadding(minute)}`;
    }
  };

  isFuture = time => {
    //console.log(moment(moment().format("YYYY-MM-DD ") + time).diff(moment()));
    return 0 <= moment(moment().format("YYYY-MM-DD ") + time).diff(moment());
  };

  compareWithTime = (time, nextTime) => {
    return 0 >= moment(moment().format("YYYY-MM-DD ") + time).diff(nextTime);
  };

  isNow = time => {
    return (
      0 <=
      moment(moment().format("YYYY-MM-DD ") + time).diff(
        moment().subtract(30, "m")
      )
    );
  };

  componentDidMount() {
    const nextGuerrillaTime = this.nextGuerrillaTime();
    this.setState({ nextTime: nextGuerrillaTime });

    Notifications.scheduleLocalNotificationAsync(
      { title: "SinoTool 討伐時間のお知らせ", body: "討伐開始です！" },
      {
        time: nextGuerrillaTime.toDate()
      }
    );
    console.log(nextGuerrillaTime);
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 5 }}>
          <View style={[styles.base_box]}>
            <View style={[{ flexDirection: "row", borderWidth: 0 }]}>
              {this.state.guerrillaTime.map((time, index) => {
                if (index <= 3) {
                  return (
                    <Text
                      style={[
                        styles.guerrilla_time,
                        this.isFuture(time)
                          ? styles.text_small_bold
                          : this.isNow(time)
                          ? styles.text_small_bold_red
                          : styles.text_small_bold_unhilight
                      ]}
                      key={time}
                    >
                      {time}
                    </Text>
                  );
                }
              })}
            </View>

            <View style={[{ flexDirection: "row", borderWidth: 0 }]}>
              {this.state.guerrillaTime.map((time, index) => {
                if (index > 3) {
                  return (
                    <Text
                      style={[
                        styles.guerrilla_time,
                        this.isFuture(time)
                          ? styles.text_small_bold
                          : this.isNow(time)
                          ? styles.text_small_bold_red
                          : styles.text_small_bold_unhilight
                      ]}
                      key={time}
                    >
                      {time}
                    </Text>
                  );
                }
              })}
            </View>
          </View>
          <View
            style={[
              styles.base_box,
              {
                flexDirection: "row",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                margin: 5,
                marginRight: 30,
                marginLeft: 30,
                borderRadius: 30
              }
            ]}
          >
            <Text
              style={[styles.text_small_bold, { flex: 1, textAlign: "center" }]}
            >
              次回開始まで
            </Text>
            <Text style={[styles.text_small_bold, { flex: 1 }]}>
              {this.state.date}
            </Text>
          </View>
        </View>
        <Image
          style={{ flex: 2, height: 75, resizeMode: "contain" }}
          source={require("../assets/pinokio.png")}
        />
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
    fontSize: 15,
    color: "#140505",
    fontWeight: "bold",
    fontFamily: "Didot",
    textAlign: "center"
  },
  guerrilla_time: {
    flex: 1
  },
  text_small_bold_unhilight: {
    fontSize: 15,
    color: "#707070",
    fontWeight: "bold",
    fontFamily: "Didot",
    textAlign: "center"
  },
  text_small_bold_red: {
    fontSize: 15,
    color: "#9c0000",
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
