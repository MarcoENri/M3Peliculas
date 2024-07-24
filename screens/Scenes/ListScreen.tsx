import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Scene } from '../../Utils/models';
import apiClient from '../../Utils/apiClient';

const ListScene = ({ route, navigation }: any) => {
  const { film } = route.params; 
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScenes();
  }, []);

  const fetchScenes = async () => {
    try {
      const response = await apiClient.get(`/scene?filmId=${film.id}`); 
      setScenes(response.data);
    } catch (err) {
      setError('Failed to fetch scenes');
      console.error('Error fetching scenes:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteScene = async (id: number) => {
    try {
      await apiClient.delete(`/scene/${id}`);
      fetchScenes(); 
    } catch (err) {
      setError('Failed to delete scene');
      console.error('Error deleting scene:', err);
    }
  };

  const renderScene = ({ item }: { item: Scene }) => (
    <ImageBackground
    source={{ uri: 'https://keithandthemovies.com/wp-content/uploads/2015/02/wick-poster.jpg?w=1200' }}
      style={styles.background}
    >
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.description}</Text>
      <Text style={styles.itemText}>{item.minutes}</Text>
      <Text style={styles.itemText}>{item.location}</Text>
      <Text style={styles.itemText}>{item.setting}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CharactersList', { scene: item })}
        >
          <Text style={styles.buttonText}>View Characters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditScene', { scene: item })}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteScene(item.id)}
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
        data={scenes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderScene}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateScene', { film })}
      >
        <Text style={styles.buttonText}>Add New Scene</Text>
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

export default ListScene;
