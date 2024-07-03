import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import { renderBanner } from '../../components/Bannner';
import { renderBottomNav } from '../../components/BottomNav';
import { AuthContext } from '../../AuthContext';
import { backendUrl } from '../../../config/config';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [journalEntries, setJournalEntries] = useState([]);

  const fetchData = async () => {
    try {
      const token = user.token;
      const response = await axios.get(`${backendUrl}/api/journalEntries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJournalEntries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderBanner()}
      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="ios-search-circle-sharp" size={24} color="black" />
          <Text style={styles.searchBarText}>Search Journal Entries</Text>
        </View>

        {/* Journal Entries */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Journal Entries</Text>
          <ScrollView>
            {journalEntries.map((entry) => (
              <TouchableOpacity key={entry.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{entry.title}</Text>
                  <Text style={styles.cardCategory}>{entry.category}</Text>
                  <Text style={styles.cardDate}>{new Date(entry.date).toLocaleDateString()}</Text>
                  <Text numberOfLines={3}>{entry.content}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
