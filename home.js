import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView
} from "react-native";
import { Header } from "./components/Header";
import { ConstantEvents } from "./ConstantEvents";
import { GuerrillaEvents } from "./GuerrillaEvents";
import { AppLoading, SplashScreen, Notifications } from "expo";
import { Asset } from "expo-asset";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import { connect } from "react-redux";
import { setEvent, setEventImgUrl } from "./src/containers/actions";
import { store } from "./src/containers/store";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSplashReady: false,
      isAppReady: false,
      scrollAreaHeight: Number,
      isNotificationPermitted: false
    };
  }

  componentDidUpdate() {
    if (this.props.eventsAll.length !== 0) {
      this.props.eventsAll.forEach((event, index) => {
        if (typeof event.imgUrl === "undefined") {
          const storageRef = firebase.storage().ref();
          return storageRef
            .child(event.image)
            .getDownloadURL()
            .then(url => {
              this.props.setEventImgUrl(index, url);
            });
        }
      });
    }
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
    }
  }

  render() {
    const constantEvents = this.props.constantEvents;
    const guerrillaEvents = this.props.guerrillaEvents;

    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() =>
            this.setState({
              isSplashReady: true
            })
          }
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }
    if (!this.state.isAppReady) {
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <Image
            source={require("./assets/images/splash.gif")}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header />
        <SafeAreaView>
          <ScrollView>
            <SafeAreaView
              style={{
                marginBottom: 100
              }}
            >
              <ConstantEvents events={constantEvents} />
              <GuerrillaEvents events={guerrillaEvents} />
              <Text>
                Notification Permission:
                {this.state.isNotificationPermitted ? "○" : "×"}
              </Text>
            </SafeAreaView>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  _cacheSplashResourcesAsync = async () => {
    const gif = require("./assets/images/splash.gif");
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    this.setState({
      isAppReady: true
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff"
  },
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

const mapStateToProps = state => ({
  eventsAll: state.events.eventsAll,
  constantEvents: state.events.constantEvents,
  guerrillaEvents: state.events.guerrillaEvents
});

const mapDispachToProps = {
  setEvent,
  setEventImgUrl
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
