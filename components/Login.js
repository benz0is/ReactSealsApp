import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import * as firebase from "firebase";
export default class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.mainLoginPage}>
        <StatusBar barStyle="light-content"></StatusBar>
        <View style={styles.greeting}>
          <Text>Welcome back </Text>
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

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "blue" }}>New to MovieApp?</Text>
          <Text style={{ fontWeight: "500" }}>Sign Up</Text>
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
    alignItems: "center",
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
  mainLoginPage: {
    position: "relative",
    top: 50,
    alignContent: "center",
    alignSelf: "center",
  },
});
