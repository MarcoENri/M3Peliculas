import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Character } from '../../Utils/models';
import apiClient from '../../Utils/apiClient';

const ListCharacter = ({ route, navigation }: any) => {
  const { scene } = route.params;  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await apiClient.get(`/characters?sceneId=${scene.id}`);  
      setCharacters(response.data);
    } catch (err) {
      setError('Failed to fetch characters');
      console.log('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCharacter = async (id: number) => {
    try {
      await apiClient.delete(`/characters/${id}`);
      fetchCharacters();
    } catch (err) {
      setError('Failed to delete character');
    }
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <ImageBackground
    source={{ uri: 'https://ih1.redbubble.net/image.4920561798.2831/flat,750x,075,f-pad,750x1000,f8f8f8.jpg' }}
      style={styles.background}
    
    >
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.description}</Text>
      <Text style={styles.itemText}>{item.cost}</Text>
      <Text style={styles.itemText}>{item.nameActor}</Text>
      <Text style={styles.itemText}>{item.rol}</Text>
      <Text style={styles.itemText}>{item.importance}</Text>
      <Text style={styles.itemText}>{item.sceneDescription}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditCharacter', { character: item })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteCharacter(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );

  if (loading) {
    return <Text style={styles.itemText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.itemText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCharacter}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateCharacter', { sceneId: scene.id })}
      >
        <Text style={styles.buttonText}>Add New Character</Text>
      </TouchableOpacity>
    </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0000ff', 
    paddingVertical: 6, 
    paddingHorizontal: 10, 
    borderRadius: 4, 
    alignItems: 'center',
    width: 100, 
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
  buttonText: {
    color: '#ffffff', 
    fontSize: 14,
  },
});

export default ListCharacter;
