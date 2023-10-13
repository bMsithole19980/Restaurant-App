import { StyleSheet ,Text, View, Image } from 'react-native';
import React from 'react';

export default function Restaurants() {
  return (
    <View style={styles.container}>
      <View style={styles.RestaurantsContainer}>
        
        <Text>KFC</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
        padding: 30
    },
    RestaurantsContainer:{
        backgroundColor: 'grey',
        width: '100%',
        height: '400%',
        borderRadius: 8
    },
    restImage:{
        width: 40
    }

})