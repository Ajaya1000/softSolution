import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import {FontAwesome5, Feather,EvilIcons,MaterialIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
import { Searchbar } from 'react-native-paper';
const { width } = Dimensions.get('window')
const mycolor = "#212121" 

export default class Header extends React.Component {
    state={
        searchtext:""
    }
  render(){
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
                 <Text style={{color:"#fff"}}>आपकी स्थिति</Text>
                 <Text style={{color:"#fff"}}>5600004, बैंगलोर</Text>
             </View>
             <FontAwesome5 name="user-circle" size={30} color="white" />
          </View>
          <View style={{flexDirection:"row" ,height: 35, width:width-30, backgroundColor: "#fff",marginHorizontal:15}}>
                <TextInput
                    style={{
                        height: 35,
                        width:width-50,
                        fontSize: 17,
                        color: "#010101",
                        backgroundColor: "#fff",
                        paddingHorizontal:15}}
                        autoCapitalize="none"
                        placeholder="खोज"
                        onChangeText={searchtext => this.setState({ searchtext })}
                        value={this.state.searchtext}
                ></TextInput>
                <EvilIcons name="search" size={28} color="#A9A9A9" style={{marginTop:5, marginLeft:-13}} />
             </View>
        </View>
      );
  }
}
