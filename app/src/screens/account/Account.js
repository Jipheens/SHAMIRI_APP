import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import { renderTopNav } from '../../components/TopNav';
import { renderBottomNav } from '../../components/BottomNav';
import { backendUrl } from '../../../config/config';

const Account = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData) {
          const user = JSON.parse(userData);
          setUser(user);
          setName(user.name);
          setPhone(user.phone);
          setEmail(user.email);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (!name || !phone || !email || (password && password !== confirmPassword)) {
        setMessage('Please fill in all fields and ensure passwords match');
        setLoading(false);
        return;
      }

      const updateUser = {
        id: user.id,
        name,
        phone,
        email,
        password,
      };

      console.log('Updating user with:', updateUser);

      const response = await axios.put(`${backendUrl}/api/users/profile`, updateUser);

      const updatedUser = response.data;
      await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
      setLoading(false);
      setMessage('Profile updated successfully');
    } catch (error) {
      setLoading(false);
      setMessage('Update failed. Please try again.');
      console.error('Error updating profile:', error);
    }
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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.circleButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
              <ChevronLeftIcon size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {message && <Text style={styles.message}>{message}</Text>}
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>

          <View style={styles.bottomContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#195AE6" />
            ) : (
              <TouchableOpacity style={styles.btn} onPress={handleUpdate} disabled={loading}>
                <Text style={styles.text}>Update</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.btn, styles.logoutBtn]} onPress={handleLogout}>
              <Text style={[styles.text, styles.logoutText]}>Logout</Text>
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
    alignItems: 'center',
    paddingVertical: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '100%',
  },
  circleButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#195AE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  formContainer: {
    width: '80%',
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    color: '#195AE6',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#195AE6',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 5,
  },
  message: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  btn: {
    width: 254,
    height: 45,
    backgroundColor: '#11273F',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: 'red',
  },
  logoutText: {
    color: 'white',
  },
});

export default Account;

