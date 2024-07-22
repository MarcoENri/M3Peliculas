// src/screens/Films/CreateScreen.tsx
import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import { Film } from '../../Utils/models';
import apiClient from '../../Utils/apiClient';

const CreateScreen = ({ navigation }: any) => {
  const [film, setFilm] = useState<Film>({
    id: 0, // Puedes manejar el ID en el backend
    title: '',
    director: '',
    budget: 0,
    duration: 0,
    releaseDate: '',
    genre: '',
    box_office: 0,
  });

  const handleCreate = async () => {
    try {
      await apiClient.post('/films', film);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={film.title}
        onChangeText={text => setFilm({ ...film, title: text })}
      />
      {/* Agrega más campos según sea necesario */}
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
};

export default CreateScreen;
