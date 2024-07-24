
import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Alert } from 'react-native';
import apiClient from '../../Utils/apiClient';
import { Film } from '../../Utils/models';

const CreateScreen = ({ navigation }: any) => {
  const [film, setFilm] = useState<Film>({
    id: 0, 
    title: '',
    director: '',
    budget: 0,
    duration: 0,
    releaseDate: '',
    genre: '',
    boxOffice: 0,
  });

  const handleSave = async () => {
    try {
      await apiClient.post('/film', film);
      Alert.alert('Success', 'Film created successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create film');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={film.title}
        onChangeText={text => setFilm({ ...film, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Director"
        value={film.director}
        onChangeText={text => setFilm({ ...film, director: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Budget"
        value={film.budget.toString()}
        onChangeText={text => setFilm({ ...film, budget: parseFloat(text) })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={film.duration.toString()}
        onChangeText={text => setFilm({ ...film, duration: parseFloat(text) })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Release Date"
        value={film.releaseDate}
        onChangeText={text => setFilm({ ...film, releaseDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={film.genre}
        onChangeText={text => setFilm({ ...film, genre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Box Office"
        value={film.boxOffice.toString()}
        onChangeText={text => setFilm({ ...film, boxOffice: Number(text) })}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a001a', 
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#8a2be2', 
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#330033', 
    color: '#ffffff', 
  },
  button: {
    backgroundColor: '#0000ff', 
    paddingVertical: 6, 
    paddingHorizontal: 10, 
    borderRadius: 4, 
    alignItems: 'center',
    marginTop: 10,
    width: 100, 
    alignSelf: 'flex-end', 
  },
  addButton: {
    backgroundColor: '#0000ff', 
    paddingVertical: 6, 
    paddingHorizontal: 10, 
    borderRadius: 4, 
    alignItems: 'center',
    marginTop: 20,
    width: 150, 
    alignSelf: 'center', 
  },
  buttonText: {
    color: '#ffffff', 
    fontSize: 14,
  },
  item: {
    padding: 15,
    borderWidth: 1, 
    borderColor: '#8a2be2', 
    marginBottom: 10,
    backgroundColor: '#330033', 
    borderRadius: 8,
  },
  itemText: {
    color: '#ffffff', 
    fontSize: 16,
  },
});



export default CreateScreen;
