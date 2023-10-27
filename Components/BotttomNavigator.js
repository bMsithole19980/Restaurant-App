import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import RestaurantDiscovery from '../Screens/RestaurantDiscovery';
import UserScreen from '../Screens/UserScreen';
import CartSCreen from '../Screens/CartSCreen';


const Tab= createMaterialBottomTabNavigator();
const BotttomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="grey"
      barStyle={{ backgroundColor: 'orange' }}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={RestaurantDiscovery} // Replace with your HomeScreen component
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={RestaurantDiscovery} // Replace with your RestaurantDiscovery component
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen} // Replace with your UserScreen component
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartSCreen} // Replace with your CartScreen component
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BotttomNavigator

const styles = StyleSheet.create({})