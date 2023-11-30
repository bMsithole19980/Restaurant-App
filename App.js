import { StyleSheet, Text, View } from "react-native";
import LoadScreen from "./Screens/LoadScreen";
import LoginScreen from "./Screens/LoginScreen";
import { Provider } from "react-redux";
import store from "./src/Store";
import RegisterScreen from "./Screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ForgotPassword from "./Screens/ForgotPassword";
import HomeScreen from "./Screens/HomeScreen";
import RestaurantDiscovery from "./Screens/RestaurantDiscovery";
import RestaurantDetails from "./Screens/RestaurantDetails";
import MenuScreen from "./Screens/MenuScreen";
import ReservationScreen from "./Screens/ReservationScreen";
import FavouriteScreen from "./Screens/FavouriteScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import Reserved from "./Screens/Reserved";
import UserScreen from "./Screens/UserScreen";
import HomeScreenAdmin from "./Screens/AdminScreens/HomeScreenAdmin";
import AccountsScreen from "./Screens/AdminScreens/AccountsScreen";
import AdminReservationScreen from "./Screens/AdminScreens/AdminReservationScreen";
import RestaurantsAdminScreen from "./Screens/AdminScreens/RestaurantsAdminScreen";
import RestaurantMenuAdminScreen from "./Screens/AdminScreens/RestuarantMenuAdminScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider style={styles.container} store={store}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'blue', // Change this to your preferred color
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen 
          name="Home" 
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color}/>
            ),
          }} />
          <Tab.Screen 
          name="Favorites" 
          component={FavouriteScreen}
          options={{
            headerShown: false,
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
            headerShown: false,
            tabBarLabel: 'Reservations',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color}/>
            ),
          }}/>
          <Tab.Screen
          name='User'
          component={UserScreen}
          options={{
            headerShown: false,
            tabBarLabel:'User',
            tabBarIcon:({color, size})=>(
              <AntDesign name="user" size={size} color={color} />
            )
            
          }}/>
          
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const HomeStack = () => (
  <Stack.Navigator initialRouteName="AdminDashboard">
    <Stack.Screen name="LoadScreen" component={LoadScreen} options={{headerShown: false}} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} /> 
    <Stack.Screen name="RestaurantDiscovery" component={RestaurantDiscovery} options={{headerShown: false}} />
    <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} options={{headerShown: false}} />
    <Stack.Screen name="MenuScreen" component={MenuScreen} options={{headerShown: false}} />
    <Stack.Screen name="ReservationScreen" component={ReservationScreen} options={{headerShown: false}} />
   
   {/* Admin side */}
   <Stack.Screen name="AdminDashboard" component={HomeScreenAdmin} options={{headerShown: false}} />
   <Stack.Screen name="AccountsScreen" component={AccountsScreen} options={{headerShown: false}} />
   <Stack.Screen name="AdminReservationScreen" component={AdminReservationScreen} options={{headerShown: false}} />
   <Stack.Screen name="RestaurantsAdminScreen" component={RestaurantsAdminScreen} options={{headerShown: false}} />
   <Stack.Screen name="RestaurantMenuAdminScreen" component={RestaurantMenuAdminScreen} options={{headerShown: false}} />

 
  </Stack.Navigator>

);

// const FavoritesStack = () => (
//   <Stack.Navigator>
//     {/* Add screens for your "Favorites" here */}
//   </Stack.Navigator>
// );

// const ReservationsStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="ReservationScreen" component={ReservationScreen} options={{headerShown: false}} />
//   </Stack.Navigator>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
