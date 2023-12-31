import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RestaurantDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {restaurantName, restaurantAddress, DeliveryTime ,restaurantImage, restaurantRating}= route.params;

    const goToMenuScreen=()=>{
     navigation.navigate('MenuScreen',{
        restaurantName: restaurantName,
        restaurantImage: restaurantImage,
        restaurantRating: restaurantRating,
        restaurantAddress: restaurantAddress,
        DeliveryTime: DeliveryTime,
     
     });
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
        <View style={styles.location}>
        <Ionicons name="location-outline" size={24} color="black" />
        <Text>{restaurantAddress}</Text>
        </View>
        <View style={styles.delivery}>
        <MaterialCommunityIcons name="truck-delivery" size={24} color="black" />
        {/* <Text> Delivery Time</Text> */}
        <Text>{DeliveryTime}</Text>
        </View>
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
    location:{
      flexDirection: 'row',
      top: 10,
      color: 'grey'
    },
    delivery:{
      flexDirection: 'row',
      top: 10,
    
    },
    button:{
      width: '90%',
      height: 40,
      backgroundColor: 'green',
      color: '#fff',
      top: 250,
      left: 20,
      alignItems: "center",
      justifyContent: 'center',
      borderRadius: 10,
  
    },
    view:{
      color: "#fff",
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      textAlign: 'center',
    }
})