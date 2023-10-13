import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function Search() {
    const [search , setSearch]= useState('');
  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
        <FontAwesome name="search"  style={styles.icon} size={24} color="black" />  
        <TextInput
        style={styles.input}
        placeholder='Search Foodies spot'/>
        <Ionicons name="filter" style={styles.icon} size={24} color="black" />
        </View>
       
        
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1
    },
    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        margin: 10,
    },
    icon:{
        paddingHorizontal: 10,
    },
    input:{
        flex: 1
    }

})