// import BackgroundTimer from "react-native-background-timer";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { AsyncStorage } from "react-native";
import { registerForPushNotificationsAsync, sendPushNotification } from ".";
// var timerId;
const NOTIFICATION = "NOTIFICATION";
var data = [];
var makeRemoteRequest = async (userId) => {
  let baseUrl = `https://knekisan.com/`;
  const url = baseUrl + "api/v1/inquiry/user/" + userId;
  let newData;
  console.log("\n\n", url);
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      newData: [...res.data];
    })
    .catch((error) => {});
  return newData;
};
var notify = async (token) => {
  let oldData = data;
  let userId = await AsyncStorage.getItem("user");
  let newData = await makeRemoteRequest(userId);
  console.log("user id is ", userId);
  data = newData;
  if (newData && newData.length == oldData.length) {
    for (let i = 0; i < oldData.length; i++) {
      if (newData[i] && oldData[i]) {
        if (
          newData[i].status &&
          oldData[i].status &&
          newData[i].status !== oldData[i].status
        ) {
          let s = (newData[i].status === 'Approved' ? "अभिनंदन,जांच सफलतापूर्वक स्वीकृत" : "क्षमा करें, जांच अनुमोदन को अस्वीकार कर दिया गया है")
          sendPushNotification(token, newData[i].status, s, {});
        }
        if (
          newData[i].paymentRecievedFlag &&
          oldData[i].paymentRecievedFlag &&
          newData[i].paymentRecievedFlag !== oldData[i].paymentRecievedFlag
        ) {
          sendPushNotification(token, "भुगतान प्राप्त", "अभिनंदन,भुगतान सफलतापूर्वक प्राप्त किया गया", {});
        }
        if (
          newData[i].quantityRecievedFlag &&
          oldData[i].quantityRecievedFlag &&
          newData[i].quantityRecievedFlag !== oldData[i].quantityRecievedFlag
        ) {
          sendPushNotification(token, "प्राप्त मात्रा", "अभिनंदन,मात्रा सफलतापूर्वक प्राप्त की गई", {});
        }
      }
    }
  }
};
var intervalId;
const timerStart = async () => {
  console.log("timer started");
  data = await makeRemoteRequest();
  console.log("data fetched");
  let token = await registerForPushNotificationsAsync();
  console.log("token recieved", token);
  sendPushNotification(
    token,
    "प्राप्त मात्रा",
    "this is a long paragraph hgkjyhfkjglhdjfifg",
    {}
  );

  try {
    console.log('inside try block')
    TaskManager.defineTask(NOTIFICATION, async () => {
       console.log('inside manager')
      try {
        await notify(token);
        console.log('task manager')
        sendPushNotification(
          token,
          "inside task manager",
          "this is a long paragraph hgkjyhfkjglhdjfifg", {}
        );
        return token
          ? BackgroundFetch.Result.NewData
          : BackgroundFetch.Result.NoData;
      } catch (error) {
        return BackgroundFetch.Result.Failed;
      }
    });
    sendPushNotification(
      token,
      "outside task manager",
      "this is a long paragraph hgkjyhfkjglhdjfifg", {}
    );
    BackgroundFetch.registerTaskAsync(NOTIFICATION, {
      minimumInterval: 60,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  } catch (error) {
    console.log("error in background timer", error);
  }
};
export default timerStart;
