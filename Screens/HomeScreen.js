import { StyleSheet, View } from 'react-native'
import React from 'react'
import NavBar from '../Components/NavBar';
import Search from '../Components/Search';
import Restaurants from '../Components/Restaurants';


export default function HomeScreen() {
  return (
    <View container>
      <NavBar/>
      <Search/>
      <Restaurants/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex : 1
    }
})