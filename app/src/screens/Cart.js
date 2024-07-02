import React, {useState} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";

import { renderTopNav } from '../components/TopNav';
import { renderBottomNav } from '../components/BottomNav';


const Cart = () => {
    const navigation = useNavigation();  

    const [cartItems, setCartItems] = useState([
        {
          id: '1',
          name: 'First item',
          image: require('../images/menu1.png'), 
          price: 20,
          qty: 2,
        },
        {
          id: '2',
          name: 'Dish 12',
          image: require('../images/menu2.png'), 
          price: 20,
          qty: 2,
        },
        {
          id: '3',
          name: 'Another item',
          image: require('../images/menu3.png'), 
          price: 20,
          qty: 2,
        },
      ]);
      
  const removeFromCartHandler = (id) => {
    console.log(`Remove item with ID: ${id}`);
  };

  const handleContinue = () => {
   // navigation.navigate("Shipping");
   console.log("clicked");
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{`${index + 1}) ${item.name}`}</Text>
        <Text style={styles.productPrice}>Ksh {item.price}</Text>

        {/* Quantity Select Box */}
        <Picker
          style={styles.quantityPicker}
          selectedValue={item.qty}
          onValueChange={(value) => handleQuantityChange(item.id, value)}>
          {[...Array(20).keys()].map((i) => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeFromCartHandler(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleQuantityChange = (productId, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, qty: quantity } : item
    );
    setCartItems(updatedCartItems);
  };


  const getTotalItems = () => {
    return cartItems.reduce((acc, currItem) => acc + currItem.qty, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, currItem) => acc + currItem.price * currItem.qty, 0);
  };


  

  return (    
    <SafeAreaView style={{ flex: 1 }}>
      {renderTopNav()}      
        <Text style={styles.title}>Cart</Text>
        {cartItems.length === 0 ? (
          <Text>Your cart is empty</Text>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
        <ScrollView>
        <View style={styles.summaryContainer}>
          <Text>Total Items: {getTotalItems()}</Text>
          <Text>Total Price: Ksh {getTotalPrice()}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleContinue}>
            <Text style={styles.text}>Proceed</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  summaryContainer: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    marginTop: 16,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  btn: {
    width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    alignSelf: 'center',
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

export default Cart;
