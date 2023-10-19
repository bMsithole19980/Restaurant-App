import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {auth} from '../Config/Firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const navigation = useNavigation();
  
    const resetPassword = async () => {
      setEmailError('');
  
      if (email.trim() === '') {
        setEmailError('Email is required');
        return;
      }
  
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset email sent. Check your inbox.');
      } catch (error) {
        console.error('Error sending password reset email:', error.message);
        alert('Password reset failed. Please try again.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.Header}>Foodie's spot</Text>
        <Text style={styles.sloogan}>Hi, welcome to your one-way stop for your tummy</Text>
        <Text style={styles.sloogan}> Don't worry we got you  reset you password</Text>
        <View style={styles.form}>
          <Text style={styles.labels}>Email</Text>
          <TextInput
            style={[styles.inputs, emailError ? styles.inputError : null]}
            onChangeText={(text) => setEmail(text)}
            placeholder='Your email...'
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
  
          <View style={styles.button}>
            <Pressable style={styles.buttonName} onPress={resetPassword}>
              <Text style={styles.buttonName}>Reset</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  
  export default ForgotPassword;
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#BC5810',
      borderRadius: 20,
      backgroundColor: '#000000',
    },
    Header: {
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    sloogan:{
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Poppin',
        fontSize: 15,
        textAlign: 'center',
        top: 40
    },
    form: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 150,
    },
    labels: {
      fontWeight: 'bold',
      fontSize: 14,
      padding: 5,
      color: '#fff',
      marginRight: '79%',
    },
    inputs: {
      backgroundColor: '#D9D9D9',
      borderColor: 'black',
      height: 40,
      width: '90%',
      borderRadius: 10,
      fontSize: 12,
      fontFamily: 'Poppins',
      marginRight: 28,
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '60%',
      height: 40,
      borderRadius: 10,
      backgroundColor: 'orange',
      marginTop: 50,
    },
    buttonName: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      color: '#fff',
    },
  });
  