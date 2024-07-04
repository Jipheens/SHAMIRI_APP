import React from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons';

export const renderTopNav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.banner}>
        <View style={styles.bannerImages}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}> 
            <Ionicons name="bookmarks" size={25} color="white" />
          </TouchableOpacity>
          <View style={styles.spacer} /> 
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-circle-outline" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.topRightCorner} /> 
      <View style={styles.topLeftCorner} />  
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
  },
  banner: {
    backgroundColor: "#11273F",
    borderRadius: 30,
    padding: 40,
    justifyContent: 'space-between',
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    backgroundColor: "#11273F",
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    backgroundColor: "#11273F",
  },
  bannerImages: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spacer: {
    flex: 1, 
  },
});
