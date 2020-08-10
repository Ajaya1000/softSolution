import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import useAsyncStorage from "@rnhooks/async-storage";
import { Restart } from "fiction-expo-restart";
import {
  EvilIcons,
  Entypo,
  Foundation,
  FontAwesome,
  Feather,
  Fontisto,
  AntDesign,
} from "@expo/vector-icons";
import Home from "./screens/home";
import Category from "./screens/category";
import Search from "./screens/search";
import Offers from "./screens/offers";
import Basket from "./screens/basket";
import Profile from "./screens/Profile";
import UpdateProfile from "./screens/UpdateProfile";
import LoginSignup from "./screens/login_signup";
import Product_Description from "./screens/product_description";
import Product_Description_new from "./screens/product_description_new";
import Constant from "expo-constants";
import { AsyncStorage } from "react-native";
import OfferDetails from "./screens/offer_details";
import timerStart, { notify } from "./notificationManager/timer";
import * as TaskManager from "expo-task-manager";
import { registerForPushNotificationsAsync } from "./notificationManager";
import * as BackgroundFetch from "expo-background-fetch";
import { CONSTANT } from "./shared/trans";
const NOTIFICATION = "NOTIFICATION";
const strings = CONSTANT.app;
TaskManager.defineTask(NOTIFICATION, async () => {
  console.log("inside manager");
  try {
    await notify();
    console.log("The task is running");
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.log("error in running task");
    return BackgroundFetch.Result.Failed;
  }
});
const Stack = createStackNavigator();
function LoginCheck(props) {
  const [lang, setLang, clearLang] = useAsyncStorage("lang");
  const [username, setusername] = useState("");
  const [token, settoken] = useState("");
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     username: null,
  //     token: null,
  //     lang: "en",
  //   };
  // }
  // componentDidMount() {
  //   (async () => {
  //     let value = await AsyncStorage.getItem("lang");
  //     value = value || "en";
  //     this.setState({
  //       lang: value,
  //     });
  //   })();
  // }

  useEffect(() => {
    console.log("App mount");
    _checkLocalStorage();
    initializeToken();
  }, []);
  const initializeToken = async () => {
    // let token = await AsyncStorage.getItem("token");
    console.log("Token initialization called");
    let token;
    try {
      token = await registerForPushNotificationsAsync();
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log("error while initializing token", error);
    }

    timerStart();
  };
  const _checkLocalStorage = async () => {
    let username = await AsyncStorage.getItem("username");

    setusername(username);
  };

  const render = () => {
    // let lang = this.state.lang;
    _checkLocalStorage();
    let BeforeLogin = (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          height: 18 + Constant.statusBarHeight,
          backgroundColor: "#010101",
        }}
      >
        <TouchableOpacity
          onPress={() => props.nav.navigate("LoginSignup")}
          activeOpacity={0.8}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 100,
            borderWidth: 1,
            borderColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 14, color: "#fff" }}>
            {strings.login[lang || "en"]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.nav.navigate("LoginSignup")}
          activeOpacity={0.8}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 100,
            borderWidth: 1,
            borderColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 14, color: "#fff" }}>
            {strings.signup[lang || "en"]}
          </Text>
        </TouchableOpacity>
      </View>
    );
    let AfterLogin = (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          height: 18 + Constant.statusBarHeight,
          backgroundColor: "#010101",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("username")
              .then(() => {
                _checkLocalStorage();
                Alert.alert(strings.logoutdone[lang || "en"]);
              })
              .catch((e) => console.log("logout error : " + e));
          }}
          activeOpacity={0.8}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            width: 100,
            borderWidth: 1,
            borderColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 14, color: "#fff" }}>
            {strings.logout[lang || "en"]}
          </Text>
        </TouchableOpacity>
      </View>
    );
    if (username !== null) {
      return AfterLogin;
    } else {
      return BeforeLogin;
    }
  };
  return render();
}

const HomeStack = () => {
  // useEffect
  const [lang, setLang, clearLang] = useAsyncStorage("lang");
  // useEffect(() => {
  //   (async () => {
  //     let value = await AsyncStorage.getItem("lang");
  //     value = value || "en";
  //     setlang(value);
  //   })();
  // }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDescription"
        component={Product_Description}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDescription_new"
        component={Product_Description_new}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginSignup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Inquiry"
        component={Offers}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Basket" component={Basket} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: strings.myprofile[lang || "en"],
          headerStyle: {
            backgroundColor: "#76BA1B",
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          headerTitle: strings.update_profile[lang || "en"],
          headerStyle: {
            backgroundColor: "#76BA1B",
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
        }}
      />
      {/* <Stack.Screen name="OfferDetails" component={OfferDetails} options={{ 
        headerTitle: "पूछताछ विवरण",
        headerStyle:{
          backgroundColor:"#76BA1B",
        },
        headerTitleAlign:"center",
        headerTintColor:"#fff"
       }} /> */}
    </Stack.Navigator>
  );
};
const OfferStack = () => {
  const [lang, setLang, clearLang] = useAsyncStorage("lang");
  // useEffect(() => {
  //   (async () => {
  //     let value = await AsyncStorage.getItem("lang");
  //     value = value || "en";
  //     setlang(value);
  //   })();
  // }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Offers"
        component={Offers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OfferDetails"
        component={OfferDetails}
        options={{
          headerTitle: strings.offer_detail[lang || "en"],
          headerStyle: {
            backgroundColor: "#76BA1B",
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};
const Tab = createBottomTabNavigator();

const tabBarStyle = {
  activeTintColor: "green",
};

const HomeTab = () => {
  console.log("Hometab called");
  const [lang, setLang, clearLang] = useAsyncStorage("lang");
  // useEffect(() => {
  //   (async () => {
  //     let value = await AsyncStorage.getItem("lang");
  //     value = value || "en";
  //     setlang(value);
  //   })();
  // }, []);
  return (
    <Tab.Navigator tabBarOptions={tabBarStyle}>
      <Tab.Screen
        name={strings.home[lang || "en"]}
        component={HomeStack}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      {/* <Tab.Screen name="Categories" component={Category} 
                    options={{
                      tabBarIcon: () => (
                        <FontAwesome name="th" size={24} color="black" />
                      ),
                    }}
          /> */}
      <Tab.Screen
        name={strings.search[lang || "en"]}
        component={Search}
        options={{
          tabBarIcon: () => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name={strings.info[lang || "en"]}
        component={OfferStack}
        options={{
          tabBarIcon: () => <Foundation name="info" size={28} color="black" />,
        }}
      />
      {/* <Tab.Screen name="Basket" component={Basket} 
                    options={{
                      tabBarIcon: () => (
                        <Fontisto name="shopping-basket" size={24} color="black" />
                      ),
                    }}
          /> */}
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  const [lang, setLang, clearLang] = useAsyncStorage("lang");
  const [checked, setChecked] = useState(true);
  useEffect(async () => {
    console.log("useEffect called");
    console.log("language is", lang);
    if (!lang) {
      let v = AsyncStorage.getItem("lang");
    }
    if (lang === "hi") {
      setChecked(false);
    } else setChecked(true);
  }, []);
  toggleLang = async () => {
    console.log("toogleLang is called");
    const b = checked;
    // console.log(b);

    // console.log(b);
    await setLang(b ? "hi" : "en");
    console.log("language updated");
    setChecked(!b);
    Restart();
    // console.log(isEn;
    // this.setState({
    //   lang:!isEn
    // })
    // console.log(this.state.lang);
    console.log("language is", lang);
  };
  const CustomDrawer = (props) => {
    return (
      <View style={{ flex: 1, backgroundColor: "#D3D3D3" }}>
        <View
          style={{
            top: 0,
            left: 0,
            right: 0,
            height: Constant.statusBarHeight,
            backgroundColor: "#4CBB17",
          }}
        ></View>
        <LoginCheck nav={props.navigation} />
        <ScrollView
          style={{
            marginTop: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>घर</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>Hindi/English</Text>
            <Switch
              style={{ flex: 1 }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleLang()}
              value={checked}
            />
          </View>
          {/* <TouchableOpacity onPress={() => props.navigation.navigate('Offers')}>
          <Text style={{fontSize:18, marginBottom:20}}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Category')}>
          <Text style={{fontSize:18, marginBottom:20}}>Categories</Text>
        </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={() => props.navigation.navigate('Basket')}>
          <Text style={{fontSize:18, marginBottom:20}}>Shop By Basket</Text>
        </TouchableOpacity> */}
        </ScrollView>
      </View>
    );
  };
  const render = () => {
    console.log("render called");
    console.log("from render", lang);
    // console.log(useAsyncStorage);
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          // lang={this.state.lang}
          // toggleLang= {this.toggleLang}
          drawerContent={(props) => CustomDrawer(props)}
        >
          <Drawer.Screen name="Home" component={HomeTab} />
          <Drawer.Screen name="LoginSignup" component={LoginSignup} />
          <Drawer.Screen name="Category" component={Category} />
          <Drawer.Screen name="Offers" component={Offers} />
          {/* <Drawer.Screen name="OfferDetails" component={OfferDetails} /> */}
          {/* <Drawer.Screen name="Basket" component={Basket} /> */}
        </Drawer.Navigator>
      </NavigationContainer>

      // <View style={{flex:1}}>
      //   {/* <Home/> */}
      //   {/* <Category/> */}
      //   <Offers/>
      // </View>
    );
  };
  return render();
}
