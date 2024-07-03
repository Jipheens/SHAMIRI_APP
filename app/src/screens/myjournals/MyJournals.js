import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView, Button, TextInput, Modal } from 'react-native';
import axios from 'axios';

import { AuthContext } from '../../AuthContext';
import { backendUrl } from '../../../config/config';
import { renderBottomNav } from '../../components/BottomNav';

const MyJournals = () => {
  const { user } = useContext(AuthContext);
  const [journalEntries, setJournalEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({ title: '', content: '', category: '', date: new Date() });

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
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>My Journal Entries</Text>
          <Button title="Add New Entry" onPress={handleAddNew} />
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
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={currentEntry.category}
            onChangeText={(text) => setCurrentEntry({ ...currentEntry, category: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Content"
            value={currentEntry.content}
            onChangeText={(text) => setCurrentEntry({ ...currentEntry, content: text })}
            multiline
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
});

export default MyJournals;
