import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import NavaBar from "../Components/NavBar";
import { useEffect, useState } from "react";;
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, FontAwesome} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {

    const navigation = useNavigation();

    
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
      id: 2,
      name: "Burger",
      image: "mbeme",
      rating: "5.0",
    },
    {
      id: 3,
      name: "Burger",
      image: "mbeme",
      rating: "5.0",
    },
    {
      id: 4,
      name: "Burger",
      image: "mbeme",
      rating: "5.0",
    },
    {
      id: 5,
      name: "Burger",
      image: "mbeme",
      rating: "5.0",
    },
  ];





  const toggleFavorite = (restaurantName) => {
   
    const updatedFavourites = new Set(favouriteRestaurant);

    if (updatedFavourites.has(restaurantName)) {
      updatedFavourites.delete(restaurantName);
    } else {
      updatedFavourites.add(restaurantName); 
    }

    setFavouriteRestaurant(updatedFavourites); 
  };
   
   const handleViewAll = () => {
    navigation.navigate("RestaurantDiscovery");
   }

 
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



  return (
    <View style={styles.container}>
      <NavaBar />

      <View style={styles.categories}>
        <View style={styles.cat}>
          <Text style={styles.catName}>Categories</Text>
          <View style={styles.menuItems}>
            {menuItem.map((menuItem) => (
              <View style={styles.menu} key={menuItem.id}>
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
          <Pressable
          onPress={handleViewAll}>
          <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <View style={styles.resContainer} >
              <Image
                style={styles.resImage}
                source={{ uri: item.RestaurantImage }}
              />
              <Text style={styles.resName}>{item.RestaurantName}</Text>
              <Text style={styles.delivery}>{item.RestaurantAddress}</Text>
              <View style={styles.delivery}>
                <Text style={styles.delivery}>Delivery fee: </Text>
                <Text style={styles.delivery}>Ksh {item.DeliveryFee}</Text>
              </View>
              <Pressable onPress={() => toggleFavorite(item.RestaurantName)}>
                <Ionicons
                  style={styles.fav}
                  name="heart"
                  size={24}
                  color={
                    favouriteRestaurant.has(item.RestaurantName)
                      ? "red"
                      : "white"
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
    backgroundColor: "#fff",
  },
  header: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Poppin",
  },
  menu: {
    width: 100,
    height: 80,
    backgroundColor: "#000",
    left: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  menuName: {
    backgroundColor: "#fff",
  },
  categories: {
    marginTop: 30,
  },
  cat: {
    marginLeft: 10,
  },
  catName: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,

  },
  menuItems: {
    flexDirection: "row",
    gap: 20,
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
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Poppin",
    fontSize: 14,
    left: 10,
  },
  viewAll: {
    color: "#000000",
    fontWeight: "bold",
    fontFamily: "Poppin",
    fontSize: 13,
    right: 10,
  },
  resContainer: {
    width: "90%",
    height: 150,
    backgroundColor: "#6E7F8D",
    left: 20,
    top: 50,
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
