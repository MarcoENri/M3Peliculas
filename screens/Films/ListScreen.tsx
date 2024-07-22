import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Film} from '../../Utils/models';
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
      console.log(response.data)
      setFilms(response.data);
    } catch (err) {
      setError('Failed to fetch films');
      console.log("Error Axios")
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const renderFilm = ({ item }: { item: Film }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>{item.title}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditFilm', { film: item })}
      />
      <Button
        title="Delete"
        onPress={() => deleteFilm(item.id)}
      />
    </View>
  );

  const deleteFilm = async (id: number) => {
    try {
      await apiClient.delete(`/films/${id}`);
      fetchFilms(); // Refetch films after deletion
    } catch (err) {
      setError('Failed to delete film');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={films}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderFilm}
    />
  );
};

export default ListScreen;
