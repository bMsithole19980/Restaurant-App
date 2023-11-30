import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Modal,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase";

const RestaurantsAdminScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState({
    id: "",
    RestaurantName: "",
    RestaurantAddress: "",
    DeliveryFee: "",
    // Add other fields as needed
  });

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "restaurants"));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error.message);
      }
    };

    fetchRestaurantData();
  }, []);

  const openModal = (restaurant) => {
    setEditedRestaurant(restaurant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleUpdateRestaurant = async () => {
    try {
      await updateDoc(
        doc(db, "restaurants", editedRestaurant.id),
        editedRestaurant
      );
      fetchRestaurantData(); // Refresh the restaurant list after updating
      closeModal();
    } catch (error) {
      console.error("Error updating restaurant:", error.message);
    }
  };

  const handleDeleteRestaurant = async () => {
    try {
      await deleteDoc(doc(db, "restaurants", editedRestaurant.id));
      fetchRestaurantData(); // Refresh the restaurant list after deleting
      closeModal();
    } catch (error) {
      console.error("Error deleting restaurant:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <Pressable onPress={() => openModal(item)}>
            <View style={styles.resContainer}>
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
              {/* Add other restaurant details as needed */}
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Add your form fields here */}
            <TextInput
              style={styles.input}
              placeholder="Restaurant Name"
              onChangeText={(text) =>
                setEditedRestaurant({
                  ...editedRestaurant,
                  RestaurantName: text,
                })
              }
              value={editedRestaurant.RestaurantName}
            />
            <TextInput
              style={styles.input}
              placeholder="Restaurant Address"
              onChangeText={(text) =>
                setEditedRestaurant({
                  ...editedRestaurant,
                  RestaurantAddress: text,
                })
              }
              value={editedRestaurant.RestaurantAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Delivery Fee"
              onChangeText={(text) =>
                setEditedRestaurant({ ...editedRestaurant, DeliveryFee: text })
              }
              value={editedRestaurant.DeliveryFee}
            />
            {/* Add other input fields as needed */}
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.updateButton}
                onPress={handleUpdateRestaurant}
              >
                <Text style={styles.buttonText}>Update Restaurant</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={handleDeleteRestaurant}
              >
                <Text style={styles.buttonText}>Delete Restaurant</Text>
              </Pressable>
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  resContainer: {
    width: "90%",
    height: 150,
    backgroundColor: "#6E7F8D",
    marginLeft: 20,
    marginTop: 50,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RestaurantsAdminScreen;
