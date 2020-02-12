import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment";

type Props = {
  endDate: Date;
};

export const Timer: React.FC<Props> = props => {
  const [date, setDate] = useState("--日 --:--");
  const zeroPadding = (num: number): string => {
    return ("00" + num).slice(-2);
  };

  const diffCurrentTime = (targetDate: Date | undefined): string => {
    if (isUndefined(targetDate)) {
      return "-日 --:--";
    } else {
      const diffTime = moment(targetDate).diff(moment(), "days", true);
      const day = Math.floor(diffTime);
      const dayDiff = (diffTime - day) * 24;
      const hour = Math.floor(dayDiff);
      const hourDiff = (dayDiff - hour) * 60;
      const minute = Math.floor(hourDiff);
      return `${day}日 ${zeroPadding(hour)}:${zeroPadding(minute)}`;
    }
  };

  const isUndefined = (valiable: any): boolean => {
    return typeof valiable === "undefined";
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(diffCurrentTime(props.endDate));
    }, 1000 * 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.base_box}>
      <Text style={styles.text_small_bold}>終了まで</Text>
      <View style={styles.timer_box}>
        <Text style={styles.text_small_bold}>{date}</Text>
      </View>
    </View>
  );
};

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
