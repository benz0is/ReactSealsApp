import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { WebView } from "react-native-webview";

export default function MovieScreen() {
  const apiurl =
    "https://api.themoviedb.org/3/search/movie?api_key=a90e2347b00a19f2b339bbd1c3699ed9&query=";
  const [state, setState] = useState({
    s: "Enter a movie",
    results: [],
    selected: {},
    selectedSimular: [],
    videos: ["undefined"],
  });

  const search = () => {
    axios(apiurl + state.s).then(({ data }) => {
      let results = data.results;
      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  };

  const movieApi = "https://api.themoviedb.org/3/movie/";
  const myApi = "?api_key=a90e2347b00a19f2b339bbd1c3699ed9";

  const openPopup = (id) => {
    axios(movieApi + id + myApi).then(({ data }) => {
      let result = data;
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };
  const simularMovieApi =
    "/similar?api_key=a90e2347b00a19f2b339bbd1c3699ed9&language=en-US&page=1";
  const simularMovies = (id) => {
    axios(movieApi + id + simularMovieApi).then(({ data }) => {
      let result = data.results;
      setState((prevState) => {
        return { ...prevState, selectedSimular: result };
      });
    });
  };
  const video =
    "/videos?api_key=a90e2347b00a19f2b339bbd1c3699ed9&language=en-US";
  const link = "https://www.youtube.com/watch?v=";

  const videoForPop = (id) => {
    axios(movieApi + id + video).then(({ data }) => {
      let result = data.results;
      setState((prevState) => {
        return { ...prevState, videos: result };
      });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
      <TextInput
        style={styles.searchbox}
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {state.results.map((result) => (
          <TouchableHighlight
            key={result.id}
            onPress={() => {
              openPopup(result.id);
              simularMovies(result.id);
              videoForPop(result.id);
            }}
          >
            <View style={styles.result}>
              <Image
                source={{
                  uri: "https://image.tmdb.org/t/p/w500/" + result.poster_path,
                }}
                style={styles.searchImage}
                resizeMode="cover"
              />

              <Text style={styles.heading}>{result.title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.title != "undefined" ? true : false}
      >
        <ScrollView style={styles.popContainer}>
          <Image
            source={{
              uri:
                "https://image.tmdb.org/t/p/w500/" + state.selected.poster_path,
            }}
            style={styles.popupImage}
          />
          <View style={styles.popup}>
            <Text style={styles.poptitle}>Title:{state.selected.title}</Text>
            <Text style={styles.rating}>
              Rating:{state.selected.vote_average}
            </Text>
            <Text style={styles.overview}>
              Overview:{state.selected.overview}
            </Text>
          </View>
          <View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text style={styles.trailer}>Trailer:</Text>
              <WebView
                style={{
                  width: "100%",
                  height: 400,
                  backgroundColor: "blue",
                  marginTop: 20,
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: link + state.videos[0].key }}
              />
            </View>
            <Text style={styles.poptitle}>Simular Movies:</Text>
            <ScrollView>
              {state.selectedSimular.slice(0, 4).map((result) => (
                <View style={styles.simularID} key={result.id}>
                  <Image
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + result.poster_path,
                    }}
                    style={styles.searchImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.heading}>{result.title}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <TouchableHighlight
            onPress={() =>
              setState((prevState) => {
                return { ...prevState, selected: {} };
              })
            }
          >
            <View>
              <Text style={styles.closebtn}>close</Text>
              <View style={styles.gap}></View>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    paddingTop: 70,
    backgroundColor: "gray",
  },
  searchbox: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 40,
    borderColor: "black",
  },
  result: {
    width: "100%",
    borderColor: "yellow",
  },
  heading: {
    fontSize: 20,
    backgroundColor: "white",
    fontWeight: "700",
    padding: 20,
  },
  searchImage: {
    width: "100%",
    height: 500,
  },
  popContainer: {
    position: "relative",
    top: 100,
  },
  poptitle: {
    fontWeight: "700",
    fontSize: 40,
  },
  rating: {
    fontWeight: "700",
    fontSize: 30,
  },
  popupImage: {
    height: 500,
    width: "100%",
  },
  overview: {
    fontSize: 20,
  },
  closebtn: {
    backgroundColor: "red",
    fontSize: 40,
    borderRadius: 5,
    textAlign: "center",
    paddingBottom: 50,
  },
  gap: {
    padding: 50,
  },
  simularID: {
    fontSize: 20,
    backgroundColor: "white",
    fontWeight: "700",
    padding: 20,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  trailer: {
    fontSize: 25,
  },
});
