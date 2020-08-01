// import BackgroundTimer from "react-native-background-timer";
import * as BackgroundFetch from "expo-background-fetch";
import { AsyncStorage } from "react-native";
import { registerForPushNotificationsAsync, sendPushNotification } from ".";
import * as TaskManager from "expo-task-manager";
// var timerId;

var data = [];
var makeRemoteRequest = async (userId) => {
  let baseUrl = `https://knekisan.com/`
  const url = baseUrl + "api/v1/inquiry/user/" + userId;
  let newData;
  console.log("inside makeRemoteRequest", url);
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      newData=[...res.data];
    })
    .catch((error) => {console.log('error inside makeRemoteRequest ',error)});
    console.log('inside makeRemoteRequest new Data is ',newData);
  return newData;
};


export var notify = async () => {
  let oldData;
  console.log('data is ',data)
  try {
      if (data) {
        oldData = [...data];
      }
  } catch (error) {
    console.log('error in sperading',error);
  }
  let userId = await AsyncStorage.getItem("user");
  let token = await AsyncStorage.getItem("token");
  if(token){}
  else {
    token = await registerForPushNotificationsAsync();
    await AsyncStorage.setItem("token", token)
  }
  console.log('inside notify')
  console.log(token);
      sendPushNotification(
        token,
        "inside notify",
        "this is a long paragraph under notify", {}
      );
  let newData = await makeRemoteRequest(userId);
  console.log(newData)
  console.log("user id is ", userId);
  if(userId){}
  else{
    sendPushNotification(
      token,
      "error",
      "UserId not found", {}
    );
  }
  try{
    if (newData && oldData && (newData.length === oldData.length)) {
      data = [...newData];
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
    else{
      console.log('new Data is',newData);
      if(newData) console.log('new data length is ',newData.length);
      console.log('oldData is',oldData);
      if (oldData) console.log('Old data length is ',oldData.length);
      sendPushNotification(
        token,
        "error",
        "error fetching data", {}
      );
    }
  } catch(error){
    sendPushNotification(
      token,
      "error",
      "error inside if else", {}
    );
  }
};


var intervalId;





const timerStart = async () => {
  console.log("timer started");
  data = await makeRemoteRequest();
  console.log("data fetched",data);
  let token=await AsyncStorage.getItem("token");
  console.log(token)
  sendPushNotification(
    token,
    "Timer start called",
    "Timer start CAlled",
    {}
  );
  try {
    const NOTIFICATION = "NOTIFICATION";
    console.log('inside try block')
    let backgroundRegistationKey = await BackgroundFetch.registerTaskAsync(NOTIFICATION, {
      minimumInterval: 2,
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log('background fetch mounted status',backgroundRegistationKey);
    let registeredTasks = await TaskManager.getRegisteredTasksAsync();
    console.log('registred tasks are',registeredTasks);
  } catch (error) {
    console.log("error in background timer", error);
  }
};
export default timerStart;
