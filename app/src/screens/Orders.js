import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { renderTopNav } from '../components/TopNav';
import { renderBottomNav } from '../components/BottomNav';

// Mock data for order history
const orderHistoryData = [
  { id: '1', status: 'Delivered', date: '2023-01-01', total: 50 },
  { id: '2', status: 'Processing', date: '2023-02-15', total: 30 },
  { id: '3', status: 'Delivered', date: '2023-01-01', total: 50 },
  { id: '4', status: 'Processing', date: '2023-02-15', total: 30 },
  { id: '5', status: 'Delivered', date: '2023-01-01', total: 50 },
  { id: '6', status: 'Processing', date: '2023-02-15', total: 30 },
];

const Orders = () => {
  const navigation = useNavigation();

  const [orderHistory, setOrderHistory] = useState(orderHistoryData);

  const handleTrackOrder = (orderId) => {
    // Implement logic to track the order
    console.log(`Track order with ID: ${orderId}`);
  };

  const handleViewOrderDetails = (orderId) => {
    // Implement logic to view order details
    console.log(`View details for order with ID: ${orderId}`);
    // Navigate to order details screen
    navigation.navigate('OrderDetails', { orderId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => handleViewOrderDetails(item.id)}>
      <Text>{`Order ID: ${item.id}`}</Text>
      <Text>{`Status: ${item.status}`}</Text>
      <Text>{`Date: ${item.date}`}</Text>
      <Text>{`Total: $${item.total}`}</Text>

      {/* Track Order Button */}
      <TouchableOpacity
        style={styles.trackOrderButton}
        onPress={() => handleTrackOrder(item.id)}>
        <Text style={styles.buttonText}>Track Order</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderTopNav()}
    <View style={styles.container}>
      <Text style={styles.title}>Order</Text>

      {/* Order History Section */}
      <FlatList
        data={orderHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  trackOrderButton: {
    backgroundColor: '#195AE6',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Orders;
