import { StyleSheet,Pressable, Image, Text, View } from 'react-native'
import React from 'react'
import rest from '../assets/rest.jpg'
import { useNavigation} from '@react-navigation/native'
import { HoverEffect } from 'react-native-gesture-handler';

export default function LoadScreen() {

    const navigation =useNavigation();

    const handleGetStarted=()=>{
        navigation.navigate('LoginScreen');
    }

  return (
    <View style={styles.container}>
    <Text style={styles.header}> Foodies Spot</Text>

    <View style={styles.image}>
      <Image source={rest} style={styles.imageLoad} />
    </View>
    <Text style={styles.enjoy}> Enjoy</Text>
    <Text style={styles.meal}> your meal</Text>
    <View style={styles.button}>
      <Pressable
      onPress={handleGetStarted}>
        <Text style={styles.buttonName}> Get Started</Text>
      </Pressable>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        padding: 30,
        backgroundColor: '#BC5810',
        justifyContent: 'center'
      },
      header: {
       
        top: 0,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#fff',
      },
      image: {
        display: 'flex',
        width: 285,
        height: 285,
        borderRadius: 140,
        backgroundColor: 'blue',
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
      },
      imageLoad: {
        width: 280,
        height: 280,
       borderRadius: 140,
       
      },
      enjoy:{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#fff',
        marginTop: 40
      },
      meal:{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#fff'
      }
      ,
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'blue',
        marginTop: 80,
        marginLeft: 90,
      },
      buttonName: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#fff',
      },
})