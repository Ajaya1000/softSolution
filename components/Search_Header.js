import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import {Ionicons, Feather,EvilIcons,MaterialCommunityIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
import axios from "axios";
import { AsyncStorage } from 'react-native';
import { CONSTANT } from '../shared/trans';
import useAsyncStorage from "@rnhooks/async-storage";
const { width } = Dimensions.get('window')
const mycolor = "#212121" 
let baseUrl = `https://knekisan.com/`;
const strings= CONSTANT.sh;
export default function Search_Header (props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         searchtext:"",
    //         products:[],
    //         lang:'en'

    //     }
    //     this.navigation = props.navigation
    //   }
    const [searchtext,setsearctext]= useState("");
    const [product,setproduct] = useState([]);
    const [lang,setlang,clearlang] = useAsyncStorage("lang");
      // componentWillMount(){
      //   this.getProducts();
      // }
      useEffect(() =>{ getProducts()},[]);
      // componentDidMount() {
      //   (async () => {
      //     let value = await AsyncStorage.getItem('lang');
      //     value = value || 'en';
      //     this.setState({
      //       lang: value
      //     })
      //   })();
      // }
       const getProducts = () =>{
          axios.get(`${baseUrl}api/v1/product/getall`).
          then((res)=>{
             var products = res.data.data;
              // 
              setproduct(products);
              // var check = products[0].images[0]
              // console.log(":1:\n\n :2: \n\n"+ JSON.stringify(check).substring(7).slice(0, -1) );
            }).
            catch(e=>{
                Alert.alert('Error : '+ e);
                
            })
          }

 const render=()=>{
    // lang= this.state.lang;
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:95 + Constant.statusBarHeight,
            backgroundColor:"#4CBB17",
            
        }}>
          <View style={{
              flexDirection:"row",
              marginVertical:5,
              marginHorizontal:20,
              width:width-40,
              justifyContent:"space-between",
          }}>
            <TouchableOpacity style={{backgroundColor:'red', height:30, width:30}} onPress={() => props.navigation.goBack()} >
                <Ionicons name="ios-arrow-back" size={30} color="white" />
            </TouchableOpacity>
             <View>
                 <Text style={{color:"#fff", fontSize:18}}>{strings.product_search[lang || 'en']}</Text>
             </View>
             <View >
                 <MaterialCommunityIcons name="barcode-scan" size={24} color="#fff" />
             </View>
          </View>
          <View style={{flexDirection:"row" ,height: 35, width:width-30, backgroundColor: "#fff", borderRadius:5, marginHorizontal:15}}>
                <TextInput
                    style={{
                        height: 35,
                        width:width-50,
                        fontSize: 17,
                        color: "#010101",
                        backgroundColor: "#fff",
                        borderRadius:5,
                        paddingHorizontal:15}}
                        autoCapitalize="none"
                        placeholder={strings.search[lang || 'en']}
                        onChangeText={searchtext => setsearctext( searchtext )}
                        value={searchtext}
                    autoFocus={true}
                ></TextInput>
                <EvilIcons name="search" size={28} color="#A9A9A9" style={{marginTop:5, marginLeft:-13}} />
             </View>
        </View>
      );
  }
  return render();
}