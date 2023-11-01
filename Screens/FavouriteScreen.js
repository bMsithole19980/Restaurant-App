import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/Firebase'; // Update this path with your Firebase config file path

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
    <View>
      <Text>Favourite Restaurants:</Text>
      {favouriteRestaurants.map((restaurant, index) => (
        <View key={index}>
          <Text>{restaurant.RestaurantName}</Text>
          <Text>{restaurant.RestaurantAddress}</Text>
          {/* Display other restaurant details here */}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});