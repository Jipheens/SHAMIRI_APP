import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const renderBottomNav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Ionicons name="cart-outline" size={24} color="black" />
        <Text style={styles.iconText}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
        <MaterialIcons name="delivery-dining" size={24} color="black" />
        <Text style={styles.iconText}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <AntDesign name="profile" size={24} color="black" />
        <Text style={styles.iconText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({  
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    width: '100%',
    alignSelf: "center",
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "#12D18E",
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 15,
    paddingHorizontal: 20,
  },
  iconText: {
    fontSize: 12,
    marginTop: 3,
  },
});
