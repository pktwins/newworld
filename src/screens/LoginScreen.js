import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import UserContext, { UserState } from "../context/UserContext";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const state = useContext(UserContext);
  console.log("======" + state.isLoggedIn + "=======")

  const loginHandler = () => {
    setError(null);
    if (email.length == 0) {
      Alert.alert('email field is empty, please enter user email');
      return;
    }
    if (password.length == 0) {
      Alert.alert('password field is empty, please enter password');
      return;
    }
    state.login(email, password, navigation);
  };


  return (
    <View>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={require("../../assets/images/signup.jpeg")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          color: "gray"
        }}
      >
        Login
      </Text>

      {error &&
        <Text style={{ margin: 30, textAlign: 'center', color: 'red' }}>
          {error}
        </Text>}
      <MyInput
        value={email}
        keyboardType="email-address"
        placeholder="Please enter your e-mail address"
        onChangeText={setEmail}
      />
      <MyInput
        value={password}
        secureTextEntry={true}
        placeholder="Please enter your password"
        onChangeText={setPassword}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <MyButton title="Back" onPress={() => navigation.goBack()} />
        <MyButton title="Login" onPress={loginHandler} />
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  inputField: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10
  },
  button: {
    marginVertical: 5
  }
});
