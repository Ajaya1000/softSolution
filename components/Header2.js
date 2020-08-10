import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import {FontAwesome5, Feather,EvilIcons,MaterialIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
import { CONSTANT } from '../shared/trans';
import { AsyncStorage } from 'react-native';
import useAsyncStorage from "@rnhooks/async-storage";
const { width } = Dimensions.get('window')
const mycolor = "#212121" 
const strings = CONSTANT.h2;
export default function Header2 () {
    const [searchtext, setsearchtext] = useState("");
    const [lang,setlang,clearlang] = useAsyncStorage("lang");
    // state={
    //     searchtext:"",
    //     lang:'en'
    // }
    // componentDidMount() {
    //     (async () => {
    //         let value = await AsyncStorage.getItem('lang');
    //         value = value || 'en';
    //         this.setState({
    //             lang: value
    //         })
    //     })();
    // }
//   render(){
//       lang=this.state.lang;
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:95 + Constant.statusBarHeight,
            backgroundColor:"#4CBB17",
            //flexDirection:"row",
            // justifyContent:"space-between",
            // elevation:4,
            
        }}>
          <View style={{
              flexDirection:"row",
              marginVertical:5,
              marginHorizontal:10,
              width:width-20,
              justifyContent:"space-between",
          }}>
             <Feather name="menu" size={30} color="white" />
             <View>
        <Text style={{color:"#fff", fontSize:20}}>{strings.class[lang || 'en']}</Text>
             </View>
             <View></View>
          </View>
          <View style={{flexDirection:"row" ,height: 35, width:width-30, backgroundColor: "#fff",marginHorizontal:15}}>
                <TextInput
                    style={{
                        height: 35,
                        width:width-50,
                        fontSize: 17,
                        color: "#010101",
                        backgroundColor: "#fff",
                        paddingHorizontal:15
                    }}
                    autoCapitalize="none"
                    placeholder={strings.search[lang || 'en']}
                    onChangeText={searchtext =>setsearchtext( searchtext)}
                    value={searchtext}
                ></TextInput>
                <EvilIcons name="search" size={28} color="#A9A9A9" style={{marginTop:5, marginLeft:-13}} />
             </View>
        </View>
      );
//   }
}
