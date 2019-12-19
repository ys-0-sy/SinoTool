import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { Header } from "./components/Header";
import { Events } from "./components/Events";
import { StoryEvents } from "./StoryEvents"
import firebase from "./firebase";
import { AppLoading, SplashScreen } from "expo";
import { Asset } from "expo-asset";
import firestore from '@firebase/firestore'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: new Array(),
      isSplashReady: false,
      isAppReady: false
    };
  }

  componentDidUpdate() {
    this.state.events.forEach((event, index) => {
      if (typeof event.imgUrl === "undefined") {
        const storageRef = firebase.storage().ref();
        return storageRef
          .child(event.imgPath)
          .getDownloadURL()
          .then(url => {
            const newStateEvents = this.state.events
            newStateEvents[index].imgUrl = url
            this.setState({
              events: newStateEvents
            })
          });
      }
    })
  }

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }
    if (!this.state.isAppReady) {
      return (
        <View style={{ flex: 1 }}>
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
        <StoryEvents events={this.state.events} />
        <SafeAreaView style={styles.content_block}>
          <Text style={styles.title_bold}>討伐イベント</Text>
          <View style={styles.base_box}>
            <Events events={this.state.events} />
          </View>
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
    const db = firebase.firestore();
    const fetchDb = async () => {
      db.collection("events")
        .get()
        .then(snapshot => {
          snapshot.forEach(event => {
            const imgPath = event.data().image;
            this.setState({
              events: this.state.events.concat({
                name: event.data().name,
                endDate: new Date(event.data().endDate.seconds * 1000),
                imgPath: event.data().image
              })
            });
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    };
    await Promise.all(fetchDb());
    this.setState({ isAppReady: true });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content_block: {
    height: 300,
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
