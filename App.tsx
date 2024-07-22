// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './screens/Films/ListScreen';
import EditScreen from './screens/Films/EditScreen';
import CreateScreen from './screens/Films/CreateScreen';
import LoginScreen from './screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FilmsList" component={ListScreen} />
        <Stack.Screen name="EditFilm" component={EditScreen} />
        <Stack.Screen name="CreateFilm" component={CreateScreen} />
        {/* Asegúrate de que todos los nombres aquí coincidan con los nombres utilizados en la navegación */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
