// src/screens/Scenes/CreateScene.tsx
import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, ScrollView, Text } from 'react-native';
import { Scene } from '../../Utils/models';
import apiClient from '../../Utils/apiClient';

const CreateScene = ({ route, navigation }: any) => {
  const { film } = route.params;

  const [scene, setScene] = useState<Scene>({
    id: 0,
    description: '',
    minutes: 0,
    location: '',
    setting: '',
    filmId: film.id,
  });

  const handleCreate = async () => {
    try {
      await apiClient.post('/scene', scene);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Description"
          value={scene.description}
          onChangeText={text => setScene({ ...scene, description: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Minutes"
          value={scene.minutes.toString()}
          onChangeText={text => setScene({ ...scene, minutes: parseInt(text, 10) })}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Location"
          value={scene.location}
          onChangeText={text => setScene({ ...scene, location: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Setting"
          value={scene.setting}
          onChangeText={text => setScene({ ...scene, setting: text })}
          style={styles.input}
        />
      </View>
      <Button title="Create" onPress={handleCreate} />
    </ScrollView>
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



export default CreateScene;
