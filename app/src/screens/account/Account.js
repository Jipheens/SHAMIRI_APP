import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserIcon } from 'react-native-heroicons/outline';

import { renderTopNav } from '../../components/TopNav';
import { renderBottomNav } from '../../components/BottomNav';
import { AuthContext } from '../../AuthContext';
import { backendUrl } from '../../../config/config';

const Account = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserData(user);
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

      const response = await axios.put(`${backendUrl}/api/users/profile`, updateUser, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const updatedUser = response.data;
      await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setLoading(false);
      setMessage('Profile updated successfully');
      setModalVisible(false);
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
            <TouchableOpacity >
              <UserIcon size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {message && <Text style={styles.message}>{message}</Text>}
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Full name:</Text>
          <Text style={styles.detailText}>{userData.name}</Text>
          <Text style={styles.label}>Phone number:</Text>
          <Text style={styles.detailText}>{userData.phone}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.detailText}>{userData.email}</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
          <Text style={styles.text}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.logoutBtn]} onPress={handleLogout}>
          <Text style={[styles.text, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      {renderBottomNav()}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Update Profile</Text>
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

              {loading ? (
                <ActivityIndicator size="large" color="#195AE6" />
              ) : (
                <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    borderRadius: 15,
    backgroundColor: '#11273F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  detailsContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    color: '#195AE6',
  },
  detailText: {
    fontSize: 15,
    marginBottom: 20,
    color: '#333',
  },
  message: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
  },
  formContainer: {
    width: '80%',
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#195AE6',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cancelBtn: {
    backgroundColor: 'gray',
  },
});

export default Account;
