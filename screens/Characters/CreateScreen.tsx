import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, ScrollView } from 'react-native';
import apiClient from '../../Utils/apiClient';
import { Character } from '../../Utils/models';

const CreateCharacter = ({ route, navigation }: any) => {
  const { sceneId } = route.params; 
  const [character, setCharacter] = useState<Character>({
    id: 0,
    description: '',
    cost: 0, 
    nameActor: '',
    rol: '',
    importance: '',
    sceneDescription: '', 
  });

  const handleSave = async () => {
    try {
      await apiClient.post('/characters', {
        description: character.description,
        cost: character.cost,
        nameActor: character.nameActor,
        rol: character.rol,
        importance: character.importance,
        scene: { id: sceneId }, 
      });
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
          value={character.description}
          onChangeText={text => setCharacter({ ...character, description: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Cost"
          value={character.cost.toString()} // Asegúrate de convertir el número a string
          onChangeText={text => setCharacter({ ...character, cost: parseFloat(text) })}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Name Actor"
          value={character.nameActor}
          onChangeText={text => setCharacter({ ...character, nameActor: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Role"
          value={character.rol}
          onChangeText={text => setCharacter({ ...character, rol: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Importance"
          value={character.importance}
          onChangeText={text => setCharacter({ ...character, importance: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Scene Description"
          value={character.sceneDescription}
          onChangeText={text => setCharacter({ ...character, sceneDescription: text })}
          style={styles.input}
        />
      </View>
      <Button title="Save" onPress={handleSave} />
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
  
  

export default CreateCharacter;
