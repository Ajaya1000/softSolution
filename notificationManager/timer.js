import BackgroundTimer from "react-native-background-timer";
import { AsyncStorage } from "react-native";
import { registerForPushNotificationsAsync, sendPushNotification } from ".";
// var timerId;
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
  console.log("user id is ",userId);
  data = newData;
  if (newData && newData.length == oldData.length) {
    for (let i = 0; i < oldData.length; i++) {
      if (newData[i] && oldData[i]) {
        if (
          newData[i].status &&
          oldData[i].status &&
          newData[i].status !== oldData[i].status
        ) {
          sendPushNotification(token, newData[i].status, newData[i].status, {});
        }
        if (
          newData[i].paymentRecievedFlag &&
          oldData[i].paymentRecievedFlag &&
          newData[i].paymentRecievedFlag !== oldData[i].paymentRecievedFlag
        ) {
          sendPushNotification(token, "भुगतान प्राप्त", "भुगतान प्राप्त", {});
        }
        if (
          newData[i].quantityRecievedFlag &&
          oldData[i].quantityRecievedFlag &&
          newData[i].quantityRecievedFlag !== oldData[i].quantityRecievedFlag
        ) {
          sendPushNotification(token, "प्राप्त मात्रा", "प्राप्त मात्रा", {});
        }
      }
    }
  }
};
var intervalId;
 const timerStart = async () => {
  console.log("timer started");
  data = await makeRemoteRequest();
  console.log('data fetched');
  let token = await registerForPushNotificationsAsync();
  console.log('token recieved',token);
  sendPushNotification(token, "प्राप्त मात्रा", "this is a long paragraph hgkjyhfkjglhdjfifg", {});
  try{
    console.log(BackgroundTimer);
    console.log(BackgroundTimer.setTimeout);
    // BackgroundTimer.start();
    console.log('background timer start called');
    intervalId=BackgroundTimer.setInterval(() => {
      notify(token);
      console.log('tick');
    }, 2000);
  } catch(error){
    console.log('error in background timer',error);
  }
};
export const onPause = () => {
  BackgroundTimer.clearInterval(intervalId);
}
export default timerStart;
