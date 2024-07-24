import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/RegisterScreen'; // Asegúrate de que esta ruta es correcta
import ListScreen from './screens/Films/ListScreen';
import EditScreen from './screens/Films/EditScreen';
import CreateScreen from './screens/Films/CreateScreen';
import ListScene from './screens/Scenes/ListScreen';
import EditScene from './screens/Scenes/EditScene';
import CreateScene from './screens/Scenes/CreateScreen';
import ListCharacter from './screens/Characters/ListScreen';
import EditCharacter from './screens/Characters/EditScreen';
import CreateCharacter from './screens/Characters/CreateScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="FilmsList" component={ListScreen} />
        <Stack.Screen name="EditFilm" component={EditScreen} />
        <Stack.Screen name="CreateFilm" component={CreateScreen} />
        <Stack.Screen name="Scene" component={ListScene} />
        <Stack.Screen name="EditScene" component={EditScene} />
        <Stack.Screen name="CreateScene" component={CreateScene} />
        <Stack.Screen name="CharactersList" component={ListCharacter} />
        <Stack.Screen name="EditCharacter" component={EditCharacter} />
        <Stack.Screen name="CreateCharacter" component={CreateCharacter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
