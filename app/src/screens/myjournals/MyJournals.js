import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import { AuthContext } from '../../AuthContext';
import { backendUrl } from '../../../config/config';
import { renderTopNav } from '../../components/TopNav';
import { renderBottomNav } from '../../components/BottomNav';

const categories = ['Politics', 'Travel', 'Entertainment', 'Health', 'Science', 'Sports'];

const MyJournals = () => {
  const { user } = useContext(AuthContext);
  const [journalEntries, setJournalEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({ title: '', content: '', category: '', date: new Date() });
  const [contentHeight, setContentHeight] = useState(40);  

  const fetchData = async () => {
    try {      
      const userId = user.id;
      const token = user.token;
      const response = await axios.get(`${backendUrl}/api/journalEntries/myjournals/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJournalEntries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const token = user.token;
      if (currentEntry.id) {
        await axios.put(`${backendUrl}/api/journalEntries/${currentEntry.id}`, currentEntry, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${backendUrl}/api/journalEntries`, currentEntry, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (entry) => {
    setCurrentEntry(entry);
    setModalVisible(true);
  };

  const handleAddNew = () => {
    setCurrentEntry({ title: '', content: '', category: '', date: new Date() });
    setModalVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderTopNav()}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>My Journal Entries</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
            <Text style={styles.addButtonText}>Add New Entry</Text>
          </TouchableOpacity>
          {journalEntries.map((entry) => (
            <TouchableOpacity key={entry.id} style={styles.card} onPress={() => handleEdit(entry)}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{entry.title}</Text>
                <Text style={styles.cardCategory}>{entry.category}</Text>
                <Text style={styles.cardDate}>{new Date(entry.date).toLocaleDateString()}</Text>
                <Text numberOfLines={3}>{entry.content}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{currentEntry.id ? 'Edit Journal Entry' : 'New Journal Entry'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={currentEntry.title}
            onChangeText={(text) => setCurrentEntry({ ...currentEntry, title: text })}
          />
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={currentEntry.category}
            style={styles.picker}
            onValueChange={(itemValue) => setCurrentEntry({ ...currentEntry, category: itemValue })}
          >
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
          <TextInput
            style={[styles.input, { height: contentHeight }]}
            placeholder="Content"
            value={currentEntry.content}
            onChangeText={(text) => setCurrentEntry({ ...currentEntry, content: text })}
            multiline
            onContentSizeChange={(event) => setContentHeight(event.nativeEvent.contentSize.height)}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#195AE6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
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
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#195AE6',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MyJournals;
