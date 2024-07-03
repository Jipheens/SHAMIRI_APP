import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons  } from '@expo/vector-icons';

export const renderBanner = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.banner}>
        <View style={styles.bannerImages}>
        <Ionicons name="bookmarks-outline" size={40} color="white" />
          <View style={styles.notificationsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-circle-outline" size={50} color="white"  />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationBox}>
          <Ionicons name="location" size={24} color="#11273F" />
          <Text style={styles.locationText}>Your Location</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({    
    banner: {
      backgroundColor: "#11273F",
      borderRadius: 30,
      padding: 50,
      justifyContent: 'space-between',      
      width: '100%',
    },
    bannerImages: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "auto",
    }, 
    text: {
      fontFamily: "Roboto",
      fontSize: 18,
      color: "white",
      marginTop: 10,
    }, 
      locationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20, 
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        height: 45,
      },      
      locationText: {
        color: '#11273F',
        marginLeft: 10,
      },
});
