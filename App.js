import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert,Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
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
import timerStart,{notify} from "./notificationManager/timer";
import * as TaskManager from "expo-task-manager";
import { registerForPushNotificationsAsync } from "./notificationManager";
import * as BackgroundFetch from "expo-background-fetch";
import { CONSTANT } from "./shared/trans";
const NOTIFICATION = "NOTIFICATION";
const strings= CONSTANT.app;
TaskManager.defineTask(NOTIFICATION, async () => {
  console.log('inside manager')
  try {
    await notify();
    console.log("The task is running");
    return BackgroundFetch.Result.NewData;

  } catch (error) {
    console.log('error in running task');
    return BackgroundFetch.Result.Failed;
  }
});
const Stack = createStackNavigator();
class LoginCheck extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      token: null,
      lang:'en'
    };
  }
  componentDidMount() {
    (async () => {
      let value = await AsyncStorage.getItem('lang');
      value = value || 'en';
      this.setState({
        lang: value
      })
    })();
  }

  componentWillMount() {
    console.log("App mount");
    this._checkLocalStorage();
    this.initializeToken();
  }
  initializeToken=async ()=>{
    // let token = await AsyncStorage.getItem("token");
    console.log('Token initialization called');
    let token;
    try {
      token = await registerForPushNotificationsAsync();
      await AsyncStorage.setItem("token", token)
    } catch (error) {
      console.log("error while initializing token", error);
    }

    timerStart();
  }
  _checkLocalStorage = async () => {
    let username = await AsyncStorage.getItem("username");
    
    
    this.setState({ username });
  };

  render() {
    let lang= this.state.lang;
    this._checkLocalStorage();
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
          onPress={() => this.props.nav.navigate("LoginSignup")}
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
          <Text style={{ fontSize: 14, color: "#fff" }}>{strings.login[lang]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.nav.navigate("LoginSignup")}
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
          <Text style={{ fontSize: 14, color: "#fff" }}>{strings.signup[lang]}</Text>
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
                this._checkLocalStorage();
                Alert.alert(strings.logoutdone[lang]);
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
          <Text style={{ fontSize: 14, color: "#fff" }}>{strings.logout[lang]}</Text>
        </TouchableOpacity>
      </View>
    );
    if (this.state.username !== null) {
      return AfterLogin;
    } else {
      return BeforeLogin;
    }
  }
}

const HomeStack = () => {
    // useEffect
   const [lang, setlang] = useState('en');
   useEffect(() => {
     (async () => {
       let value = await AsyncStorage.getItem('lang');
       value = value || 'en';
       setlang(value);
     })();
   }, [])
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
          headerTitle: strings.myprofile[lang],
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
          headerTitle: strings.update_profile[lang],
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
     const [lang, setlang] = useState('en');
     useEffect(() => {
       (async () => {
         let value = await AsyncStorage.getItem('lang');
         value = value || 'en';
         setlang(value);
       })();
     }, [])
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
          headerTitle: strings.offer_detail[lang],
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
  const [lang, setlang] = useState('en');
  useEffect(() => {
    (async () => {
      let value = await AsyncStorage.getItem('lang');
      value = value || 'en';
      setlang(value);
    })();
  }, [])
  return (
    <Tab.Navigator tabBarOptions={tabBarStyle}>
      <Tab.Screen
        name={strings.home[lang]}
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
        name={strings.search[lang]}
        component={Search}
        options={{
          tabBarIcon: () => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name={strings.info[lang]}
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


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      lang:true
    }
  }
  toggleLang = async() => {
    console.log('toogleLang is called');
    const isEn= this.state.lang;
    await AsyncStorage.setItem('lang',isEn?'hi':'en');
    console.log(isEn);
    this.setState({
      lang:!isEn
    })
    console.log(this.state.lang);
  }
  CustomDrawer = (props) => {
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
      {
      /* <View style={{marginTop:5, paddingLeft:10, backgroundColor:'#fff', flexDirection:'row', height:60, alignItems:'center', justifyContent:'space-around'}}>
        <EvilIcons name="location" size={22} color="black" />
        <Text style={{fontSize:15}}>560004, Bangalore - 560004</Text>
        <Feather name="edit-2" size={20} color="#4CBB17" style={{marginLeft:15}} />
      </View>
      <View style={{marginTop:1, paddingHorizontal:20, paddingVertical:10, backgroundColor:'#fff'}}>
        <Text style={{fontSize:14}}>Your next available slot</Text>
        <View style={{flexDirection:'row', marginTop:15}}>
          <Image  style={{height:15,width:20}}
                  source={require('./assets/motorcycle.png')}
          />
          <Text style={{fontSize:13}}>   Tomorrow 6:30AM -8:30AM</Text>
        </View>
        <View style={{flexDirection:'row', marginTop:10}}>
          <Image  style={{height:15,width:20}}
                  source={require('./assets/truck.png')}
          />
          <Text style={{fontSize:13}}>   Tomorrow 6:30AM -8:30AM</Text>
        </View>
      </View> */
      }
      {/* <View style={{flexDirection:'row', height:60, backgroundColor:'#d0f0c0', justifyContent:'space-around', alignItems:'center'}}>
        <Text style={{fontSize:13, color:'green', width:200}}>Get Priority slots with bbstar memebership</Text>
        <AntDesign name="caretright" size={18} color="green" />
      </View> */}
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

        <View style={ { flexDirection:'row' }}>
          <Text style={{flex:1}}>Hindi/English</Text>
          <Switch
          style={{flex:1}}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange = {
          this.toggleLang
        }
        value={this.state.lang}
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

  render() {
    console.log("render called");
    return (
      <NavigationContainer >
        <Drawer.Navigator
          initialRouteName="Home"
          // lang={this.state.lang}
          // toggleLang= {this.toggleLang}
          drawerContent={(props) => this.CustomDrawer(props,)}
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
  }
}
