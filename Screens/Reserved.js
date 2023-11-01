import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../Config/Firebase';

export default function Reserved() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
   
    const fetchReservations = async () => {
      const reservationsCollection = collection(db, 'reservations');
      const reservationsQuery = query(reservationsCollection);

      try {
        const querySnapshot = await getDocs(reservationsQuery);
        const reservationData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          reservationData.push(data);
        });
        setReservations(reservationData);
      } catch (error) {
        console.error('Error fetching reservations: ', error);
      }
    };

  
    fetchReservations();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Reserved</Text>
      {reservations.map((reservation, index) => (
        <View key={index}>
          <Text>Name: {reservation.firstName}</Text>
          <Text>Phone Number: {reservation.phoneNumber}</Text>
          
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
