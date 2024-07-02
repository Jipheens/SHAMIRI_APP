import React from "react";
import { View, Text, StyleSheet, ScrollView , SafeAreaView } from "react-native";

import { renderTopNav } from "../../components/TopNav";
import { renderBottomNav } from "../../components/BottomNav";

const Notifications = () => {
  const notificationsData = [
    { _id: "1", status: "unread", message: "New notification 1" },
    { _id: "2", status: "unread", message: "New notification 2" },
    { _id: "3", status: "read", message: "Recent notification 1" },
    { _id: "4", status: "read", message: "Recent notification 2" },
  ];

  const newNotifications = notificationsData.filter((notification) => notification.status === "unread");
  const recentNotifications = notificationsData.filter((notification) => notification.status === "read");

  return (
    <SafeAreaView style={styles.notificationContainer}>
        {renderTopNav()}  
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.notification}>
          <Text style={styles.textWrapper}>Notifications</Text>

          <Text style={styles.notificationLabel}>New</Text>
          {newNotifications.map((notification) => (
            <View key={notification._id} style={styles.notificationItem}>
              <Text>{notification.message}</Text>
            </View>
          ))}

          <Text style={styles.notificationLabel}>Recent</Text>
          {recentNotifications.map((notification) => (
            <View key={notification._id} style={styles.notificationItem}>
              <Text>{notification.message}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  notification: {
    backgroundColor: "#ffffff",
    padding: 16,
  },
  textWrapper: {
    color: "#130138",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  notificationLabel: {
    color: "#130138",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  notificationItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default Notifications;
