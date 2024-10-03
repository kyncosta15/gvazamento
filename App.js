import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaInicial from "./app/TelaInicial";
import MapaScreen from "./app/MapaScreen";
import RelatorioScreen from "./app/RelatorioScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen
          name="Tela Inicial"
          component={TelaInicial}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MapaScreen" component={MapaScreen} />
        <Stack.Screen name="RelatorioScreen" component={RelatorioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
