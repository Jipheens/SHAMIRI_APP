import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { backendUrl } from "../../config/config";

const Register = () => {
  const navigation = useNavigation();  
  const [activePage] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const phoneNumberInputRef = useRef(null); 
  const emailInputRef = useRef(null); 
  const passwordInputRef = useRef(null); 
  const confirmPasswordInputRef = useRef(null); 

  const handleContinue = async () => {
    try {
      setLoading(true);

      if (!name || !phone || !email || !password || !confirmPassword) {
        setMessage("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/users`, {
        name,
        phone,
        email,
        password,
      });

      setLoading(false);
      setError("");

      navigation.navigate("OTP");
     
    } catch (error) {
      setLoading(false);
      setMessage("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }
  };
  
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={styles.circleButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Onboarding")}>
          <ChevronLeftIcon size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

        <View style={styles.slider}>
          <View style={[styles.sliderItem, activePage === 1 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 2 && styles.activeSliderItem]} />
        </View>
      </View>

        {error && <Text style={styles.error}>{error}</Text>}
        {message && <Text style={styles.error}>{message}</Text>}
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>What is your name?</Text>
            <Text style={styles.emoji}>👩🏽‍💼👨🏽‍💼</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              ref={phoneNumberInputRef}
              style={styles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              ref={emailInputRef}
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              ref={passwordInputRef}
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              ref={confirmPasswordInputRef}
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
      </View>

      <View style={styles.bottomContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#12D18E" />
          ) : (
            <TouchableOpacity style={styles.btn} onPress={handleContinue} disabled={loading}>
              <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
  },
  circleButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    backgroundColor: "#12D18E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  slider: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: -200,
    paddingHorizontal: 10,
  },
  sliderItem: {
    width: 25,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#FFF7EB",
    marginHorizontal: 5,
  },
  activeSliderItem: {
    backgroundColor: "#12D18E",
  },
  formContainer: {
    width: "80%",
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    marginRight: 10,
  },
  emoji: {
    fontSize: 20,
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    color: "#12D18E",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#12D18E",
    fontWeight: "bold",
    fontSize: 15,
    paddingVertical: 5,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  btn: {
    width: 254,
    height: 45,
    backgroundColor: "#11273F",
    alignSelf:"center",
    alignItems: "center",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Register;