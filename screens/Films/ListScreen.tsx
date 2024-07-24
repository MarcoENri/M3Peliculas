import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Film } from '../../Utils/models';
import apiClient from '../../Utils/apiClient';

const ListScreen = ({ navigation }: any) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await apiClient.get('/film');
      setFilms(response.data);
    } catch (err) {
      setError('Failed to fetch films');
      console.log('Error fetching films:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFilm = async (id: number) => {
    try {
      await apiClient.delete(`/film/${id}`);
      fetchFilms(); 
    } catch (err) {
      setError('Failed to delete film');
    }
  };

  const renderFilm = ({ item }: { item: Film }) => (
    <ImageBackground
      source={{ uri: 'https://www.indiewire.com/wp-content/uploads/2020/04/tilezoom.jpeg' }}
      style={styles.background}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.id}</Text>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemText}>{item.director}</Text>
        <Text style={styles.itemText}>{item.budget}</Text>
        <Text style={styles.itemText}>{item.duration}</Text>
        <Text style={styles.itemText}>{item.releaseDate}</Text>
        <Text style={styles.itemText}>{item.genre}</Text>
        <Text style={styles.itemText}>{item.boxOffice}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Scene', { film: item })}
          >
            <Text style={styles.buttonText}>View Scenes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditFilm', { film: item })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => deleteFilm(item.id)}
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
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFilm}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateFilm')}
      >
        <Text style={styles.buttonText}>Add New Film</Text>
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
    resizeMode: 'cover', // Asegura que la imagen cubra todo el área disponible
    padding: 10, // Ajusta el padding según lo necesites
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

export default ListScreen;
