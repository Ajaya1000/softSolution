import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';


export default class Dropdown extends Component {
  state = {
      collapsed: true,
      heading: this.props.heading,
      contents: this.props.contents
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <View style={{height:60, padding:15, flexDirection:"row", marginBottom:1, backgroundColor:"#fff"}}>
              <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" />
              <Text style={{fontSize:18, paddingLeft:10,width:275}}>{this.state.heading}</Text>
              <TouchableOpacity onPress={this.toggleExpanded} style={{paddingLeft:5}} activeOpacity={1}>
                <AntDesign name={this.state.collapsed?"downcircleo":"upcircleo"} size={20} color="black" />
              </TouchableOpacity>
            </View>
            
            {this.state.contents.map(object => (
              <View key={object.title}>
                <Collapsible collapsed={this.state.collapsed} align="center" >
                  <TouchableOpacity activeOpacity={1} style={{height:55, padding:15, flexDirection:"row", backgroundColor:"#fff"}}>
                    <Text style={{fontSize:18, paddingLeft:10,width:275}}>
                      {object.title}
                    </Text>
                  </TouchableOpacity>
                <View style={{height:1, width:25, backgroundColor:"#fff"}}></View>
              </Collapsible>
              </View>
            ))}
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D3D3D3',
    marginBottom:1
  },
  
});