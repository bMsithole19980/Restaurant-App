import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Config/Firebase';

export default function RestaurantMenuAdminScreen() {
  const [menuItem, setMenuItem] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [newMenuItemName, setNewMenuItemName] = useState('');
  const [newMenuItemCategory, setNewMenuItemCategory] = useState('');
  const [newMenuItemImage, setNewMenuItemImage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuItemsRef = collection(db, 'MenuItems');
        const snapshot = await getDocs(menuItemsRef);

        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });

        setMenuItem(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategorySearch = (category) => {
    setSearchCategory(category);
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setEditModalVisible(true);
  };

  const handleAddNewItem = async () => {
    setModalVisible(true);
  };

  const handleSaveNewItem = async () => {
    try {
      const newItemRef = await addDoc(collection(db, 'MenuItems'), {
        itemName: newMenuItemName,
        category: newMenuItemCategory,
        itemImage: newMenuItemImage,
      });

      const newItem = {
        id: newItemRef.id,
        itemName: newMenuItemName,
        category: newMenuItemCategory,
        itemImage: newMenuItemImage,
      };

      setMenuItem((prevItems) => [...prevItems, newItem]);

      setNewMenuItemName('');
      setNewMenuItemCategory('');
      setNewMenuItemImage('');

      setModalVisible(false);
    } catch (error) {
      console.error('Error adding new menu item:', error.message);
    }
  };

  const handleEditItem = (item) => {
    setEditModalVisible(true);
    setSelectedItemId(item.id);
    setNewMenuItemName(item.itemName);
    setNewMenuItemCategory(item.category);
    setNewMenuItemImage(item.itemImage);
  };

  const handleSaveEditItem = async () => {
    try {
      await updateDoc(doc(db, 'MenuItems', selectedItemId), {
        itemName: newMenuItemName,
        category: newMenuItemCategory,
        itemImage: newMenuItemImage,
      });

      setMenuItem((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItemId
            ? {
                ...item,
                itemName: newMenuItemName,
                category: newMenuItemCategory,
                itemImage: newMenuItemImage,
              }
            : item
        )
      );

      setNewMenuItemName('');
      setNewMenuItemCategory('');
      setNewMenuItemImage('');
      setSelectedItemId(null);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating menu item:', error.message);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await deleteDoc(doc(db, 'MenuItems', selectedItem.id));

      setMenuItem((prevItems) => prevItems.filter((item) => item.id !== selectedItem.id));

      setEditModalVisible(false);
    } catch (error) {
      console.error('Error deleting menu item:', error.message);
    }
  };

  const filteredMenuItems = menuItem.filter((item) => {
    if (!searchCategory) {
      return true;
    } else {
      return item.category.toLowerCase().includes(searchCategory.toLowerCase());
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Restaurant Menu and Details</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for category"
        value={searchCategory}
        onChangeText={handleCategorySearch}
      />

      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable key={item.id} onPress={() => handleItemPress(item)}>
            <View style={styles.itemContainer}>
              <Image style={styles.foodImage} source={{ uri: item.itemImage }} />
              <View style={styles.row}>
                <Text style={styles.itemName}>{item.itemName}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />

      <Pressable style={styles.addButton} onPress={handleAddNewItem}>
        <Text style={styles.buttonText}>Add New Menu</Text>
      </Pressable>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.screenTitle}>Add New Menu Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newMenuItemName}
            onChangeText={(text) => setNewMenuItemName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={newMenuItemCategory}
            onChangeText={(text) => setNewMenuItemCategory(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={newMenuItemImage}
            onChangeText={(text) => setNewMenuItemImage(text)}
          />
          <Pressable style={styles.addButton} onPress={handleSaveNewItem}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal visible={isEditModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.screenTitle}>Edit and Delete</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newMenuItemName}
            onChangeText={(text) => setNewMenuItemName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={newMenuItemCategory}
            onChangeText={(text) => setNewMenuItemCategory(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={newMenuItemImage}
            onChangeText={(text) => setNewMenuItemImage(text)}
          />
          <Pressable style={styles.editButton} onPress={handleSaveEditItem}>
            <Text style={styles.buttonText}>Update</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDeleteItem}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => setEditModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  itemContainer: {
    top: 30,
    width: '100%',
    height: 90,
    flexDirection: 'row',
    gap: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  editButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    paddingLeft: 10,
    width: 200,
  },
  cancelButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    alignItems: 'center'
  },
  editButton: {
    padding: 10,
    width: '90%',
    backgroundColor: 'green',
    alignItems: 'center',
    marginTop: 10
   
  },
  deleteButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: 'red',
    width: '90%',
    alignItems: 'center',
    marginTop: 20
  },
});
