import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IInitialState } from "../redux/states";

type Props = {
  guerrilla: {
    AreaID: string[];
    BannerResource: string[];
    EnemyID: string;
    ID: string;
    KindID: string;
    Name: string;
    NightmareID: string;
    image: string[];
    imgUrl?: string;
  };
};

const guerrillaTimeSelector = (state: IInitialState) =>
  state.config.guerrillaTime;

export const GuerrillaTimer: React.FC<Props> = props => {
  const [date, setdate] = useState("--:--");
  const [nextTime, setNextTime] = useState(moment().add(1, "months"));

  const guerrillaTime = useSelector(guerrillaTimeSelector);
  const refNextTime = useRef(nextTime);

  const nextGuerrillaTime = (): moment.Moment => {
    let nextTime = moment().add(1, "months");
    guerrillaTime.forEach((time: string): void => {
      if (isFuture(time) && compareWithTime(time, nextTime)) {
        nextTime = convertToMoment(time);
      }
    });
    return nextTime;
  };
  const styleGuerrilla = (time: string) => {
    return isFuture(time)
      ? styles.text_small_bold
      : isNow(time)
      ? styles.text_small_bold_red
      : styles.text_small_bold_unhilight;
  };
  const zeroPadding = (num: number): string => {
    return ("00" + num).slice(-2);
  };

  const convertToMoment = (time: string): moment.Moment => {
    return moment(moment().format("YYYY-MM-DD ") + time);
  };

  const isFuture = (time: string): boolean => {
    return 0 <= convertToMoment(time).diff(moment());
  };

  const compareWithTime = (time: string, nextTime: moment.Moment): boolean => {
    return 0 >= convertToMoment(time).diff(nextTime);
  };

  const isNow = (time: string): boolean => {
    return 0 <= convertToMoment(time).diff(moment().subtract(30, "m"));
  };

  const diffCurrentTime = (targetDate: moment.Moment): string => {
    const diffTime = moment(targetDate).diff(moment(), "days", true);
    const day = Math.floor(diffTime);
    const dayDiff = (diffTime - day) * 24;
    const hour = Math.floor(dayDiff);
    const hourDiff = (dayDiff - hour) * 60;
    const minute = Math.floor(hourDiff);
    const minuteDiff = (hourDiff - minute) * 60;
    const second = Math.floor(minuteDiff);
    return `${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(second)}`;
  };

  const isUndefined = (valiable: any): boolean => {
    return typeof valiable === "undefined";
  };

  const guerrillaIcon = (): string => {
    const url = props.guerrilla.imgUrl;
    return url;
  };

  useEffect(() => {
    refNextTime.current = nextGuerrillaTime();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setdate(diffCurrentTime(refNextTime.current));
    }, 1000 * 1);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 5 }}>
        <View style={[styles.base_box]}>
          <View style={[{ flexDirection: "row", borderWidth: 0 }]}>
            {guerrillaTime.map((time, index) => {
              if (index <= 3) {
                return (
                  <Text
                    style={[styles.guerrilla_time, styleGuerrilla(time)]}
                    key={time}
                  >
                    {time}
                  </Text>
                );
              }
            })}
          </View>

          <View style={[{ flexDirection: "row", borderWidth: 0 }]}>
            {guerrillaTime.map((time, index) => {
              if (index > 3) {
                return (
                  <Text
                    style={[styles.guerrilla_time, styleGuerrilla(time)]}
                    key={time}
                  >
                    {time}
                  </Text>
                );
              }
            })}
          </View>
        </View>
        <View style={[styles.base_box, styles.guerrilla_box]}>
          <Text style={styles.text_small_bold}>次回開始まで　{date}</Text>
        </View>
      </View>
      {!isUndefined(props.guerrilla.imgUrl) ? (
        <Image style={styles.icon_image} source={{ uri: guerrillaIcon() }} />
      ) : (
        <ActivityIndicator
          style={styles.icon_loading}
          size="large"
          color="#000000"
        />
      )}
    </View>
  );
};

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
  },
  icon_image: {
    flex: 2,
    height: 75,
    width: 75,
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  icon_loading: {
    flex: 2,
    height: 75,
    width: 75,
    backgroundColor: "#dddddd"
  },
  guerrilla_box: {
    margin: 5,
    marginRight: 30,
    marginLeft: 30,
    padding: 5,
    paddingBottom: 0,
    borderRadius: 14
  }
});
