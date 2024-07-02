import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrderScreen = () => {
  const [cart, setCart] = useState({
    cartItems: [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    shippingAddress: {},
    paymentMethod: '',
  });
  const [order, setOrder] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Your API endpoint for fetching cart data
        const response = await axios.get('/api/cart'); // Adjust the URL accordingly

        // Update the cart state with the fetched data
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []); // Ensure to add any necessary dependencies to the dependency array

  const placeOrderHandler = async () => {
    try {
      // Your API endpoint for placing an order
      const response = await axios.post('/api/orders', {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });

      // Update the order state and set success to true
      setOrder(response.data);
      setSuccess(true);

      // Navigate to the order details screen
      navigation.navigate('OrderDetails', { orderId: response.data._id });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <CheckoutSteps step1 step2 step3 step4 />

        <View>
          {/* Shipping */}
          <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Shipping</Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Address: </Text>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </Text>
          </View>

          {/* Payment Method */}
          <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Payment Method</Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Method: </Text>
              {cart.paymentMethod.toUpperCase()}
            </Text>
          </View>

          {/* Order Items */}
          <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Order Items</Text>
            <View>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <View>
                  {cart.cartItems.map((item, idx) => (
                    <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                      <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 12 }} />
                      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.product })}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                      </TouchableOpacity>
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {item.qty} x ₹{item.price} = ₹{+item.qty * item.price}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, borderColor: 'gray', borderWidth: 1 }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Order Summary</Text>

            {/* Items Price */}
            <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Items</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>₹{cart.itemsPrice}</Text>
            </View>

            {/* Shipping Price */}
            <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Shipping</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>₹{cart.shippingPrice}</Text>
            </View>

            {/* Tax Price */}
            <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Tax</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>₹{cart.taxPrice}</Text>
            </View>

            {/* Total Price */}
            <View style={{ borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18 }}>Total</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>₹{cart.totalPrice}</Text>
            </View>
          </View>

          {/* Place Order Button */}
          <TouchableOpacity
            style={{
              backgroundColor: 'yellow',
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 16,
            }}
            onPress={placeOrderHandler}
            disabled={cart.cartItems.length === 0}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceOrderScreen;
