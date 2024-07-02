import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { renderTopNav } from '../../components/TopNav';
import { renderBottomNav } from '../../components/BottomNav';

const Account = () => {
  const navigation = useNavigation();

  const handleNavigation = (n) => {
    console.log('Clicked');
  };

  const handleLogout = async () => {    
    try {      
      await AsyncStorage.removeItem('@user');     
      navigation.navigate('Onboarding');
    } catch (error) {
      console.error('Error clearing user info:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderTopNav()}
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.section}>
            <TouchableOpacity style={styles.link} onPress={() => handleNavigation('')}>
              <Text style={styles.linkText}>Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.link} onPress={() => handleNavigation('')}>
              <Text style={styles.linkText}>About</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.link} onPress={() => handleNavigation('')}>
              <Text style={styles.linkText}>Help</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={[styles.link, styles.logout]} onPress={handleLogout}>
              <Text style={[styles.linkText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
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
  section: {
    marginBottom: 16,
    alignSelf: 'center',
    width: '80%',
  },
  link: {
    padding: 16,
    backgroundColor: '#f9fefe',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  linkText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
  logout: {
    backgroundColor: 'red',
  },
  logoutText: {
    color: 'white',
  },
});

export default Account;
