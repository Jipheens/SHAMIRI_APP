import React from 'react';
import { StyleSheet, View, TouchableOpacity,} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons  } from '@expo/vector-icons';

export const renderTopNav = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.banner}>
        <View style={styles.bannerImages}>
        <Ionicons name="fast-food-outline" size={40} color="white" />
          <View style={styles.notificationsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-circle-outline" size={50} color="white"  />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({    
    banner: {
      backgroundColor: "#11273F",
      borderRadius: 30,
      padding: 40,
      justifyContent: 'space-between',      
      width: '100%',
    },
    bannerImages: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "auto",
    },    
    
});
