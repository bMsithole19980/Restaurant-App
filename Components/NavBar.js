import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default function NavBar() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.nav}>
      <View style={styles.location}>
        <Text style={styles.Head}>Good Morning.</Text>
      </View>

      <View style={styles.notification}>
        <Pressable style={styles.notification} onPress={toggleModal}>
          <FontAwesome name="bars" size={24} color="black" />
        </Pressable>
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp" 
        animationOut="slideOutDown" 
        onBackdropPress={toggleModal}
        backdropColor="transparent"
        style={styles.modal}
      >
        {/* Add your menu content here */}
        <View style={styles.menuContent}>
          {/* Your menu items */}
          <Text style={styles.menuItem}>Most popular</Text>
          <Text style={styles.menuItem}>Location</Text>
          <Text style={styles.menuItem}>Price</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    marginTop: 18,
    
  },
  Head: {
    color: "orange",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 20,
  },
  location: {
    flexDirection: "row",
    fontSize: 24,
    color: "#000000",
  },
  notification: {
    marginLeft: 100,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  menuContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});
