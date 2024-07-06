import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
  const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate("Login");
        console.log("Login button clicked");
      };
    
      const handleSignUp = () => {
        navigation.navigate("Register");
        console.log("SignUp button clicked");
      };
    
  return (
    <View style={styles.onboarding}>
        <Text style={styles.logo}>{`JOURNAL`}</Text>       
        <Text style={styles.halisiEats}>
            <Text style={styles.halisi}>{`WSJ  `}</Text>
            <Text style={styles.eats}>Today</Text>
        </Text>      
      <Image
        style={styles.onboardingIcon}
        contentFit="cover"
        source={require("../images/onboarding1.gif")}
      />      
      {/* Signup Button */}
      <TouchableOpacity onPress={handleSignUp} style={styles.groupParent}>
        <Text style={styles.signUp}>Sign up</Text>
      </TouchableOpacity>
      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.groupParent}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    onboarding: {
        backgroundColor: "#11273F",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",  
        alignItems: "center",  
      },  
    logo: {
      left: 100,
      color: "#fff",
      fontSize: 40,
      top: 100,
      fontSize: 30,
      width: 356,
    },  
    halisi: {
      color: "#fff",
      fontSize: 30,
    },
    eats: {
      color: "#195AE6",
    },
    halisiEats: {
      top: 170,
      fontSize: 30,
      width: 356,
      textAlign: "center",
      position: "absolute",
    },    
    onboardingIcon: {
      top: 250,
      width: 249,
      height: 224,
      position: "absolute",
    },
    groupParent: {
        top: 450,        
        justifyContent: "center",  
        alignItems: "center",      
      },
      signUp: {
        top: 10,
        color: "#fff",
        backgroundColor: "#11273F",
        borderColor: "#FFF",
        borderWidth: 3,  
        width: 300,
        height: 50,
        borderRadius: 32,
        fontSize: 23,  
        textAlign: "center", 
        alignItems: "center",        
        lineHeight: 50,     
      },
    
      login: {
        top: 40,
        color: "#000",
        backgroundColor: "#FFF",
        width: 300,
        height: 50,
        borderRadius: 32,
        fontSize: 23,  
        textAlign: "center", 
        alignItems: "center",
        lineHeight: 50,    
      },
  
  });

export default Onboarding;
