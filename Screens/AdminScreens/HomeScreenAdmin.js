import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreenAdmin() {
  const [showSideBar, setShowSideBar] = useState(false);
  const navigation = useNavigation();

  const openSideBar = () => {
    setShowSideBar(true);
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const navigateToFeature = (feature) => {
    // Mapping feature names to screen names
    const screenMapping = {
      Accounts: "AccountsScreen",
      Reservations: "AdminReservationScreen",
      Rooms: "RoomsScreen",
      Menu: "RestaurantMenuAdminScreen",
      Restaurants: "RestaurantsAdminScreen",
    };

    const screenName = screenMapping[feature];

    if (screenName) {
      navigation.navigate(screenName);
    }

    closeSideBar();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Pressable onPress={openSideBar}>
          {/* Replace FontAwesome with your custom icon or image */}
          <FontAwesome
            name="bars"
            size={24}
            color="black"
            style={styles.menuIcon}
          />
        </Pressable>
        <Text style={styles.header}>Restaurant Admin</Text>
        <Pressable onPress={() => console.log("Opening Search")}>
          <FontAwesome name="search" size={24} color="black" />
        </Pressable>
      </View>

      <Modal
        isVisible={showSideBar}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        swipeDirection="left"
        onSwipeComplete={closeSideBar}
        backdropPress={closeSideBar}
      >
        <View style={styles.slideBarContainer}>
          <Pressable onPress={closeSideBar}>
            <FontAwesome
              name="times"
              size={24}
              color="black"
              style={styles.closeIcon}
            />
          </Pressable>

          {/* Display features as Text within the modal */}
          <Text
            style={styles.sideBarText}
            onPress={() => navigateToFeature("Accounts")}
          >
            Accounts
          </Text>
          <Text
            style={styles.sideBarText}
            onPress={() => navigateToFeature("Reservations")}
          >
            Reservations
          </Text>
         
          <Text
            style={styles.sideBarText}
            onPress={() => navigateToFeature("Menu")}
          >
            Menu
          </Text>
          <Text
            style={styles.sideBarText}
            onPress={() => navigateToFeature("Restaurants")}
          >
            Restaurants
          </Text>

          {/* Close button to close the modal */}
          <Pressable style={styles.closeButton} onPress={closeSideBar}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>

      <View style={styles.contentContainer}>
        {/* Placeholder content for admin home screen */}
        <Text style={styles.welcomeText}>Welcome, Restaurant Admin!</Text>
        {/* <Image
          source={require('./path/to/your/image.jpg')}
          style={styles.restaurantImage}
        /> */}
        <Text style={styles.descriptionText}>
          Manage your restaurant, view analytics, and more!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  slideBarContainer: {
    flex: 1,
    backgroundColor: "#24282B",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  closeIcon: {
    fontSize: 24,
    alignSelf: "flex-end",
  },
  sideBarText: {
    fontSize: 18,
    paddingVertical: 10,
    color: "#fff",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ddd",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  restaurantImage: {
    width: 200,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
});
