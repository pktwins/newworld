import React from "react";
import { Alert } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import { mainColor } from "../Constant";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: mainColor },
      headerTintColor: "white",
      headerTitleStyle: { fontSize: 22 },
    }}
    initialRouteName="Home"
  >
    <Stack.Screen
      name="BookStore"
      component={HomeScreen}
      options={({ navigation }) => ({
        title: "New world bookstore",
      })}
    />

    <Stack.Screen
      name="Detail"
      component={BookDetailScreen}
      options={({ navigation }) => ({
        title: "Book detail",
        headerBackTitleVisible: true,
        headerBackTitle: "뒤로",
        headerTruncatedBackTitle: "뒤",
      })}
    />
  </Stack.Navigator>
);
