import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Image } from "react-native";
import moment, { months } from "moment";
import { Notifications } from "expo";

export class GuerrillaTimer extends Component {
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

  zeroPadding = num => {
    return ("00" + num).slice(-2);
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

  diffCurrentTime = targetDate => {
    const diffTime = moment(targetDate).diff(moment(), "days", true);
    const day = Math.floor(diffTime);
    const dayDiff = (diffTime - day) * 24;
    const hour = Math.floor(dayDiff);
    const hourDiff = (dayDiff - hour) * 60;
    const minute = Math.floor(hourDiff);
    const minuteDiff = (hourDiff - minute) * 60;
    const second = Math.floor(minuteDiff);
    return `${this.zeroPadding(hour)}:${this.zeroPadding(
      minute
    )}:${this.zeroPadding(second)}`;
  };

  guerrillaIcon = () => {
    const url = this.props.guerrilla.imgUrl;
    return url;
  };

  componentDidMount() {
    const nextGuerrillaTime = this.nextGuerrillaTime();
    this.setState({ nextTime: nextGuerrillaTime });

    this.state.guerrillaTime.map(time => {
      Notifications.scheduleLocalNotificationAsync(
        { title: "討伐時間のお知らせ", body: "討伐開始です！" },
        {
          time: moment(moment().format("YYYY-MM-DD ") + time).toDate(),
          repeat: "day"
        }
      );
    });

    setInterval(() => {
      this.setState({
        date: this.diffCurrentTime(this.state.nextTime)
      });
    }, 1000 * 1);
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
                margin: 5,
                marginRight: 30,
                marginLeft: 30,
                padding: 5,
                paddingBottom: 0,
                borderRadius: 14,
                textAlign: "center"
              }
            ]}
          >
            <Text style={styles.text_small_bold}>
              次回開始まで　{this.state.date}
            </Text>
          </View>
        </View>

        <Image
          style={{ flex: 2, height: 75, resizeMode: "contain" }}
          source={{ uri: this.guerrillaIcon() }}
          loadingIndicatorSource={require("../assets/pinokio.png")}
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
    padding: 3,
    marginLeft: 5
  }
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(GuerrillaTimer);