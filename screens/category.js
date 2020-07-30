import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View } from 'react-native';
import { Header2 } from "../components/Header_components"
import Dropdown from "../components/Dropdown"
const { width } = Dimensions.get('window')

const CONTENT = [
  {title: 'First'},
  {title: 'Second'},
  {title: 'Third'},
  {title: 'Fourth'},
  {title: 'Fifth'},
];


export default class Category extends React.Component {
  
  render(){
    return (
      <View style={{flex:1,backgroundColor:"#D3D3D3"}}>
        <Header2 navigation={this.props.navigation}/>
        <ScrollView>
          <Dropdown heading={"Fruits"} contents={CONTENT}/>
          <Dropdown heading={"Vegetables"} contents={CONTENT}/>
          <Dropdown heading={"Juices"} contents={CONTENT}/>
          <Dropdown heading={"Cereals"} contents={CONTENT}/>
          <Dropdown heading={"Spices"} contents={CONTENT}/>
          <Dropdown heading={"Fruits"} contents={CONTENT}/>
          <Dropdown heading={"Vegetables"} contents={CONTENT}/>
          <Dropdown heading={"Juices"} contents={CONTENT}/>
          <Dropdown heading={"Cereals"} contents={CONTENT}/>
          <Dropdown heading={"Spices"} contents={CONTENT}/>
          <Dropdown heading={"Fruits"} contents={CONTENT}/>
          <Dropdown heading={"Vegetables"} contents={CONTENT}/>
          <Dropdown heading={"Juices"} contents={CONTENT}/>
          <Dropdown heading={"Cereals"} contents={CONTENT}/>
          <Dropdown heading={"Spices"} contents={CONTENT}/>  
        </ScrollView>      
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
//   image: {
//     flex: 1,
//     height: null, 
//     width: null, 
//     resizeMode: 'contain', 
//     borderWidth: 1, 
//     borderColor: '#dddddd'
// }
});
