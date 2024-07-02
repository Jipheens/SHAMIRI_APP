import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { renderBanner } from '../../components/Bannner';
import { renderBottomNav } from '../../components/BottomNav';

const Home = () => {
  const topRestaurantsData = [
    { id: 1, name: 'Restaurant 1', image: require('../../images/restaurant.jpg') },
    { id: 2, name: 'Restaurant 2', image: require('../../images/restaurant.jpg') },
    { id: 3, name: 'Restaurant 3', image: require('../../images/restaurant.jpg') },
    { id: 4, name: 'Restaurant 4', image: require('../../images/restaurant.jpg') },
    { id: 5, name: 'Restaurant 5', image: require('../../images/restaurant.jpg') },
    // Add more restaurant data as needed
  ];

  const topDishesData = [
    { id: 1, name: 'Dish 1', image: require('../../images/dish.png') },
    { id: 2, name: 'Dish 2', image: require('../../images/dish.png') },
    { id: 3, name: 'Dish 3', image: require('../../images/dish.png') },
    { id: 4, name: 'Dish 4', image: require('../../images/dish.png') },
    { id: 5, name: 'Dish 5', image: require('../../images/dish.png') },
    { id: 6, name: 'Dish 6', image: require('../../images/dish.png') },
    // Add more dish data as needed
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderBanner()}
      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="ios-search-circle-sharp" size={24} color="black" />
          <Text style={styles.searchBarText}>Restaurants,  Dishes</Text>
        </View>

        {/* Top Restaurants */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Restaurants</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topRestaurantsData.map((restaurant) => (
              <TouchableOpacity key={restaurant.id} style={styles.card}>
                <Image source={restaurant.image} style={styles.cardImage} />
                <Text>{restaurant.name}</Text>
                {/* Add more restaurant details or components */}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Top Dishes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Dishes</Text>
          <ScrollView horizontal showsVerticalScrollIndicator={false}>
            {topDishesData.map((dish) => (
              <TouchableOpacity key={dish.id} style={styles.card}>
                <Image source={dish.image} style={styles.cardImage} />
                <Text>{dish.name}</Text>
                {/* Add more dish details or components */}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
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
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    width: '80%',
    height: 45,
    alignSelf: 'center',
  },
  searchBarText: {
    color: '#11273F',
    marginLeft: 10,
  },
  sectionContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: 150,
    height: 200,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden', // Ensure image stays within the borders
  },
  cardImage: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
    marginBottom: 8,
  },
  viewAllButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  viewAllText: {
    color: '#195AE6',
    fontWeight: 'bold',
  },
});

export default Home;
