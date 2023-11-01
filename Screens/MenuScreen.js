import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import KFC from "../assets/food.jpg";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../Config/Firebase'
import { useRoute } from "@react-navigation/native";
import ReservationScreen from "./ReservationScreen";

const categories=[
  {name: "All"},
  {name: "main course"},
  {name: "desserts"},
  {name: "appitezers"},
  {name: "Chips & Wings"},
];


export default function MenuScreen() {

  const [isModalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [menuItem, setMenuItem] = useState([]);
  const [selectedCategory, setSelectedCategory]=useState("All");
  const navigation = useNavigation();
  const route =useRoute();
  const {restaurantName, restaurantAddress, DeliveryTime ,restaurantImage, restaurantRating} = route.params;

  const [openModalItem, setOpenModalItem]= useState(null)
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleModal = (item) => {
    setOpenModalItem(item.id);
    setSelectedItem(item);
  };
    
  const closeModal=()=>{
    setOpenModalItem(null);
    setSelectedItem(null);
}
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const goToReservation=()=>{
    navigation.navigate("ReservationScreen",{
      restaurantName: restaurantName,
      restaurantImage: restaurantImage,
      restaurantRating: restaurantRating,
      restaurantAddress: restaurantAddress,
      DeliveryTime: DeliveryTime,
    
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuItemsRef = collection(db,"MenuItems");
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
  },[]);

  const handleCategoryChange=(category)=>{
    setSelectedCategory(category);
  }

  const filteredMenuItems=menuItem.filter((item)=>{
    if(selectedCategory==="All"){
      return true;
    }else{
      return item.category===selectedCategory;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.restName}>{restaurantName}</Text>
      <Text>Menu</Text>
      <View style={styles.menu}>
      {categories.map((category, index)=>(
  <Pressable key={index} onPress={()=>handleCategoryChange(category.name)}>
    <View style={styles.menuName}>
      <Text style={styles.menuDetails}>{category.name}</Text>
    </View>
  </Pressable>
))}

      </View>
      {filteredMenuItems.map((item)=>(
        <Pressable key={item.id} onPress={()=>toggleModal(item)}>
      <View style={styles.itemContainer}>
       
          <Image style={styles.foodImage} alt="" source={{uri: item.itemImage}} />
        
        <View style={styles.row}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Modal
            style={styles.modalContainer}
            isVisible={openModalItem === selectedItem?.id}
            animationType="slide"
          >
            <View style={styles.innerContent}>
              {/* Food details content here */}
              <Pressable onPress={closeModal} >
              <MaterialCommunityIcons  style={styles.closeButton} name="window-close" size={24} color="black" />
              </Pressable>
              <Image style={styles.viewFoodDetails} alt="food" source={{uri: selectedItem?.itemImage}} />
              <Text>Food Name: Delicious Burger</Text>
              <Text>
                Description:{selectedItem?.itemDescription}
              </Text>
              <Text> {selectedItem?.itemPrice}</Text>
              <View style={styles.quantityContainer}>
                <Pressable onPress={decreaseQuantity}>
                  <FontAwesome name="minus" size={24} color="black" />
                </Pressable>
                <Text style={styles.quantity}>{quantity}</Text>
                <Pressable onPress={increaseQuantity}>
                  <FontAwesome name="plus" size={24} color="black" />
                </Pressable>
              </View>

              <Text style={styles.totalAmount}>Total:{item.itemPrice}</Text>
              <Pressable
               style={styles.addTocart}
               onPress={goToReservation}>
                <Text style={styles.add}>Reserve</Text>
              </Pressable>
              
            </View>
          </Modal>
          <Text style={styles.soldAt}>{restaurantName}</Text>
          <View style={styles.ratingStars}>
            <FontAwesome name="star" size={12} color="grey" />
            <FontAwesome name="star" size={12} color="grey" />
            <FontAwesome name="star" size={12} color="grey" />
            <FontAwesome name="star" size={12} color="grey" />
            <FontAwesome name="star" size={12} color="grey" />
            <Text> 
                (4.5)</Text>
          </View>
          <Text style={styles.price}>{item.itemPrice}</Text>
          <View style={styles.icons}>
            <MaterialIcons name="add" size={24} color="black" />
            <FontAwesome name="heart" size={24} color={"grey"} />
          </View>
        </View>
      </View>
      </Pressable>
      ))}
      
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