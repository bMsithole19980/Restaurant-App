import {
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  CheckBox,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';
import { Picker } from "react-native-web";
import { useRoute } from "@react-navigation/native";
import {db} from '../Config/Firebase';
import {collection , addDoc} from 'firebase/firestore';

export default function ReservationScreen() {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [occasion, setOccasion] = useState("");
  const [email , setEmail] =useState('');
  const [specialRequest, setSpecialRequest] = useState("");
  const [date, setDate]= useState('');
  const navigation = useNavigation();
  const route=useRoute();

  const {restaurantName, restaurantAddress, DeliveryTime ,restaurantImage, restaurantRating}= route.params;

  const handleReserve= async()=> {
    try{
    const reservationRef= collection(db, "reservations");
    const reservationData={
      firstName: firstName,
      phoneNumber: phoneNumber,
      occasion: occasion,
      specialRequest: specialRequest,
      date: date,
      restaurantName: restaurantName,
      email: email,
    }
    const docRef = await addDoc(reservationRef,reservationData);
    console.log('reservation succesfully added with ID: ', docRef.id);
    navigation.navigate("Reserved");
    }catch(error){
      console.error('Error adding document: ', error);
    }
  }


  const handleBack = () => {
    navigation.navigate("MenuScreen");
    
  };

  const occasions = [
    { label: "select occasion", value: "select" },
    { label: "Birthday", value: "Birthday" },
    { label: "Dinner", value: "dinner" },
    { label: "Family meeting", value: "familyMeetings" },
  ];

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={handleBack}
        style={styles.back}
        name="arrow-back"
        size={24}
        color="black"
      />
      <Text style={styles.preview}>Ressevation preview</Text>
      <Text style={styles.confirm}>
        Confirm your reservation by entering your details
      </Text>
      <View style={styles.restDetails}>
        <Image style={styles.image} alt="" source={restaurantImage} />
        <View style={styles.resDetailsText}>
          <Text style={styles.restDetailsInfo}>{restaurantName}</Text>
          <Text style={styles.restAddress}>{restaurantAddress}</Text>
          <Text>{DeliveryTime}</Text>
          <Text>Date</Text>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.head}>Dinner details</Text>
        <Text style={styles.label}>First Name</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text)=> setFirstName(text)} 
        placeholder="Enter your full name" />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text)=> setPhoneNumber(text)} 
        placeholder="Enter your Address" />
        <Text style={styles.label}>Email</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text)=> setEmail(text)}
        placeholder="Enter your email address" />
        <Text style={styles.label}>No of guests</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text)=> setPhoneNumber(text)} 
        placeholder="enter number of guests" />
        <Text style={styles.label}>Date and Time</Text>
        <TextInput 
        style={styles.input}
        onChangeText={(text)=> setDate(text)} 
        placeholder="Enter your full name" />
        <Picker
          selectedValue={occasion}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setOccasion(itemValue)}
        >
          {occasions.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>

        {/* <TextInput style={styles.input} placeholder="Select Occassion" /> */}
        <Text style={styles.label}>Add a Special Request(optional)</Text>
        <TextInput 
        style={styles.input} 
        onChangeText={(text)=> setSpecialRequest(text)}
        placeholder="Select Occassion" />
        <View style={styles.checkBoxInfo}>
          <CheckBox style={styles.check} />
          <Text>By clicking "Reserve Now" you agree to the Terms of</Text>
        </View>
        <Pressable 
        style={styles.botton}
        onPress={handleReserve}>
          <Text style={styles.proceed}>Proceed</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 11,
    backgroundColor: "#fff",
  },
  back: {},
  preview: {
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: 24,
    left: 20,
  },
  confirm: {
    color: "grey",
    fontFamily: "Poppins",
    fontSize: 12,
    left: 20,
  },
  restDetails: {
    flexDirection: "row",
    width: "100%",
    hieght: 70,
    marginTop: 10,
    gap: 20,
  },
  restDetailsInfo:{
    fontSize:12,
    color: 'grey',
    fontFamily: 'Poppins',
    fontWeight: "bold"
  },
  restAddress:{
    fontSize:10,
    color: 'grey',
    fontFamily: 'Poppins',
  },
  image: {
    width: 110,
    hieght: 40,
  },
  form: {
    marginTop: 30,
  },
  head: {
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: 20,
    left: 20,
    color: "grey",
  },
  label: {
    fontWeight: "bold",
    fontFamily: "Poppins",
    fontSize: 12,
    left: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    width: "90%",
    height: 40,
    borderRadius: 5,
    fontSize: 12,
    fontFamily: "Poppins",
    marginLeft: 20,
    fontSize: 15,
  },
  checkBoxInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    top: 20,
  },
  check: {
    marginLeft: 20,
    marginTop: 10,
    gap: 50,
  },
  botton: {
    width: '90%',
    height: 40,
    backgroundColor: 'green',
    color: '#fff',
    top: 100,
    left: 20,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 10,
  },
  proceed: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});
