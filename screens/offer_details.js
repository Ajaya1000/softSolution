import React from 'react';
import { View,Text } from 'react-native-animatable';
import {StyleSheet} from 'react-native'
export default function OfferDetails(props) {
  console.log(props.route.params);
  return (
    <>
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.lable}>Status &nbsp; :</Text>
        <Text style={styles.value}>Pending</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.lable}>Status &nbsp; :</Text>
        <Text style={styles.value}>Pending</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.lable}>Status &nbsp; :</Text>
        <Text style={styles.value}>Pending</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.lable}>Status &nbsp; :</Text>
        <Text style={styles.value}>Pending</Text>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create(
  { 
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    row:{
      marginBottom:10,
      flexDirection:'row',
      width: '90%',
      justifyContent: 'center',
        alignItems: 'center',
    },
    lable:{
      fontSize: 20,
      paddingRight:10
    },
    value:{
      fontSize:17,
      paddingLeft:10
    }
  
  }
)