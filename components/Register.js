import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
export default class Register extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({});
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.registerScreen}>
        <View>
          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons
              name="ios-arrow-round-back"
              size={32}
              color="gray"
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.greeting}>
          <Text>Please create an account</Text>
        </View>

        <View style={styles.errorMessage}>
          <Text style={styles.error}>{this.state.errorMessage}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          ></TextInput>
        </View>

        <View style={styles.form}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => this.setState({ password })}
            value={this.setState.password}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    alignItems: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "black",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "black",
    width: 300,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "lightgreen",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  registerScreen: {
    position: "relative",
    top: 50,
    alignSelf: "center",
  },
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
});
