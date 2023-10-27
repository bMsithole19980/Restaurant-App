import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome,  MaterialIcons } from '@expo/vector-icons';

export default function Search({onSearch}) {
    const [search , setSearch]= useState('');
    const handleClear=()=>{
      setSearch('');
      onSearch('');
    }

    const handleSearch=(text)=>{
      setSearch(text);
      onSearch(text);
    }
  return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
        <FontAwesome name="search"  style={styles.icon} size={24} color="black" />  
        <TextInput
        style={styles.input}
        placeholder='Search based in location , cuisine or restaurant '
        value={search}
        onChangeText={handleSearch}/>
       <MaterialIcons name="clear" size={24} color="black" onPress={handleClear} />
        </View>
       
        
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      // flex: 1,
      top: 25
    },
    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        margin: 10,
        backgroundColor: '#fff',
        
    },
    icon:{
        paddingHorizontal: 10,
    },
    input:{
        flex: 1,
        fontSize: 14,
        fontFamily: 'Poppin',
      
    }

})