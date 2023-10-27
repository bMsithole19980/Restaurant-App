import { StyleSheet, Text, View } from "react-native";
import LoadScreen from "./Screens/LoadScreen";
import LoginScreen from "./Screens/LoginScreen";
import { Provider } from "react-redux";
import store from "./src/Store";
import RegisterScreen from "./Screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./Screens/Restaurant";
import ForgotPassword from "./Screens/ForgotPassword";
import HomeScreen from "./Screens/HomeScreen";
import RestaurantDiscovery from "./Screens/RestaurantDiscovery";
import RestaurantDetails from "./Screens/RestaurantDetails";
import MenuScreen from "./Screens/MenuScreen";
import ReservationScreen from "./Screens/ReservationScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider style={styles.container} store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RestaurantDiscovery">
          <Stack.Screen name="LoadSCreen" component={LoadScreen} options={{headerShown: false}} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="RestaurantDiscovery" component={RestaurantDiscovery} options={{headerShown: false}}/>
          <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} options={{headerShown: false}}/>
          <Stack.Screen name="MenuScreen" component={MenuScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ReservationScreen" component={ReservationScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    
  },
});
