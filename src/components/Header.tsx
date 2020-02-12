import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#801E00"
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 38,
    paddingBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Didot"
  }
});
