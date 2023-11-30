import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function adminNavbar() {
  return (
    <View style={styles.container}>
     <Text>Dashboard</Text>
     <Ionicons name="notifications-sharp" size={24} color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})