import { StyleSheet, Pressable, Image, Text, View } from "react-native";
import React from "react";
import User from '../assets/Ellipse.jpg'
import { useNavigation } from "@react-navigation/native";
import imageg from "../assets/burger.png";
import { HoverEffect } from "react-native-gesture-handler";

export default function LoadScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Foodies Spot</Text>
      <View style={styles.circlesContainer}>
        <View style={styles.circle}>
        <Image style={styles.user} source={User} alt="user"/>
          <View style={styles.strokeLine}>
          
          </View>
        </View>
        <View style={styles.circle2}>
          <Image source={imageg} style={styles.burger} />
        </View>
        <View style={styles.circle3}>
          <Image style={styles.user} source={User} alt="user"/>
          <View style={styles.strokeLine2}>
         
          </View>
          
        </View>
        <View style={styles.circle4}>
        <Image style={styles.user} source={User} alt="user"/>
        </View>
      </View>

      <Text style={styles.enjoy}> Flavors </Text>
      <Text style={styles.meal}>Unleash the Taste Adventure</Text>
      <View style={styles.button}>
        <Pressable onPress={handleGetStarted}>
          <Text style={styles.buttonName}> Get Started </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    padding: 30,
    backgroundColor: "#0251EB",
    justifyContent: "center",
  },
  head: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppin",
    marginBottom: 140,
    left: "20%",
    fontSize: 44,
  },
  header: {
    top: 0,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#fff",
  },
  image: {
    display: "flex",
    width: 285,
    height: 285,
    borderRadius: 140,
    backgroundColor: "blue",
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
  },
  imageLoad: {
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  enjoy: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#fff",
    marginTop: 40,
  },
  meal: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#fff",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: "orange",
    marginTop: 10,
    marginLeft: 90,
  },
  buttonName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#fff",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 45,
    backgroundColor: "#FF9900",
    top: 10,
    borderColor: "blue",
  },
  strokeLine: {
    bottom: 30,
    left: 20,
  },
  circle2: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FF9900",
    left: 80,
  },
  burger: {
    width: 148,
    height: 148,
    borderRadius: 140,
  },
  circle3: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF9900",
    top: 70,
    left: 70
  },
  user:{
    width: 75,
    height: 75,
    borderRadius: 37.5,
    left: 2,
    top: 2
  },
  strokeLine2:{
    bottom: 75,
    left: 40
  },
  circle4: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF9900",
    left: 240,
    bottom: 160,
  },
});
