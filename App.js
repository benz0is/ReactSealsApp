import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createBottomTabNavigator,
  createTabNavigator,
} from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./components/HomeScreen.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import * as firebase from "firebase";
import LoadingScreen from "./components/LoadingScreen.js";
import MovieScreen from "./components/MovieScreen.js";
import ProfileScreen from "./components/ProfileScreen.js";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyC0l5kYvLby3jNR_I81w4HOyt5oYBoXaes",
  authDomain: "movieapp-7a7d9.firebaseapp.com",
};
firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    MovieScreen: MovieScreen,
    ProfileScreen: ProfileScreen,
  },
  {
    headerMode: "none",
  }
);

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
    },
    { initialRouteName: "Loading" }
  )
);
