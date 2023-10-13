import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function NavBar() {
  return (
    <View style={styles.nav}>
      <View style={styles.location}>
        <Pressable>
          <Ionicons name="location" size={24} color="black" />
        </Pressable>
        <Text>Your location</Text>
      </View>

      <View style={styles.notification}>
      <Pressable
      style={styles. notification}>
      <Ionicons style={styles.notification}  name="notifications" size={24} color="blue" />
      </Pressable>
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flex: 1,
     flexDirection: "row"
   
  },
  location:{
    flexDirection: "row",
    fontSize: 24
  },
  notification:{
    alignSelf: "flex-end",
    marginLeft: 85,
    marginBottom: 0
  }
});
