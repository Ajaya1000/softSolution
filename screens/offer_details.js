import React, { useEffect, useState } from 'react';
import { View,Text } from 'react-native-animatable';
import {StyleSheet, AsyncStorage} from 'react-native'
import { CONSTANT } from '../shared/trans';
const strings= CONSTANT.offer_detail;
export default function OfferDetails(props) {
  const item=props.route.params.item;
  
   const [lang, setlang] = useState('en');
   useEffect(() => {
     (async () => {
       let value = await AsyncStorage.getItem('lang');
       value = value || 'en';
       setlang(value);
     })();
   }, [])
  return (
    <>
    <View style={styles.container}>
      {(item)?(
        <>
        {
        (item.status) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.status[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.status}</Text>
        </View>)
        }
        {
        (item.product && item.product.name) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.product_name[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.product.name}</Text>
        </View>)
        }
        {
        (item.product && item.product.description) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.desc[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.product.description}</Text>
        </View>)
        }
        {
        (item.product && item.product.price) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.price[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.product.price}</Text>
        </View>)
        }
        {
        (item.quantityRecievedFlag) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.q_r_flag[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.quantityRecievedFlag?strings.yes[lang]:strings.no[lang]}</Text>
        </View>)
        }
        {
        (item.paymentRecievedFlag) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.p_r_flag[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.paymentRecievedFlag?strings.yes[lang]:strings.no[lang]}</Text>
        </View>)
        }

        {
        (item.bori) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.bori[lang]} &nbsp; :</Text>
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
          <Text style={styles.lable}>{strings.weight[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.weight}</Text>
        </View>)
        }
        {
        (item.vehicleNo) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.vehicle_num[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.vehicleNo}</Text>
        </View>)
        }
        {
        (item.driver) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.driver[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.driver}</Text>
        </View>)
        }
        {
        (item.paymentRecieved) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.p_r[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.paymentRecieved}</Text>
        </View>)
        }
        {
        (item.paymentDue) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.p_due[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.paymentDue}</Text>
        </View>)
        }
        
        {
        (item.quantityRecieved) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.q_r[lang]} &nbsp; :</Text>
          <Text style={styles.value}>{item.quantityRecieved}</Text>
        </View>)
        }
        {
        (item.rate) && (<View style={styles.row}>
          <Text style={styles.lable}>{strings.rate[lang]} &nbsp; :</Text>
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