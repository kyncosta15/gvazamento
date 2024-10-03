import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function RelatorioScreen({ navigation, route }) {
  const { marcadores } = route.params;

  const handleLinkPress = (coordinate) => {
    navigation.navigate("MapaScreen", { coordinate });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Marcadores</Text>
      <FlatList
        data={marcadores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLinkPress(item.coordinate)}>
            <View style={styles.item}>
              <Text>Latitude: {item.coordinate.latitude}</Text>
              <Text>Longitude: {item.coordinate.longitude}</Text>
              <Text>Nome: {item.nome}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
