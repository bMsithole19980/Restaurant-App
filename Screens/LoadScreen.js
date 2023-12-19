// LoadScreen.js

import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import imageg from "../assets/landing.jpg";
import { useNavigation } from "@react-navigation/native";

export default function LoadScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("AuthStack"); // Navigate to the AuthStack
  };

  return (
    <View style={styles.container}>
      <Image source={imageg} style={styles.dish} />
      <Text style={styles.Header}>Food Delivery At Your doorstep</Text>
      <Text style={styles.headerLow}>Home delivery and online reservation system</Text>
      <TouchableOpacity style={styles.Button} onPress={handleGetStarted}>
        <Text style={styles.btnText}>Let's Explore</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    padding: 30,
    backgroundColor: "#62C772",
  },
  dish: {
    width: 200,
    height: 200,
    borderRadius: 150,
    alignSelf: "center",
    top: 50,
  },
  Header: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 30 * 1.2,
    textAlign: "center",
    top: 100,
  },
  headerLow: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 16,
    top: 100,
    textAlign: "center",
  },
  Button: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    top: 250,
  },
  btnText: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#62C772",
    fontSize: 24,
  },
});
