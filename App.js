// App.js

import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./src/Store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoadScreen from "./Screens/LoadScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ForgotPassword from "./Screens/ForgotPassword";
import HomeScreen from "./Screens/HomeScreen";
import RestaurantDiscovery from "./Screens/RestaurantDiscovery";
import RestaurantDetails from "./Screens/RestaurantDetails";
import MenuScreen from "./Screens/MenuScreen";
import ReservationScreen from "./Screens/ReservationScreen";
import FavouriteScreen from "./Screens/FavouriteScreen";
import HomeScreenAdmin from "./Screens/AdminScreens/HomeScreenAdmin";
import Reserved from "./Screens/Reserved";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider style={styles.container} store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MenuScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoadScreen" component={LoadScreen} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="MainTab" component={MainTab} />
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
}

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const MainTab = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen 
      name="Home" 
      component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color}/>
        ),
      }} />
    <Tab.Screen 
      name="Favorites" 
      component={FavouriteScreen}
      options={{
        tabBarLabel: 'Favourites',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="heart" size={size} color={color}/>
        ),
      }} 
    />
    <Tab.Screen 
      name="Reservations" 
      component={Reserved}
      options={{
        tabBarLabel: 'Reservations',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" size={size} color={color}/>
        ),
      }} />
  </Tab.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RestaurantDiscovery" component={RestaurantDiscovery} options={{ headerShown: false }}  />
    <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} options={{ headerShown: false }} />
    <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ReservationScreen" component={ReservationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPassword" component={HomeScreenAdmin} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
