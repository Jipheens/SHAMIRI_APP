import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { renderTopNav } from '../../components/TopNav';
import { renderBottomNav } from '../../components/BottomNav';
import { backendUrl } from '../../../config/config';

const Home = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/journalEntries`);
      setJournalEntries(response.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEntries();
    }, [])
  );

  const filteredEntries = journalEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderTopNav()}
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-circle-sharp" size={24} color="black" />
          <TextInput
            style={styles.searchBarText}
            placeholder="Search Journal Entries"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>

        {/* Display Journal Entries */}
        <ScrollView>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Top Journal Entries</Text>
            {filteredEntries.map((entry) => (
              <View key={entry.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{entry.title}</Text>
                  <Text style={styles.cardCategory}>{entry.category}</Text>
                  <Text style={styles.cardDate}>{new Date(entry.date).toLocaleDateString()}</Text>
                  <Text numberOfLines={3}>{entry.content}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
});

export default Home;
