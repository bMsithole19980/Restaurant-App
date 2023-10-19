import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  CheckBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../src/UserActions";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/Firebase";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userData = { email: user.email, agreedToTerms: isChecked };
        dispatch(login(userData));

        alert("Successfully logged in");
        navigation.navigate("HomeScreen");
      } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Foodie's spot</Text>
      <Text style={styles.slogaan}>
        Hi, welcome to your one-way stop for your tummy
      </Text>
      <View style={styles.form}>
        <Text style={styles.labels}>Username</Text>
        <TextInput
          style={{
            ...styles.inputs,
            ...(emailError ? styles.inputError : null),
          }}
          onChangeText={(text) => setEmail(text)}
          placeholder="Your email..."
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <Text style={styles.labels}>Password</Text>
        <View
          style={{
            ...styles.inputs,
            ...(passwordError ? styles.inputError : null),
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password.."
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eye}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <View style={styles.checkBoxDetails}>
          <CheckBox
            value={isChecked}
            onValueChange={() => setIsChecked(!isChecked)}
          />
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
        <View style={styles.links}>
          <Text style={styles.question}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={styles.Register}>Register</Text>
          </Pressable>
        </View>
        <View style={styles.alternative}>
          <Text style={styles.altOption}>Or Sign up with</Text>
        </View>
        <View style={styles.socials}>
          <Pressable>
            <FontAwesome5 name="facebook" size={24} color="blue" />
          </Pressable>
          <Pressable>
            <MaterialCommunityIcons name="gmail" size={24} color="red" />
          </Pressable>
          <Pressable>
            <FontAwesome name="linkedin" size={24} color="blue" />
          </Pressable>
          <Pressable>
            <FontAwesome5 name="twitter" size={24} color="blue" />
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
    backgroundColor: "#BC5810",
    borderRadius: 20,
    backgroundColor: "#000000",
  },
  Header: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  slogaan: {
    color: "#fff",
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
    fontSize: 14,
    padding: 5,
    color: "#fff",
    marginRight: "79%",
  },
  inputs: {
    backgroundColor: "#D9D9D9",
    borderColor: "black",
    flexDirection: "row",
    height: 40,
    width: "90%",
    borderRadius: 10,
    fontSize: 12,
    fontFamily: "Poppins",
    marginRight: 28,
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
    right: 10
  },
  remember: {
    color: "#fff",
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
    width: "60%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "orange",
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
    gap: 10,
  },
  question: {
    fontFamily: "Poppins",
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
    color: "#fff",
    fontSize: 14,
  },
  socials: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    gap: 25,
  },
});
