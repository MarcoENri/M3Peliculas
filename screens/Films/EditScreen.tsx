// src/screens/Films/EditScreen.tsx
import React, { useEffect, useState } from 'react';
import { TextInput, Button, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Film } from '../../Utils/models';
import apiClient from '../../Utils/apiClient';

const EditScreen = ({ route, navigation }: any) => {
  const [film, setFilm] = useState<Film>(route.params.film);

  const handleSave = async () => {
    try {
      await apiClient.put(`/film/${film.id}`, film);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
    source={{ uri: 'https://i0.wp.com/www.fiz-x.com/wp-content/uploads/2016/03/JOHN-WICK-Art.jpg?fit=1000%2C708&ssl=1' }}
    style={styles.background}
    >
    <ScrollView contentContainerStyle={styles.container}>
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
        value={String(film.budget)}
        keyboardType="numeric"
        onChangeText={text => setFilm({ ...film, budget: Number(text) })}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={String(film.duration)}
        keyboardType="numeric"
        onChangeText={text => setFilm({ ...film, duration: Number(text) })}
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
        value={String(film.boxOffice)}
        keyboardType="numeric"
        onChangeText={text => setFilm({ ...film, boxOffice: Number(text) })}
      />
      <Button title="Save" onPress={handleSave} />
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a001a', 
  },
  background: {
    flex: 1,
    resizeMode: 'cover', 
    padding: 10, 
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



export default EditScreen;
