import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Search from "../Components/Search";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState();

  const menuItem = [
    {
      id: 1,
      name: "Burger",
      image: "mbeme",
      rating: "5.0",
    },
    {
      id: 1,
      name: "Burger",
      image: "mbeme",
      rating: "5.0",
    },
    {
      id: 1,
      name: "Burger",
      image: "mbeme",
      rating: "5.0",
    }
  ];

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setRestaurants(data);
    };
    fetchRestaurantData();
  }, []);

  const [favouriteRestaurant, setFavouriteRestaurant] = useState(new Set());

  const filterRestaurants = () => {
    if (searchQuery) {
      const filterdRestuarants = restaurants.filter((restaurant) =>
        restaurant.RestaurantName.toLowerCase().includes(
          searchQuery.toLowerCase()
        )
      );
      return filterRestaurants;
    }
    restaurants;
  };
  return (
    <View style={styles.container}>
      <NavBar />
      <Search
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <View style={styles.categories}>
        <View style={styles.cat}>
          <Text style={styles.catName}>Categories</Text>
             <View style={styles.menuItems}>
            {menuItem.map((menuItem) => (
              <View style={styles.menu}>
                <Pressable styles={styles.menuName}>
                  <Text>Burger</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.restaurant}>
        <View style={styles.res}>
          <Text style={styles.all}>All Restaurants</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <View style={styles.resContainer}>
              <Image
                style={styles.resImage}
                source={{ uri: item.RestaurantImage }}
              />
              <Text style={styles.resName}>{item.RestaurantName}</Text>
              <Text style={styles.delivery}>{item.RestaurantAddress}</Text>
              <Pressable onPress={() => toggleFavorite(item.RestaurantName)}>
                <Ionicons
                  style={styles.fav}
                  name="heart"
                  size={24}
                  color={
                    favouriteRestaurant.has(item.RestaurantName)
                      ? "red"
                      : "grey"
                  }
                />
              </Pressable>

              <View style={styles.rating}>
                <FontAwesome name="star" size={16} color="grey" />
                <FontAwesome name="star" size={16} color="grey" />
                <FontAwesome name="star" size={16} color="grey" />
                <FontAwesome name="star" size={16} color="grey" />
                <FontAwesome name="star" size={16} color="grey" />
              </View>
              <Text style={styles.rateNo}>4.8</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  cat: {},
  menu: {
    width: 100,
    height: 80,
    backgroundColor: "#fff",
    left: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  menuName: {
    backgroundColor: "#fff",
  },
  catName: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 40,
  },
  menuItems:{
    flexDirection: "row",
    gap: 20
  },
  heards: {
    color: "#fff",
  },
  hw: {
    color: "#fff",
  },
  restaurant: {
    top: 40,
  },
  res: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  all: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppin",
    fontSize: 14,
    left: 10,
  },
  viewAll: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppin",
    fontSize: 13,
    right: 10,
  },
  resContainer: {
    width: "90%",
    height: 140,
    backgroundColor: "#fff",
    left: 20,
    top: 50,
    borderRadius: 5,
    marginBottom: 20,
  },
  resImage: {
    width: "100%",
    height: 70,
  },
  resName: {
    fontWeight: "bold",
    fontSize: 13,
  },
  delivery: {
    fontSize: 10,
    color: "grey",
  },
  fav: {
    left: 270,
    bottom: 25,
  },
  rating: {
    bottom: 25,
    flexDirection: "row",
  },
  rateNo: {
    left: 100,
    bottom: 40,
    fontSize: 10,
    fontWeight: "bold",
  },
});
