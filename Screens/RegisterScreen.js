import React, { useState } from "react";
import { CheckBox, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/Firebase";
import { Picker } from "@react-native-picker/picker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Config/Firebase";
import Toast from 'react-native-toast-message'; // Import the toast library

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 3000,
    });
  };

  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email is required");
      showToast('error', 'Registration failed', 'Email is required');
      return;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      showToast('error', 'Registration failed', 'Password is required');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName: name,
        lastName,
        email,
        phone,
        role,
      });

      showToast('success', 'Registration Successful', 'You can now log in.');
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error registering user:", error.message);
      showToast('error', 'Registration failed', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Foodies spot</Text>
      <Text style={styles.slogaan}>
        Hi, welcome to your one-way stop for your tummy
      </Text>
      <View style={styles.form}>
        <Text style={styles.labels}>First Name</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={(text) => setName(text)}
          placeholder="First Name..."
        />
        <Text style={styles.labels}>Last Name</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={(text) => setLastName(text)}
          placeholder="Last Name.."
        />
        <Text style={styles.labels}>Email</Text>
        <TextInput
          style={[styles.inputs, emailError ? styles.inputError : null]}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email.."
        />
        <Text style={styles.labels}>Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.inputs}
        >
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <Text style={styles.labels}>Password</Text>
        <View style={[styles.inputs, passwordError ? styles.inputError : null]}>
          <TextInput
            style={{ flex: 1 }}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password.."
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: 10 }}
          >
            <FontAwesome5
              name={showPassword ? "eye" : "eye-slash"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <Text style={styles.labels}>Phone</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={(text) => setPhone(text)}
          placeholder="(+27) 73 245 1457.."
        />
        <View style={styles.button}>
          <Pressable style={styles.buttonName} onPress={handleRegister}>
            <Text style={styles.buttonName}>Register</Text>
          </Pressable>
        </View>
        <View style={styles.links}>
          <Text style={styles.question}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.Register}>Login</Text>
          </Pressable>
        </View>
        <View style={styles.alternative}>
          <Text style={styles.altOption}>Or Login with</Text>
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
        
        {/* Toast Container */}
        <Toast style={styles.toastContainer} position="bottom" />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  Header: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  slogaan: {
    color: "#000",
    fontWeight: "bold",
    fontFamily: "Poppin",
    fontSize: 15,
    textAlign: "center",
    top: 40,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  labels: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontSize: 14,
    padding: 5,
    color: "#fff",
  },
  inputs: {
    backgroundColor: "#D9D9D9",
    borderColor: "black",
    alignSelf: "flex-start",
    flexDirection: "row",
    width: "90%",
    height: 40,
    borderRadius: 10,
    fontSize: 12,
    fontFamily: "Poppins",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    alignSelf: "flex-start",
    marginLeft: 10,
    color: "red",
    fontSize: 12,
  },
  eye: {
    top: 5,
  },
  inputCheck: {
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 5,
    gap: 2,
  },
  checkBoxDetails: {
    flexDirection: "row",
    gap: 10,
    color: "#fff",
  },
  checked: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "orange",
    marginTop: 10,
  },
  buttonName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#fff",
  },
  links: {
    padding: 5,
    flexDirection: "row",
    gap: 5,
  },
  question: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
  Register: {
    color: "blue",
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  altOption: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
  socials: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    gap: 25,
  },
  toastContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
