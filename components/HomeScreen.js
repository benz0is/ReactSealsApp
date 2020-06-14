import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Image,
  Linking,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import MovieScreen from "./MovieScreen";
import { TextInput } from "react-native-gesture-handler";
import Modal from "modal-react-native-web";
import { WebView } from "react-native";

export default function HomeScreen({ navigation }) {
  const [state, setState] = useState({
    results: [],
    selected: {},
    upcomingmovies: [],
    selectedSimular: [],
    videos: ["undefined"],
    s: "",
    searchResults: [],
  });
  const searchApi =
    "https://api.themoviedb.org/3/search/movie?api_key=a90e2347b00a19f2b339bbd1c3699ed9&query=";
  const apiurl =
    "https://api.themoviedb.org/3/movie/popular?api_key=a90e2347b00a19f2b339bbd1c3699ed9&language=en-US&/?_limit=10";
  const movieApi = "https://api.themoviedb.org/3/movie/";
  const myApi = "?api_key=a90e2347b00a19f2b339bbd1c3699ed9";

  const upcomingApi =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=a90e2347b00a19f2b339bbd1c3699ed9&language=en-US&page=1";
  const video =
    "/videos?api_key=a90e2347b00a19f2b339bbd1c3699ed9&language=en-US";
  const link = "https://www.youtube.com/watch?v=";
  function search() {
    axios(apiurl).then(({ data }) => {
      let results = data.results;
      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  }
  function searchMov(link) {
    axios(searchApi + link).then(({ data }) => {
      let results = data.results;
      setState((prevState) => {
        return { ...prevState, searchResults: results };
      });
    });
  }
  const videoForPop = (id) => {
    axios(movieApi + id + video).then(({ data }) => {
      let result = data.results;
      setState((prevState) => {
        return { ...prevState, videos: result };
      });
    });
  };
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
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
  const openPopup = (id) => {
    axios(movieApi + id + myApi).then(({ data }) => {
      let result = data;
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  function searchUpcomMov() {
    axios(upcomingApi).then(({ data }) => {
      let results = data.results;
      setState((prevState) => {
        return { ...prevState, upcomingmovies: results };
      });
    });
  }
  useEffect(() => {
    searchUpcomMov();
    search();
  }, []);
  const Sealsurl = "http://academy.reactseals.com/";
  const SealsFburl = "https://www.facebook.com/ReactSeals/";

  return (
    <View style={styles.container}>
      <View style={styles.frontPage}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.HomePage}>
            <View style={styles.mainHeader}>
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
              >
                <Text style={styles.HeaderText}>Home</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.InputText}
                onChangeText={(text) =>
                  setState((prevState) => {
                    return { ...prevState, s: text };
                  })
                }
                value={state.s}
                placeholder={"Enter a movie"}
              />
              <TouchableOpacity
                onPress={typeof state.s === "" ? false : searchMov(state.s)}
              >
                <Text style={styles.inputBtn}>search</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileScreen")}
              >
                <Text style={styles.HeaderText}>Profile</Text>
              </TouchableOpacity>
              <View style={styles.Url}>
                <OpenURLButton style={styles.UrlText} url={Sealsurl}>
                  Seals Webpage
                </OpenURLButton>
                <OpenURLButton style={styles.UrlText} url={SealsFburl}>
                  Seals Facebook
                </OpenURLButton>
              </View>
            </View>
            <View></View>
            <Text style={styles.header}>Most popular movies</Text>
            <ScrollView horizontal={true}>
              {state.results.slice(0, 10).map((result) => (
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
                        uri:
                          "https://image.tmdb.org/t/p/w500/" +
                          result.poster_path,
                      }}
                      style={styles.searchImage}
                      resizeMode="contain"
                    />

                    <Text style={styles.heading}>{result.title}</Text>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
          <View style={styles.upcomingMov}>
            <Text style={styles.header}>Upcoming movies</Text>
            <ScrollView horizontal={true}>
              {state.upcomingmovies.slice(0, 10).map((result) => (
                <TouchableHighlight
                  key={result.id}
                  onPress={() => openPopup(result.id)}
                >
                  <View style={styles.result}>
                    <Image
                      source={{
                        uri:
                          "https://image.tmdb.org/t/p/w500/" +
                          result.poster_path,
                      }}
                      style={styles.searchImage}
                      resizeMode="contain"
                    />

                    <Text style={styles.heading}>{result.title}</Text>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>

          <View>
            <Text style={styles.SearchResult}>Search Results:</Text>
            <ScrollView horizontal={true}>
              {state.searchResults.map((result) => (
                <TouchableHighlight
                  key={result.id}
                  onPress={() => {
                    openPopup(result.id);
                    simularMovies(result.id);
                    videoForPop(result.id);
                  }}
                >
                  <View style={styles.results}>
                    <Image
                      source={{
                        uri:
                          "https://image.tmdb.org/t/p/w500/" +
                          result.poster_path,
                      }}
                      style={styles.searchImage}
                      resizeMode="cover"
                    />

                    <Text style={styles.heading}>{result.title}</Text>
                  </View>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
            resizeMode="contain"
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
            <Text style={styles.trailer}>Trailer:</Text>
            <WebView
              style={{
                width: 600,
                height: 400,
                backgroundColor: "blue",
                marginTop: 20,
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              source={{ uri: link + state.videos[0].key }}
            />
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
            </View>
          </TouchableHighlight>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  SearchResult: { fontSize: 40, alignSelf: "center" },
  popContainer: { width: 600, alignSelf: "center" },
  frontPage: { flexgrow: 1, height: "100%" },
  HomePage: { flex: 1 },
  Url: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mainHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#2089DC",
  },
  inputBtn: {
    fontSize: 30,
    fontWeight: "400",
    fontFamily: "sans-sarif",
    marginRight: 30,
    color: "white",
  },
  HeaderText: {
    fontSize: 30,
    fontWeight: "400",
    fontFamily: "sans-sarif",
    marginRight: 30,
    color: "white",
  },
  InputText: {
    fontSize: 30,
    fontWeight: "400",
    fontFamily: "sans-sarif",
    marginRight: 30,
    backgroundColor: "white",
  },
  header: {
    fontSize: 40,
    fontWeight: "500",
    textAlign: "center",
  },
  result: {
    width: "100%",
    borderColor: "yellow",
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    maxWidth: 150,
  },
  searchImage: {
    width: 150,
    height: 250,
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
  },
  gap: {
    padding: 50,
  },
  trailer: {
    fontSize: 35,
  },
  container: { flex: 1 },
  results: { marginRight: 100 },
});
