import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Config/Firebase';

const AdminReservationScreen = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reservations'));
        const fetchedReservations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(fetchedReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error.message);
      }
    };

    fetchReservations();
  }, []);

  const handleApproveReservation = async (reservationId) => {
    try {
      // Update the reservation status or any other relevant fields
      await updateDoc(doc(db, 'reservations', reservationId), {
        status: 'approved',
      });

      // Fetch updated reservations after approval
      fetchReservations();
    } catch (error) {
      console.error('Error approving reservation:', error.message);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      // Delete the reservation from Firestore
      await deleteDoc(doc(db, 'reservations', reservationId));

      // Remove the reservation locally from the state
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== reservationId)
      );
    } catch (error) {
      console.error('Error cancelling reservation:', error.message);
    }
  };

  const confirmCancellation = (reservationId) => {
    Alert.alert(
      'Confirm Cancellation',
      'Are you sure you want to cancel this reservation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => handleCancelReservation(reservationId),
        },
      ],
      { cancelable: false }
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservations</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reservationItem}>
            <Text style={styles.reservationText}>Date: {item.date}</Text>
            <Text style={styles.reservationText}>Email: {item.email}</Text>
            <Text style={styles.reservationText}>Name: {item.firstName}</Text>
            <Text style={styles.reservationText}>Occasion: {item.occasion}</Text>
            <Text style={styles.reservationText}>Phone Number: {item.phoneNumber}</Text>
            <Text style={styles.reservationText}>Restaurant Name: {item.restaurantName}</Text>
            <Text style={styles.reservationText}>Special Request: {item.specialRequest}</Text>

            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.approveButton}
                onPress={() => handleApproveReservation(item.id)}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => confirmCancellation(item.id)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reservationItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  reservationText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  approveButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminReservationScreen;
