import { StyleSheet, Text, View } from "react-native";
import LoadScreen from "./Screens/LoadScreen";
import LoginScreen from "./Screens/LoginScreen";
import { Provider } from "react-redux";
import store from "./src/Store";
import RegisterScreen from "./Screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import ForgotPassword from "./Screens/ForgotPassword";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider style={styles.container} store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="LoadSCreen" component={LoadScreen} options={{headerShown: false}} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    
  },
});
