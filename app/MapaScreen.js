import React, { Component } from "react";
import { View, StyleSheet, Button, Alert, TextInput, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default class MapaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marcadores: [],
      nomeLocal: "",
      region: null,
      erroLocalizacao: null,
      permissaoNegada: false,
      localizacaoAtual: null,
    };
  }

  //Solicitar permissão do GPS
  async componentDidMount() {
    await this.solicitarPermissaoLocalizacao();
  }

  solicitarPermissaoLocalizacao = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        erroLocalizacao: "Permissão de localização não concedida.",
        permissaoNegada: true,
      });
      return;
    }

    this.setState({ permissaoNegada: false });
    this.obterLocalizacaoAtual();
  };

  //Obter localização atual
  obterLocalizacaoAtual = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      this.setState({ region, localizacaoAtual: location.coords });
    } catch (error) {
      console.error(error);
      this.setState({
        erroLocalizacao: "Não foi possível obter a localização atual.",
      });
    }
  };

  mostrarLocalizacaoAtual = async () => {
    await this.obterLocalizacaoAtual();
    if (!this.state.erroLocalizacao) {
      Alert.alert(
        "Localização Atualizada",
        "Sua localização atual foi atualizada no mapa."
      );
    } else {
      Alert.alert("Erro", this.state.erroLocalizacao);
    }
  };

  //Marcador
  adicionarMarcador = (coordinate, nome) => {
    const newMarker = {
      coordinate,
      nome,
    };

    this.setState((prevState) => ({
      marcadores: [...prevState.marcadores, newMarker],
    }));

    Alert.alert(
      "Marcador adicionado",
      `Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}, Nome: ${nome}`
    );
  };

  render() {
    const {
      region,
      marcadores,
      erroLocalizacao,
      permissaoNegada,
      localizacaoAtual,
    } = this.state;

    return (
      <View style={styles.container}>
        {erroLocalizacao && permissaoNegada ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{erroLocalizacao}</Text>
            <Button
              title="Tentar novamente"
              onPress={this.solicitarPermissaoLocalizacao}
            />
          </View>
        ) : region ? (
          <MapView
            style={styles.map}
            region={region}
            onPress={(event) => {
              const { coordinate } = event.nativeEvent;
              const nome = "Vazamento";
              this.adicionarMarcador(coordinate, nome);
            }}
          >
            {marcadores.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.nome}
              />
            ))}
            {localizacaoAtual && (
              <Marker
                coordinate={localizacaoAtual}
                title="Você está aqui"
                pinColor="blue"
              />
            )}
          </MapView>
        ) : (
          <Text>Aguardando permissão ou localização...</Text>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Localização Atual"
            onPress={this.mostrarLocalizacaoAtual}
          />
          <Button
            title="Ver Relatório"
            onPress={() =>
              this.props.navigation.navigate("RelatorioScreen", {
                marcadores: this.state.marcadores,
              })
            }
          />
        </View>
      </View>
    );
  }
}

//Estilização
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
});
