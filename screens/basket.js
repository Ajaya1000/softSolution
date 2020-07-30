import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View } from 'react-native';
import { Header4 } from "../components/Header_components"
const { width , height} = Dimensions.get('window')

export default class Basket extends React.Component {
  
  render(){
    return (
      <View style={{flex:1,backgroundColor:"#D3D3D3"}}>
        <Header4 navigation={this.props.navigation}/>
        <ScrollView>
          <View style={{height:height-70,justifyContent: "center", alignItems:"center"}}>
              <Text>
                  Add Basket
              </Text>
          </View> 
        </ScrollView>      
      </View>
  );
  }
}

const styles = StyleSheet.create({


})
