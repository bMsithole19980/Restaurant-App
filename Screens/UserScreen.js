import {  StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';


export default function UserScreen() {
  const [favourite,setRestaurants]= useState([]);
  const naavigation =useNavigation();

  const handleLogOut=()=>{
    navigation.navigate('LoginScreen');
    console.log('Log out');
  }
   
  return (
    <View>
      <Text>
        User Details
      </Text>
      <Text style={styles.dashboard}>Dashboard</Text>
      <View>
        <TouchableOpacity
        onPress={handleFav}>
          <Text>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity
        >
          <Text>Reservation</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={handleLogOut}
        style={styles.logOut}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dashboard:{
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  logOut:{
    backgroundColor: 'red',
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  }
})