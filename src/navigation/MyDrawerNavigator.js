import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyStackNavigator from "./MyStackNavigator";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import UserContext from "../context/UserContext";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import DrawerContent from "../components/DrawerContent";
import BookAdd from "../screens/BookAdd";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default () => {
  const state = useContext(UserContext);

  if (state.isLoading === true) {
    return <SplashScreen />;
  }

  return (
    <Drawer.Navigator
      initialRouteName="Book store"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Book Store" component={MyStackNavigator} />
      {state.isLoggedIn ? (
        <>
          {state.userRole === "admin" && (
            <Drawer.Screen name="Add new book" component={BookAdd} />
          )}
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen
            name="Logout"
            component={HomeScreen}
            listeners={() => {
              state.logout();
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen name="Registration" component={SignupScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};
