// src/screens/Films/EditScreen.tsx
import React, { useEffect, useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import { Film } from '../../Utils/models';
import apiClient from '../../Utils/apiClient';

const EditScreen = ({ route, navigation }: any) => {
  const [film, setFilm] = useState<Film>(route.params.film);

  const handleSave = async () => {
    try {
      await apiClient.put(`/films/${film.id}`, film);
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
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default EditScreen;
