import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import KFC from "../assets/food.jpg";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function MenuScreen() {

  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
   const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const goToReservation=()=>{
    navigation.navigate("ReservationScreen");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.restName}>Restaurant Name</Text>
      <Text>Menu</Text>
      <View style={styles.menu}>
        <View style={styles.menuName}>
          <Text style={styles.menuDetails}>All</Text>
        </View>
        <View style={styles.menuName}>
          <Text style={styles.menuDetails}>Main courses</Text>
        </View>
        <View style={styles.menuName}>
          <Text style={styles.menuDetails}>Deserts</Text>
        </View>
        <View style={styles.menuName}>
          <Text style={styles.menuDetails}>Burger</Text>
        </View>
        <View style={styles.menuName}>
          <Text style={styles.menuDetails}>Chips & Wings</Text>
        </View>
      </View>
      <Pressable onPress={toggleModal}>
      <View style={styles.itemContainer}>
       
          <Image style={styles.foodImage} alt="" source={KFC} />
        
        <View style={styles.row}>
          <Text style={styles.itemName}>Food Name</Text>
          <Modal
            style={styles.modalContainer}
            isVisible={isModalVisible}
            animationType="slide"
          >
            <View style={styles.innerContent}>
              {/* Food details content here */}
              <Pressable onPress={toggleModal} >
              <MaterialCommunityIcons  style={styles.closeButton} name="window-close" size={24} color="black" />
              </Pressable>
              <Image style={styles.viewFoodDetails} alt="food" source={KFC} />
              <Text>Food Name: Delicious Burger</Text>
              <Text>
                Description: A mouthwatering burger with all the toppings.
              </Text>
              <Text>Price: $10.99</Text>
              <View style={styles.quantityContainer}>
                <Pressable onPress={decreaseQuantity}>
                  <FontAwesome name="minus" size={24} color="black" />
                </Pressable>
                <Text style={styles.quantity}>{quantity}</Text>
                <Pressable onPress={increaseQuantity}>
                  <FontAwesome name="plus" size={24} color="black" />
                </Pressable>
              </View>

              <Text style={styles.totalAmount}>Total: $10.99</Text>
              <Pressable
               style={styles.addTocart}
               onPress={goToReservation}>
                <Text style={styles.add}>Reserve</Text>
              </Pressable>
              
            </View>
          </Modal>
          <Text style={styles.soldAt}>Restaurant name</Text>
          <View style={styles.ratingStars}>
            <FontAwesome name="star" size={12} color="grey" />
            <FontAwesome name="star" size={12} color="grey" />
            <FontAwesome name="star" size={12} color="grey" />
            <FontAwesome name="star" size={12} color="grey" />
            <FontAwesome name="star" size={12} color="grey" />
            <Text> 
                (4.5)</Text>
          </View>
          <Text style={styles.price}>Price</Text>
          <View style={styles.icons}>
            <MaterialIcons name="add" size={24} color="black" />
            <FontAwesome name="heart" size={24} color={"grey"} />
          </View>
        </View>
      </View>
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
  totalAmount: {
    fontSize: 15,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "green",
    top: 20,
  },
  addTocart: {
    width: 100,
    height: 30,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
    top: 30,
  },
  add: {
    fontSize: 17,
    fontFamily: "Poppins",
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "bold",
    left: 90,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewFoodDetails: {
    bottom: 0,
    width: "80%",
    height: 60,
  },
  quantityContainer: {
    flexDirection: "row",
    gap: 10,
    top: 20,
  },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});
