import React from 'react';
import { View,Text } from 'react-native-animatable';
import {StyleSheet} from 'react-native'
export default function OfferDetails(props) {
  const item=props.route.params.item;
  return (
    <>
    <View style={styles.container}>
      {(item)?(
        <>
        {
        (item.status) && (<View style={styles.row}>
          <Text style={styles.lable}>जांच की स्थिति &nbsp; :</Text>
          <Text style={styles.value}>{item.status}</Text>
        </View>)
        }
        {
        (item.product && item.product.name) && (<View style={styles.row}>
          <Text style={styles.lable}>उत्पाद का नाम &nbsp; :</Text>
          <Text style={styles.value}>{item.product.name}</Text>
        </View>)
        }
        {
        (item.product && item.product.description) && (<View style={styles.row}>
          <Text style={styles.lable}>उत्पाद वर्णन &nbsp; :</Text>
          <Text style={styles.value}>{item.product.description}</Text>
        </View>)
        }
        {
        (item.product && item.product.price) && (<View style={styles.row}>
          <Text style={styles.lable}>उत्पाद की कीमत &nbsp; :</Text>
          <Text style={styles.value}>{item.product.price}</Text>
        </View>)
        }
        {
        (item.quantityRecievedFlag) && (<View style={styles.row}>
          <Text style={styles.lable}>प्राप्त मात्रा की स्थिति &nbsp; :</Text>
          <Text style={styles.value}>{item.quantityRecievedFlag?'प्राप्त':'नही मिला'}</Text>
        </View>)
        }
        {
        (item.paymentRecievedFlag) && (<View style={styles.row}>
          <Text style={styles.lable}>भुगतान प्राप्त की स्थिति &nbsp; :</Text>
          <Text style={styles.value}>{item.paymentRecievedFlag?'प्राप्त':'नही मिला'}</Text>
        </View>)
        }

        {
        (item.bori) && (<View style={styles.row}>
          <Text style={styles.lable}>बोरी &nbsp; :</Text>
          <Text style={styles.value}>{item.bori}</Text>
        </View>)
        }
        {/* {
        (item.quality) && (<View style={styles.row}>
          <Text style={styles.lable}>गुणवत्ता &nbsp; :</Text>
          <Text style={styles.value}>{item.quality}</Text>
        </View>)
        } */}
        {
        (item.weight) && (<View style={styles.row}>
          <Text style={styles.lable}>वजन &nbsp; :</Text>
          <Text style={styles.value}>{item.weight}</Text>
        </View>)
        }
        {
        (item.vehicleNo) && (<View style={styles.row}>
          <Text style={styles.lable}>गाडी नंबर &nbsp; :</Text>
          <Text style={styles.value}>{item.vehicleNo}</Text>
        </View>)
        }
        {
        (item.driver) && (<View style={styles.row}>
          <Text style={styles.lable}>चालक &nbsp; :</Text>
          <Text style={styles.value}>{item.driver}</Text>
        </View>)
        }
        {
        (item.paymentRecieved) && (<View style={styles.row}>
          <Text style={styles.lable}>भुगतान प्राप्त &nbsp; :</Text>
          <Text style={styles.value}>{item.paymentRecieved}</Text>
        </View>)
        }
        {
        (item.paymentDue) && (<View style={styles.row}>
          <Text style={styles.lable}>भुगतान राशि &nbsp; :</Text>
          <Text style={styles.value}>{item.paymentDue}</Text>
        </View>)
        }
        
        {
        (item.quantityRecieved) && (<View style={styles.row}>
          <Text style={styles.lable}>प्राप्त मात्रा &nbsp; :</Text>
          <Text style={styles.value}>{item.quantityRecieved}</Text>
        </View>)
        }
        {
        (item.rate) && (<View style={styles.row}>
          <Text style={styles.lable}>दर &nbsp; :</Text>
          <Text style={styles.value}>{item.rate}</Text>
        </View>)
        }
        
      </>
      ):(<Text style={styles.error}>Something Went Wrong</Text>)
    }
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
    error: {
      fontSize:30,
      color: 'red',
    },
    row:{
      marginBottom:10,
      flexDirection:'row',
      width: '90%',
      justifyContent: 'center',
        alignItems: 'center',
        fontSize:20
    },
    lable:{
      fontSize: 25,
      paddingRight:10,
      fontWeight:"700",
      color:"rgba(0,0,0,0.6)"
    },
    value:{
      fontSize:17,
      paddingLeft:10,
      fontWeight:"600",
      color:'rgba(0,0,0,0.9)'
    }
  
  }
)