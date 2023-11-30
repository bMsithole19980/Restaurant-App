import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase";

export default function AccountsScreen() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountEmail, setNewAccountEmail] = useState("");
  const [newAccountPhone, setNewAccountPhone] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedAccounts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error.message);
      }
    };

    fetchAccounts();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCreateAccount = async () => {
    try {
      const newAccountRef = await addDoc(collection(db, "users"), {
        name: newAccountName,
        email: newAccountEmail,
      });

      const newAccount = {
        id: newAccountRef.id,
        firstName: newAccountName,
        email: newAccountEmail,
      };
      setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
      toggleModal();
    } catch (error) {
      console.error("Error creating account:", error.message);
    }
  };

  const handleUpdateAccount = async () => {
    try {
      await updateDoc(doc(db, "users", selectedAccount.id), {
        firstName: newAccountName, // Only update the "name" field
        phone: newAccountPhone, // Add this line to update the "phone" field
      });

      const updatedAccounts = accounts.map((acc) =>
        acc.id === selectedAccount.id
          ? { ...acc, firstName: newAccountName, phone: newAccountPhone } // Update "name" and "phone"
          : acc
      );

      setAccounts(updatedAccounts);
      toggleModal();
    } catch (error) {
      console.error("Error updating account:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteDoc(doc(db, "users", selectedAccount.id));
      const updatedAccounts = accounts.filter(
        (acc) => acc.id !== selectedAccount.id
      );
      setAccounts(updatedAccounts);
      toggleModal();
    } catch (error) {
      console.error("Error deleting account:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registered Accounts</Text>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.accountItem}
            onPress={() => {
              setSelectedAccount(item);
              setNewAccountName(item.firstName);
              setNewAccountEmail(item.email);
              toggleModal();
            }}
          >
            <Text style={styles.accountText}>
              Name: {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.accountText}>Email: {item.email}</Text>
            <Text style={styles.accountText}>Phone: {item.phone}</Text>
          </Pressable>
        )}
      />

      {/* Modal for CRUD operations */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newAccountName}
            onChangeText={setNewAccountName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={newAccountPhone}
            onChangeText={setNewAccountPhone}
          />
          {selectedAccount ? (
            <>
              <Pressable style={styles.button} onPress={handleUpdateAccount}>
                <Text>Update</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleDeleteAccount}>
                <Text>Delete</Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.button} onPress={handleCreateAccount}>
              <Text>Create</Text>
            </Pressable>
          )}
          <Pressable style={styles.button} onPress={toggleModal}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Button to create a new account */}
      <Pressable style={styles.createButton} onPress={() => toggleModal()}>
        <Text>Create New Account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  accountItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  accountText: {
    fontSize: 16,
  },
  createButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 200,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
});
