import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable,  } from "react-native";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase";
import { useRoute } from "@react-navigation/native";
import ReservationScreen from "./ReservationScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const categories = [
  { name: "All" },
  { name: "main course" },
  { name: "desserts" },
  { name: "appetizers" },
  { name: "Chips & Wings" },
];

export default function MenuScreen() {
  const [menuItem, setMenuItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantName, restaurantAddress, DeliveryTime, restaurantImage, restaurantRating } =
    route.params || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuItemsRef = collection(db, "MenuItems");
        const snapshot = await getDocs(menuItemsRef);

        const items = [];
        snapshot.forEach((doc) => {
          items.push(doc.data());
        });

        setMenuItem(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredMenuItems = menuItem.filter((item) => {
    if (selectedCategory === "All") {
      return true;
    } else {
      return item.category === selectedCategory;
    }
  });

  const handleReserve = () => {
    navigation.navigate("ReservationScreen", {
      restaurantName,
      restaurantAddress,
      DeliveryTime,
      restaurantImage,
      restaurantRating,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.restName}>{restaurantName}</Text>
      <Text>Menu</Text>
      <View style={styles.menu}>
        {categories.map((category, index) => (
          <Pressable key={category.name} onPress={() => handleCategoryChange(category.name)}>
            <View style={styles.menuName}>
              <Text style={styles.menuDetails}>{category.name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      {filteredMenuItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image style={styles.foodImage} alt="" source={{ uri: item.itemImage }} />
          <View style={styles.row}>
            <Text style={styles.itemName}>{item.itemName}</Text>
            <Text style={styles.soldAt}>{restaurantName}</Text>
            <View style={styles.ratingStars}>
              <FontAwesome name="star" size={12} color="grey" />
              <FontAwesome name="star" size={12} color="grey" />
              <FontAwesome name="star" size={12} color="grey" />
              <FontAwesome name="star" size={12} color="grey" />
              <FontAwesome name="star" size={12} color="grey" />
              <Text>(4.5)</Text>
            </View>
            <Text style={styles.price}>{item.itemPrice}</Text>
            <View style={styles.icons}>
              <MaterialIcons name="add" size={24} color="black" />
              <FontAwesome name="heart" size={24} color={"grey"} />
            </View>
          </View>
        </View>
      ))}

     <Pressable
     style={styles.butctonRerseve}
     onPress={handleReserve}>
      <Text style={styles.reserve}>Reserve Now</Text>
     </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  restName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuName: {
    width: 70,
    height: 40,
    backgroundColor: "#B5BFC6",
    left: 2,
    marginTop: 10,
    borderRadius: 10,
    gap: 10,
  },
  menuDetails: {
    textAlign: "center",
    top: 10,
    fontWeight: "bold",
    fontSize: 10,
  },
  itemContainer: {
    top: 30,
    width: "100%",
    height: 90,
    flexDirection: "row",
    gap: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Poppins",
  },
  soldAt: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "grey",
  },
  ratingStars: {
    flexDirection: "row",
    gap: 2,
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Poppins",
    color: "green",
    top: 10,
  },
  icons: {
    bottom: 70,
    marginLeft: 230,
    gap: 25,
  },
  butctonRerseve:{
    width: '90%',
    height: 40,
    backgroundColor: 'green',
    color: '#fff',
    top: 250,
    left: 20,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 10,


  },
  reserve:{
    color: "#fff",
     fontSize: 16,
     fontWeight: 'bold',
     fontFamily: 'Poppins',
     textAlign: 'center',
  }
});
