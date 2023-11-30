import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/Firebase';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function FavouriteScreen() {
  const [favouriteRestaurants, setFavouriteRestaurants] = useState([]);

  useEffect(() => {
    const fetchFavouriteRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, "FavouriteRestaurant"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setFavouriteRestaurants(data);
    };
    fetchFavouriteRestaurants();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Favourite Restaurants</Text>
        {favouriteRestaurants.map((restaurant, index) => (
          <View key={index} style={styles.resContainer}>
            <Image
              style={styles.resImage}
              source={{ uri: restaurant.RestaurantImage }}
            />
            <Text style={styles.resName}>{restaurant.RestaurantName}</Text>
            <Text style={styles.delivery}>{restaurant.RestaurantAddress}</Text>
            <View style={styles.delivery}>
              <Text style={styles.delivery}>Delivery fee: </Text>
              <Text style={styles.delivery}>Ksh {restaurant.DeliveryFee}</Text>
            </View>

            <View style={styles.rating}>
              <FontAwesome name="star" size={16} color="grey" />
              <FontAwesome name="star" size={16} color="grey" />
              <FontAwesome name="star" size={16} color="grey" />
              <FontAwesome name="star" size={16} color="grey" />
              <FontAwesome name="star" size={16} color="grey" />
            </View>
            <Text style={styles.rateNo}>4.8</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resContainer: {
    width: "90%",
    height: 150,
    backgroundColor: "#6E7F8D",
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  resImage: {
    width: "100%",
    height: 70,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  resName: {
    fontWeight: "bold",
    fontSize: 13,
  },
  delivery: {
    fontSize: 10,
    color: "white",
  },
  rating: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    left: 20,
  },
  rateNo: {
    marginLeft: 80,
    bottom: 40,
    fontSize: 10,
    fontWeight: "bold",
  },
});
