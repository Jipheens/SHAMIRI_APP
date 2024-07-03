import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { renderTopNav } from '../../components/TopNav';
import { renderBottomNav } from '../../components/BottomNav';

const Discover = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderTopNav()}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Discover</Text>
        <Text style={styles.subHeader}>Stay tuned for new and upcoming features!</Text>

        <Text style={styles.sectionSubHeader}>Current Features</Text>
        <View style={styles.section}>
          <View style={styles.listItem}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#28A745" />
            <Text style={styles.listItemText}>Create and manage personal journals</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#28A745" />
            <Text style={styles.listItemText}>Secure login and authentication</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#28A745" />
            <Text style={styles.listItemText}>User profile management</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#28A745" />
            <Text style={styles.listItemText}>View and update user details</Text>
          </View>
        </View>

        <Text style={styles.sectionSubHeader}>Upcoming Features</Text>
        <View style={styles.section}>
          <View style={styles.listItem}>
            <Ionicons name="ellipse-outline" size={24} color="#FFC107" />
            <Text style={styles.listItemText}>Enhanced search functionality for journals</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="ellipse-outline" size={24} color="#FFC107" />
            <Text style={styles.listItemText}>Integration with cloud storage for backups</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="ellipse-outline" size={24} color="#FFC107" />
            <Text style={styles.listItemText}>Collaborative journaling</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="ellipse-outline" size={24} color="#FFC107" />
            <Text style={styles.listItemText}>Mood tracking and analytics</Text>
          </View>
          <View style={styles.listItem}>
            <Ionicons name="ellipse-outline" size={24} color="#FFC107" />
            <Text style={styles.listItemText}>Customizable themes and layouts</Text>
          </View>
        </View>
      </ScrollView>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#195AE6',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionSubHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#195AE6',
    marginBottom: 12,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  section: {
    marginBottom: 32,
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default Discover;
