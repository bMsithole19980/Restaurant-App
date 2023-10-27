import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RestaurantDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {restaurantName, restaurantImage, restaurantRating}= route.params;

    const goToMenuScreen=()=>{
      navigation.navigate('MenuScreen');
    };

    const handleBack=()=>{
      navigation.navigate('RestaurantDiscovery');
    }
  return (
    <View style={styles.container}>
        <Pressable 
        style={styles.back}
        onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Image style={styles.resImage} source={{uri: restaurantImage}}/>
        
        <Text style={styles.resName}>{restaurantName}</Text>

        <Text style={styles.resRating}>{restaurantRating}</Text>
        <Text>Location</Text>
        <Text> Delivery Time</Text>
        <View>
          <Pressable
          style={styles.button} 
          onPress={goToMenuScreen}>
            <Text style={styles.view}>View Menu</Text>
          </Pressable>
        </View>
    </View>
  )
}

export default RestaurantDetails

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 20

    },
    resName:{
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        top: 10
    },
    resImage:{
        width: '100%',
        height: 140, 
    },
    back:{
    },
    button:{
      left: 100,
      width: 140,
      height: 50,
      borderRadius: 10,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view:{
      fontWeight: 'bold',
      fontFamily: 'Poppins',
    }
})