import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { CheckBox } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import {useDispatch} from 'react-redux';
import {login} from '../src/UserActions'

export default function LoginScreen() {

    const [email , setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [isChecked , setIsChecked]= useState(false);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleLogin=()=>{
        const userData = {email, password, agreedToTerms: isChecked};

        dispatch(login(userData));
        alert('Successfully logged in');
        navigation.navigate('HomeScreen');
    }
  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Login</Text>
      <View style={styles.form}>
        <Text style={styles.labels}>Email</Text>
        <TextInput
        style={styles.inputs}
        onChange={(text)=> setEmail(text)}
        placeholder='Your email...'
        required/>
        <Text style={styles.labels}>Password</Text>
        <TextInput
        style={styles.inputs}
        onChange={(text)=> setPassword(text)}
        placeholder='Password..'
        required/>
        <View style={styles.checkBoxDetails}>
        <CheckBox
        checked={isChecked} 
        style={styles.checked}
        onPress={()=> setIsChecked(!isChecked)}/>
        <Text>click to agree all terms and condition for using foodies app</Text>

        </View>
        
        <View style={styles.button}>
        <Pressable
        style={styles.buttonName}
        onPress={handleLogin}>
            <Text style={styles.buttonName}>Login</Text>
        </Pressable>
        </View>
        <View style={styles.links}>
            <Text style={styles.question}> Don't have an account ?</Text>
           <Pressable
           onPress={()=> navigation.navigate('RegisterScreen')}>
           <Text style={styles.Register}>Register</Text>
           </Pressable>
            
        </View>
        <View style={styles.alternative}>
            <Text style={styles.altOption}>Or Sign up with</Text>
             {/* social icons */}
        </View>
        <View style={styles.socials}>
            <Pressable>
            <FontAwesome5 name="facebook" size={24} color="blue" />
            </Pressable>
            <Pressable>
            <MaterialCommunityIcons name="gmail" size={24} color="red" />
            </Pressable>
            <Pressable>
            <AntDesign name="twitter" size={24} color="lightblue" />
            </Pressable>
            <Pressable>
            <FontAwesome5 name="linkedin" size={24} color="blue" />
            </Pressable>
        </View>
        

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor: '#BC5810'
    },
    Header:{
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'

    },
    form:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150
    },
    labels:{
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        fontSize: 17,
        padding: 5,
        color: '#fff'
    },
    inputs:{
         backgroundColor: '#fff',
        borderColor: 'black',
        alignSelf: 'flex-start',
        width: "100%",
        height: 40,
        borderRadius: 10,
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: 'bold'
    },
    checkBoxDetails:{
        flexDirection: 'row',
        gap:10,
        color: '#fff'
    },
    checked:{
        alignSelf: 'flex-start',
        marginTop: 10
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 40,
        borderRadius: 10,
        backgroundColor: "blue",
        marginTop: 80,
    },
    buttonName: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#fff',
      },
      links:{
        padding: 5,
        flexDirection: 'row',
        gap: 15
      },
      question:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 17,
      },
      Register:{
        color: 'blue',
        fontSize: 17,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
      },
      altOption:{
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 17,
      },
      socials:{
        flex: 1,
        flexDirection: 'row',
        gap: 25
      }

})