import moment from "moment";
import React, { Component } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

interface GuerrillaTimerProps {
  guerrillaTime: string[];
  guerrilla: any;
}
interface GuerrillaTimerState {
  date: string;
  nextTime: moment.Moment;
}
export class GuerrillaTimer extends Component<
  GuerrillaTimerProps,
  GuerrillaTimerState
> {
  constructor(props: GuerrillaTimerProps) {
    super(props);
    this.state = {
      date: "--:--",
      nextTime: moment().add(1, "months")
    };
  }

  nextGuerrillaTime = (): moment.Moment => {
    let nextTime = moment().add(1, "months");
    this.props.guerrillaTime.forEach((time: string): void => {
      if (this.isFuture(time) && this.compareWithTime(time, nextTime)) {
        nextTime = this.convertToMoment(time);
      }
    });
    return nextTime;
  };

  zeroPadding = (num: number): string => {
    return ("00" + num).slice(-2);
  };

  convertToMoment = (time: string): moment.Moment => {
    return moment(moment().format("YYYY-MM-DD ") + time);
  };

  isFuture = (time: string): boolean => {
    return 0 <= this.convertToMoment(time).diff(moment());
  };

  compareWithTime = (time: string, nextTime: moment.Moment): boolean => {
    return 0 >= this.convertToMoment(time).diff(nextTime);
  };

  isNow = (time: string): boolean => {
    return 0 <= this.convertToMoment(time).diff(moment().subtract(30, "m"));
  };

  diffCurrentTime = (targetDate): string => {
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

  isUndefined = (valiable: any): boolean => {
    return typeof valiable === "undefined";
  };

  guerrillaIcon = (): string => {
    const url = this.props.guerrilla.imgUrl;
    return url;
  };

  componentDidMount() {
    this.setState({ nextTime: this.nextGuerrillaTime() });

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
              {this.props.guerrillaTime.map((time, index) => {
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
              {this.props.guerrillaTime.map((time, index) => {
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
                borderRadius: 14
              }
            ]}
          >
            <Text style={styles.text_small_bold}>
              次回開始まで　{this.state.date}
            </Text>
          </View>
        </View>
        {!this.isUndefined(this.props.guerrilla.imgUrl) ? (
          <Image
            style={[
              { flex: 2, height: 75, width: 75, resizeMode: "contain" },
              { backgroundColor: "#ffffff" }
            ]}
            source={{ uri: this.guerrillaIcon() }}
          />
        ) : (
          <ActivityIndicator
            style={[
              { flex: 2, height: 75, width: 75 },
              { backgroundColor: "#dddddd" }
            ]}
            size="large"
            color="#000000"
          />
        )}
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
  return {
    notificationState: state.config.notificationState,
    guerrillaTime: state.config.guerrillaTime
  };
};

export default connect(mapStateToProps)(GuerrillaTimer);
