import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import { Button } from "react-native-elements";
import icon from "./icon.jpg";

export default function ProfileScreen({ navigation }) {
  const [state, setState] = React.useState({
    s: "",
    results: [],
    selected: {},
    selectedSimular: [],
    videos: ["undefined"],
    email: "",
    searchResults: [],
  });
  const searchApi =
    "https://api.themoviedb.org/3/search/movie?api_key=a90e2347b00a19f2b339bbd1c3699ed9&query=";
  useEffect(() => {
    const { email, displayName } = firebase.auth().currentUser;
    setState({ email, displayName });
  }, []);

  const signOutUser = () => {
    firebase.auth().signOut();
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

  const Sealsurl = "http://academy.reactseals.com/";
  const SealsFburl = "https://www.facebook.com/ReactSeals/";
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
  return (
    <View>
      <View style={styles.mainHeader}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Text style={styles.HeaderText}>Home</Text>
        </TouchableOpacity>
        <View></View>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
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
      <Image
        source={require("./icon.jpg")}
        style={{ width: 400, height: 400, alignSelf: "center" }}
      ></Image>
      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>Hello {state.email}</Text>
        <TouchableOpacity onPress={signOutUser}>
          <Text style={styles.outBtn}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBtn: {
    fontSize: 30,
    fontWeight: "400",
    fontFamily: "sans-sarif",
    marginRight: 30,
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  outBtn: {
    width: 200,
    padding: 25,
    backgroundColor: "red",
    borderRadius: 4,
    textAlign: "center",
  },
  popContainer: { width: 600, alignSelf: "center" },
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
});
