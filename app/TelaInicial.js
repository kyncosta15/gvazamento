import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

export default function TelaInicial({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/tela_inicial.png")}
        style={styles.image}
      />
      <Text style={styles.maintitle}>GVazamento</Text>
      <Text style={styles.title1}>
        Toque no local desejado e marque um ponto de vazamento de água
      </Text>
      <Text style={styles.title}>Duplo toque para ZOOM</Text>
      <Button style={styles.btn} 
        title="Começar"
        onPress={() => navigation.navigate("MapaScreen")}
        color="#c1c1c1"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A90E2",
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 25,
    margin: 5,
  },

  title1: {
    fontSize: 24,
    color: "#fff",
    padding: 20,
  },

  maintitle: {
    fontSize: 40,
    color: "#fff",
  },

  btn: {
    height: 30,
    backgroundColor:"#a3a1a1",
  }
});
