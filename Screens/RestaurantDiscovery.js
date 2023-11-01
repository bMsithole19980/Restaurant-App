import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import NavBar from '../Components/NavBar'
import { FlatList } from 'react-native-gesture-handler'
import { collection, getDocs , addDoc} from 'firebase/firestore'
import { db } from '../Config/Firebase'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function RestaurantDiscovery() {
        const [restaurants, setRestaurants] = useState([]);
        const [searchQuery, setSearchQuery] = useState();
        const [locationQuery, setLocationQuery] = useState();
        const [favouriteRestaurant, setFavouriteRestaurant] = useState(new Set());
        const [favorites, setFavorites] = useState([]);
        const navigation = useNavigation();
        
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
        
            const toggleFavorite = async(item) => {
     
                const updatedFavourites = new Set(favouriteRestaurant);
                const serializedRestaurant = JSON.stringify(item);
                if (updatedFavourites.has(serializedRestaurant)) {
                    updatedFavourites.delete(serializedRestaurant);
                } else {
                    updatedFavourites.add(serializedRestaurant);
                    try{
                      await addDoc(collection(db, "FavouriteRestaurant"), item);
                    }catch(error){
                      console.error("Error adding document: ", e);
                    }
                }
        
                setFavouriteRestaurant(updatedFavourites); 
            };
            
            const handleRestaurantDetails = (restaurant) => {
                navigation.navigate("RestaurantDetails",{
                    restaurantName: restaurant.RestaurantName,
                    restaurantImage: restaurant.RestaurantImage,
                    restaurantRating: restaurant.RestaurantRating,
                    restaurantAddress: restaurant.RestaurantAddress,
                    restaurantDeliveryTime: restaurant.DeliveryTime,
                });
               }


            const filterRestaurants = () => {
                let filteredRestaurants = restaurants;
                if (searchQuery) {
                    filteredRestaurants = filteredRestaurants.filter((restaurant) =>
                        restaurant.RestaurantName.toLowerCase().includes(
                            searchQuery.toLowerCase()
                        )
                    );
                }
                if (locationQuery) {
                    filteredRestaurants = filteredRestaurants.filter((restaurant) =>
                        restaurant.RestaurantAddress.toLowerCase().includes(
                            locationQuery.toLowerCase()
                        )
                    );
                }
                return filteredRestaurants;
            };
            
    return (
        <View style={styles.container}>
                <NavBar/>
                <Search onSearch={setSearchQuery} onLocation={setLocationQuery}/>
                <View>
         
                <FlatList
                    data={filterRestaurants()}
                    renderItem={({ item }) => (
                        
                        <View style={styles.resContainer} >
                            <Pressable
                            onPress={()=> handleRestaurantDetails(item)}>
                            <Image
                                style={styles.resImage}
                                source={{ uri: item.RestaurantImage }}
                            />
                            </Pressable>
                            <Text style={styles.resName}>{item.RestaurantName}</Text>
                            <Text style={styles.delivery}>{item.RestaurantAddress}</Text>
                            <View style={styles.delivery}>
                                <Text style={styles.delivery}>Delivery fee: </Text>
                                <Text style={styles.delivery}>Ksh {item.DeliveryFee}</Text>
                            </View>
                            <Pressable onPress={() => toggleFavorite(item)}>
                                <Ionicons
                                    style={styles.fav}
                                    size={24}
                                    color={
                                        favouriteRestaurant.has(JSON.stringify(item))
                                            ? "red"
                                            : "white"
                                    }
                                    name="heart"
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
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
},
avail:{
    top: 35,
    left: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppin'
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
})