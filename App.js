import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Header } from "./Header";
import { Events } from "./Events";
import firebase from "./firebase";
import firestore from "@firebase/firestore";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: new Array()
    };
  }
  fetchEventsData = async () => {
    const db = firebase.firestore();
    db.collection("events")
      .get()
      .then(snapshot => {
        snapshot.forEach(event => {
          this.setState({
            events: this.state.events.concat({
              name: event.data().name,
              endDate: new Date(event.data().endDate.seconds * 1000),
              imgPath: event.data().imgPath
            })
          });
          console.log(this.state.events);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  parseImgUrl = async (path) => {
    const storageRef = firebase.storage().ref()
    await storageRef.child(path)
      .getDownloadURL()
      .then((url) => {
        console.log(url)
        return url
      })
  }

  componentWillMount() {
    this.fetchEventsData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <SafeAreaView style={styles.content_block}>
          <Text style={styles.title_bold}>開催中のイベント</Text>
          <View style={styles.base_box}>
            <Events events={this.state.events} />
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.content_block}>
          <Text style={styles.title_bold}>討伐イベント</Text>
          <View style={styles.base_box}>
            <Events events={this.state.events} />
          </View>
        </SafeAreaView>
      </View>
    );
  }
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
