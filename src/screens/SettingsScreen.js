import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { mainColor, lightColor } from "../Constant";
import * as Animatable from "react-native-animatable";
import FormSwitch from "../components/FormSwitch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
import { expo } from "../../app.json";

const SettingsScreen = (props) => {
  const [alarm, setAlarm] = useState(false);
  const [notificationID, setNotificationID] = useState(null);
  const projectId = expo.projectId;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
    }),
  });

  useEffect(() => {
    const notificationResponseReceivedListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        Alert.alert("사용자 notification 위에 눌렀어요!!");
        console.log("돌려 받은 response 내용", response);
      });
    const notificationRecievedListener =
      Notifications.addNotificationReceivedListener((notification) =>
        Alert.alert("Attention", notification.request.content.data.message, [
          {
            text: "직접 보기",
            onPress: () => {
              props.navigation.navigate("Detail", {
                id: notification.request.content.data.id,
              });
            },
          },
          { text: "취소", onPress: () => {} },
        ])
      );

    // Permissions.getAsync(Permissions.NOTIFICATIONS)
    //   .then((result) => {
    //     if (result.status !== "granted") {
    //       Permissions.askAsync(Permissions.NOTIFICATIONS)
    //         .then((result) => console.log("+++", result))
    //         .catch((err) => console.log(err));
    //     }
    //   })
    //   .catch((error) => console.log(error));

    // Permissions.getAsync(Permissions.NOTIFICATIONS)
    //   .then((result) => {
    //     if (result.status !== "granted") {
    //       return Permissions.askAsync(Permissions.NOTIFICATIONS);
    //     }
    //     return result;
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     if (result.status === "granted") {
    //       Notifications.getExpoPushTokenAsync({
    //         projectId: "84601102-a982-4b04-a876-e637140c2839",
    //       }).then((result) => console.log("Expo result: ", result));
    //     }
    //   })
    //   .catch((err) => console.log(err));

    Notifications.requestPermissionsAsync()
      .then((result) => {
        console.log(result);
        if (result.status === "granted") {
          Notifications.getExpoPushTokenAsync({
            projectId: "84601102-a982-4b04-a876-e637140c2839",
          }).then((result) => console.log("Expo result: ", result));
        }
      })
      .catch((err) => console.log(err));

    AsyncStorage.getItem("notification_id")
      .then((result) => {
        console.log("NOTIFICATION_ID from asyncStorage", result);
        setNotificationID(result);
      })
      .catch((err) => console.log(err));

    AsyncStorage.getItem("alarm")
      .then((result) => {
        console.log("++++++", JSON.parse(result).alarm);
        setAlarm(JSON.parse(result).alarm);
      })
      .catch((err) => console.log(err));

    return () => {
      notificationRecievedListener.remove();
      notificationResponseReceivedListener.remove();
    };
  }, []);

  const toggleAlarm = () => {
    setAlarm((alarm) => {
      console.log("전에", alarm);
      const newValue = !alarm;
      console.log("후에", newValue);
      // if (newValue) {
      //   Notifications.scheduleNotificationAsync({
      //     content: {
      //       title: "book SALE!",
      //       body: "어떤 책이 세일되었는지 서둘러 확인하세요!",
      //       data: {
      //         id: "653f47b15a9d192d6a5c4e58",
      //         message: "60초마다 50% 힐인받을 수 있게 됐다!!!",
      //       },
      //     },
      //     trigger: {
      //       seconds: 5,
      //     },
      //   })
      //     .then((id) => {
      //       setNotificationID(id);
      //       console.log("sale will be informed as this ID", id);
      //       AsyncStorage.setItem("notification_id", id);
      //     })
      //     .catch((err) => console.log(err));
      // } else {
      //   Notifications.cancelScheduledNotificationAsync(notificationID)
      //     .then((result) => {
      //       AsyncStorage.removeItem("notification_id)");
      //       console.log("notification removed from AsyncStorage");
      //     })
      //     .catch((error) => console.log(error));
      // }
      if (newValue) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "book SALE!",
            body: "어떤 책이 세일되었는지 서둘러 확인하세요!",
            data: {
              id: "653f47b15a9d192d6a5c4e58",
              message: "60초마다 50% 힐인받을 수 있게 됐다!!!",
            },
          },
          trigger: {
            seconds: 5,
          },
        })
          .then((id) => {
            setNotificationID(id);
            console.log("sale will be informed as this ID", id);
            AsyncStorage.setItem("notification_id", id);
          })
          .catch((err) => console.log(err));
      } else {
        Notifications.cancelScheduledNotificationAsync(notificationID)
          .then((result) => {
            AsyncStorage.removeItem("notification_id");
            console.log("notification removed from AsyncStorage");
          })
          .catch((error) => console.log(error));
      }
      AsyncStorage.setItem("alarm", JSON.stringify({ alarm: newValue }));
      return newValue;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="light-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: mainColor,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontSize: 24, color: lightColor }}>
          - Settings for local notification
        </Text>
        <Text style={{ fontSize: 16, color: lightColor, marginTop: 10 }}>
          Please set alarm on book SALE
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 5,
          backgroundColor: "#fff",
          paddingHorizontal: 30,
          paddingVertical: 20,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <ScrollView>
          <FormSwitch
            label="Remind book SALE or not"
            icon="clock"
            value={alarm}
            onChangeValue={toggleAlarm}
            data={["remind me book sale", "do not remind me"]}
          />
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
