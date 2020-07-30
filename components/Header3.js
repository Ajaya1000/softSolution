import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import { SimpleLineIcons, Feather,EvilIcons,MaterialIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
const { width } = Dimensions.get('window')
const mycolor = "#212121" 

export const Header3 = () => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:45 + Constant.statusBarHeight,
            backgroundColor:"#4CBB17",   
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
                 <Text style={{color:"#fff", fontSize:20}}>पूछताछ</Text>
             </View>
             <View>
                 <EvilIcons name="search" size={32} color="#fff" style={{marginTop:5, marginLeft:-13}} />
             </View>
          </View>
        </View>
      );
}

export const Header4 = () => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:45 + Constant.statusBarHeight,
            backgroundColor:"#4CBB17",   
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
                 <Text style={{color:"#fff", fontSize:20}}>टोकरी की समीक्षा करें</Text>
             </View>
             {/* <View style={{ flexDirection:"row", justifyContent:"space-around"}}> */}
                <View style={{marginLeft:5}}>
                    <EvilIcons name="search" size={32} color="#fff" style={{marginTop:5, marginLeft:-13}} />
                </View>
                {/* <View>
                    <SimpleLineIcons name="options-vertical" size={22} color="white" style={{marginTop:6}} />
                </View> */}
             {/* </View> */}
          </View>
        </View>
      );
}

