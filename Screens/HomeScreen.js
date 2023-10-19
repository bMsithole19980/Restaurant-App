import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserScreen from './UserScreen';
import FavouriteScreen from './FavouriteScreen'
import OrderScreen from './OrderScreen';
import Restaurant from './Restaurant';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <NavBar />
      <Search /> */}
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'orange',
          inactiveTintColor: 'gray',
         
        }}
        
      >
        <Tab.Screen
          name="Home"
          component={Restaurant}
          style={styles.tabNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerShown: false
            
          }}
          
        />
        <Tab.Screen
          name="Favorites"
          component={FavouriteScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrderScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </View>
  );
}


// function HomeTab() {
//   return (
//     <View style={styles.container}>
//       <NavBar />
//       <Search/>
//       <Restaurant/>
//       <View style={styles.best}>
//         <Text style={styles.popular}>Popular Menu</Text>
//       </View>

//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  
  },
  best:{
    flexDirection: 'row'
  },
  popular:{
    color: '#fff'
  },
  tabNavigator:{
   
    borderRadius: 20
  },
  content: {
    marginTop: 5,
  },
  HomeTab:{
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff'
  }
});
