import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, CheckBox } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../src/UserActions";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/Firebase";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreenAdmin from "./AdminScreens/HomeScreenAdmin";
import Toast from 'react-native-toast-message'; // Import the toast library

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userRole = useSelector((state) => state.user.role);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email is required");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
    }

    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userData = { email: user.email, agreedToTerms: isChecked };
        dispatch(login(userData));

        // Replace the alert with a toast message for successful login
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          visibilityTime: 3000,
        });

        if (userRole === 'admin') {
          navigation.navigate('HomeScreenAdmin');
        } else {
          navigation.navigate('MainTab');
        }
      } catch (error) {
        console.error("Error logging in:", error.message);

        // Replace the alert with a toast message for login failure
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: 'Please check your credentials and try again.',
          visibilityTime: 3000,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Foodie's spot</Text>
      <Text style={styles.slogaan}>Login to your account</Text>
      <View style={styles.form}>
        <TextInput
          style={{
            ...styles.inputs,
            ...(emailError ? styles.inputError : null),
          }}
          onChangeText={(text) => setEmail(text)}
          placeholder="Your email..."
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={{ ...styles.inputs, ...(passwordError ? styles.inputError : null) }}>
          <TextInput
            style={{ flex: 1 }}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password.."
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eye}>
            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="black" />
          </Pressable>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        
        <View style={styles.checkBoxDetails}>
          <CheckBox value={isChecked} onValueChange={() => setIsChecked(!isChecked)} />
          <Text style={styles.remember}>Remember me</Text>
          <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgot}>Forgot password ?</Text>
          </Pressable>
        </View>

        <View style={styles.button}>
          <Pressable style={styles.buttonName} onPress={handleLogin}>
            <Text style={styles.buttonName}>Login</Text>
          </Pressable>
        </View>

        <View style={styles.alternative}>
          <Text style={styles.altOption}>-Or Sign up with-</Text>
        </View>
        <View style={styles.socials}>
          <Pressable style={styles.altIcon}>
            <FontAwesome5 name="facebook" size={30} color="blue" />
          </Pressable>
          <Pressable style={styles.altIcon}>
            <MaterialCommunityIcons name="gmail" size={30} color="red" />
          </Pressable>
          <Pressable style={styles.altIcon}>
            <FontAwesome name="linkedin" size={30} color="blue" />
          </Pressable>
        </View>
        
        <View style={styles.links}>
          <Text style={styles.question}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={styles.Register}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  Header: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    color: "#235BC8",
    marginTop: 70,
  },
  toastContainer: {
    height: 80, // Adjust the height according to your design
    justifyContent: 'center',
    alignItems: 'center',
  },
  slogaan: {
    color: "#343639",
    fontWeight: "bold",
    fontFamily: "Poppin",
    fontSize: 15,
    left: 1,
    padding: 30,
    top: 34,
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    backgroundColor: "#FFF",
    borderColor: "#C2BFBF",
    borderWidth: 2,
    flexDirection: "row",
    height: 50,
    width: "90%",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "Poppins",
    marginTop: 20,
  },
  eye: {
    top: 5,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  checkBoxDetails: {
    flexDirection: "row",
    gap: 10,
    color: "#fff",
    top: 10,
    left: 10,
  },
  remember: {
    color: "#2D2C2C",
    width: 120,
    bottom: 5,
  },
  forgot: {
    color: "blue",
    marginLeft: 60,
    width: 120,
    bottom: 5,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "#235BC8",
    marginTop: 50,
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
    gap: 15,
    marginTop: 40,
  },
  question: {
    fontFamily: "Poppins",
    color: "#2D2C2C",
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
    color: "#2D2C2C",
    fontSize: 14,
    marginTop: 40,
  },
  socials: {
    marginTop: 30,
    flex: 1,
    flexDirection: "row",
    gap: 25,
  },
  altIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#fff",
  },
});
