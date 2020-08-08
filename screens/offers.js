import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View, Button, AsyncStorage } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { Swiper1, Swiper2, Swiper3 } from "../components/Swiper";
import { Card1, Card2, Card3, Card4, Card5, LabelCard, OffersLargeCards, ScrollHorizontalCardView } from "../components/Card"
import { Header3 } from "../components/Header_components"
const { width, height } = Dimensions.get('window')
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  Icon,
  Picker,
  Form
} from "native-base";
let baseUrl = `https://knekisan.com/`

// const items=[
//     {id:"3", component:<Swiper3/>},
//     {id:"7", component:<View style={{flexDirection:"row", marginHorizontal:9, marginTop:3}}>
//                         <View>
//                           <OffersLargeCards/><OffersLargeCards/>
//                         </View>
//                         <View>
//                           <OffersLargeCards/><OffersLargeCards/>
//                         </View>
//                       </View>},
//     {id:"8", component:<View style={{flexDirection:"row", marginHorizontal:9, marginTop:3}}>
//                             <View>
//                             <OffersLargeCards/><OffersLargeCards/>
//                             </View>
//                             <View>
//                             <OffersLargeCards/><OffersLargeCards/>
//                             </View>
//                         </View>},
//     {id:"9", component:<View style={{flexDirection:"row", marginHorizontal:9, marginTop:3}}>
//                         <View>
//                           <OffersLargeCards/><OffersLargeCards/>
//                         </View>
//                         <View>
//                           <OffersLargeCards/><OffersLargeCards/>
//                         </View>
//                         <View>
//                           <OffersLargeCards/><OffersLargeCards/>
//                         </View>
//                       </View>},
//     {id:"10", component:<Swiper1/>},
//     {id:"11", component:<Card3/>},
// ]

const items = [
  {
    bori: '4',
    vehicleNo: 'MH42S8956',
    driver: 'Suresh',
    Status: 'Approved',
    weight: '45'
  },
  {
    bori: '4',
    vehicleNo: 'MH42S8956',
    driver: 'Sunil',
    Status: 'Declined',
    weight: '45'
  }, {
    bori: '4',
    vehicleNo: 'MH42S8956',
    driver: 'Ramesh',
    Status: 'Pending',
    weight: '45'
  }, {
    bori: '4',
    vehicleNo: 'MH42S8956',
    driver: 'Rakesh',
    Status: 'Approved',
    weight: '45'
  }, {
    bori: '4',
    vehicleNo: 'MH42S8956',
    driver: 'Akhin',
    Status: 'Pending',
    weight: '45'
  }, {
    bori: '4',
    vehicleNo: 'MH42S8956',
    driver: 'Pritam',
    Status: 'Declined',
    weight: '45'
  },
]

// let approved = items.filter(e => e.Status === "Approved");
// let pending = items.filter(e => e.Status === "Pending");
// let declined = items.filter(e => e.Status === "Declined");

export default class Offers extends React.Component {
  state = {
    loading: true,
    refreshing: false,
    data: [],
    status: '',
    filtered_data: [],
    button_clicked:'All',
    ripple:false,
  }
  componentDidMount() {
    console.log('offer props are');
    console.log(this.props);
    this.init();
  }
  async init() {
    let userId = await AsyncStorage.getItem('user')
    console.log(userId);
    await this.makeRemoteRequest(userId);
    console.log(this.state.data);
  }

  makeRemoteRequest = async (userId) => {
    const url = baseUrl + 'api/v1/inquiry/user/' + userId;
    console.log('\n\n', url)

    setTimeout(async () => {
      await fetch(url)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: [...res.data],
            refreshing: false
          })
          // console.log(this.state.data);
        })
        .catch(error => {
          this.setState({
            refreshing: false,
          })
        }, 1500);
    })
  }
  // handleRefresh = () => {
  //       this.setState({
  //         refreshing: true
  //       })
  //     }

  // handleLoadMore = () => {

  //     }

  // renderFooter = () => {
  //   if (!this.state.loading) return null

  //   return(
  //     <View style={{
  //       paddingVertical:20,
  //       borderTopWidth:1,
  //       borderTopColor:"#CED0CE"
  //     }}>
  //       <ActivityIndicator animating size="large"/>
  //     </View>
  //   )
  // }




  renderStatus = (status) => {
    if (status == 'Pending') {
      return <Text style={{ color: 'gold' }}>विचाराधीन</Text>
      // return <FontAwesome5 name="stopwatch" size={24} color="gold" />
    } else if (status == 'Approved') {
      return <Text style={{ color: 'green' }}>मंजूर की</Text>
      // return <FontAwesome5 name="check" size={24} color="green" />
    } else if (status == 'Declined') {
      return <Text style={{ color: 'red' }}>इंकार कर दिया</Text>
      // return <Entypo name="circle-with-cross" size={24} color="red" />
    } 

  }

  showApproved = async () => {
    await this.init();
    let approved = this.state.data.filter(e => e.status === "Approved");
    // console.log('Approved')
    // console.log(approved)
    this.setState({ 
      filtered_data: approved ,
      button_clicked:"Approved"
    })
    // console.log(this.state.button_clicked)
  }

  showPending = async () => {
    await this.init();
    let pending = this.state.data.filter(e => e.status === "Pending");
    // console.log("Pending")
    // console.log(pending)
    this.setState({ 
      filtered_data: pending ,
      button_clicked:"Pending"
    })
    // console.log(this.state.button_clicked)
  }

  showDeclined = async() => {
    await this.init();
    let declined = this.state.data.filter(e => e.status === "Declined");
    // console.log("Declined")
    // console.log(declined)
    this.setState({ 
      filtered_data: declined ,
      button_clicked:"Declined"
    })
    // console.log(this.state.button_clicked)
    /*
    paymentDue: '111', │quantityRecieved: '111', │rate: '111', └paymentRecieved: '1234'
    */
  }
  giveColor=(status,paymentRecievedFlag,quantityRecievedFlag)=>{
      if (paymentRecievedFlag && quantityRecievedFlag)
        return '#3DDC9711'
      if (paymentRecievedFlag)
        return '#800080'
      if (quantityRecievedFlag)
        return '#256EFF11'
      if (status === 'Pending')
        return '#fff'
      if (status === 'Declined')
        return '#FF495C11'
      return '#7FFF0011'
  }
  render() {
    const {button_clicked,data}=this.state;
    let show_detail;
    let filtered_data;
    if(button_clicked==='All')
      filtered_data = data
    else if (button_clicked === 'PaymentRecieved'){
      filtered_data = data.filter(e => e.paymentRecievedFlag)
    }
    else if (button_clicked === 'QauntityRecieved') {
      filtered_data = data.filter(e => e.quantityRecievedFlag)
    }
    else filtered_data= data.filter(e=>e.status===button_clicked);

    if(filtered_data.length > 0){
      show_detail = (
        <FlatList
            keyExtractor={item => item._id}
            // data={this.state.data && this.state.filtered}
            data={filtered_data}
            renderItem={({ item }) =>
            // <View style={styles.cardHolder} >
            < TouchableNativeFeedback 
            onPress={()=>{
                this.setState({ripple:true}) ;
                this.props.navigation.navigate('OfferDetails', {
                  item: item
                })
              //   setTimeout(() => {
              //   this.props.navigation.navigate('OfferDetails',{item:item})
              // }, 50);
            }
            }
             background = {
               TouchableNativeFeedback.Ripple('#32CD3255', this.state.ripple)
             }
             
             >
              <View style={styles.card}>
                < View style = {
                  {
                    backgroundColor: this.giveColor(item.status, item.paymentRecievedFlag, this.quantityRecievedFlag),
                    borderRadius: 10,
                    padding:10
                  }
                } >
                  { (item.product && item.product.name) && (<Text style={styles.subtitle}>उत्पाद: {item.product.name}</Text>)}
                <Text style={styles.subtitle}>बोरी : {item.bori}</Text>
                <Text style={styles.subtitle}>चालक : {item.driver}</Text>
                <Text style={styles.subtitle}>गाडी नंबर : {item.vehicleNo}</Text>
                <Text style={styles.subtitle}>वजन :  {item.weight}</Text>

                {/* {(item.paymentDue)&&(<Text style={styles.subtitle}> भुगतान राशि :  {item.paymentDue}</Text>)}
                {
                  (item.quantityRecieved ) && (<Text style={styles.subtitle}>प्राप्त मात्रा :  {item.quantityRecieved}</Text>)
                }
                {
                  (item.rate)&& (<Text style={styles.subtitle}> दर :  {item.rate}</Text>)
                }
                {
                  (item.paymentRecieved)&& (<Text style={styles.subtitle}> भुगतान प्राप्त :  {item.paymentRecieved}</Text>)
                } */}
                <Text style={[styles.subtitle, { position: 'absolute', right: 20, bottom: 20, fontSize: height / 40 }]}>
                  {
                    this.renderStatus(item.status)
                  }
                </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
            // </View>
            }
            //refreshing={this.state.refreshing}
            ListFooterComponent={this.renderFooter}
            // onRefresh={this.handleRefresh}
            // onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
          />
      )
    }
    else if(this.state.filtered_data.length == 0 
            && this.state.button_clicked !==''
            && this.state.button_clicked=="Approved"){
      show_detail = (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18}}>आपके पास कोई अनुमोदित जांच नहीं है</Text>
        </View>
      )
    }
    else if(this.state.filtered_data.length == 0 
            && this.state.button_clicked !==''
            && this.state.button_clicked=="Pending"){
      show_detail = (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18}}>आपके पास कोई जांच लंबित नहीं है</Text>
        </View>
      )
    }
    else if(this.state.filtered_data.length == 0 
            && this.state.button_clicked !==''
            && this.state.button_clicked=="Declined"){
      show_detail = (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize:18}}>आपके पास कोई अस्वीकृत जांच नहीं है</Text>
      </View>
      )
      }
    else{
      show_detail = (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:18}}>उपरोक्त पूछताछ की जाँच करें</Text>
        </View>
      )
    }
    
    return (
      <>
      < View style = {
        {
          backgroundColor: "#fff",
          flex:1
        }
      } >
        <Header3 navigation={this.props.navigation} />
        <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder = "फ़िल्टर का चयन करें"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              
              selectedValue = {
                this.state.button_clicked
              }
              onValueChange = {
                (value) =>{ this.setState({
                  button_clicked:value
                })
               this.init();
               }
              }
            >
              <Picker.Item label="सब" value="All" />
              <Picker.Item label="अनुमोदित" value="Approved" />
              <Picker.Item label="विचाराधीन" value="Pending" />
              < Picker.Item label = "अस्वीकृत" value = "Declined" / >
              <Picker.Item label="भुगतान प्राप्त" value="PaymentRecieved" />
              <Picker.Item label="प्राप्त मात्रा" value="QauntityRecieved" />
            </Picker>
          </Form>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button title="मंजूर की" color='green' onPress={this.showApproved} />
          <Button title='विचाराधीन' color='gold' onPress={this.showPending} />
          <Button title='इंकार कर दिया' color='red' onPress={this.showDeclined} />
          <Button title='तिथि के अनुसार' color='green' onPress={this.showApproved} />
        </View> */}

      {/* <Button title='offer_details page' color='black' onPress={()=>this.props.navigation.navigate('OfferDetails',{name:"ajay"})} /> */}
      <ScrollView style={{marginTop:20,paddingTop:10,paddingBottom:30,backgroundColor:'fff'}}>
        {show_detail}
      </ScrollView>
      </View >
      
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardHolder:{
    // // width: '91%',
    // //  height: height / 5,
    // paddingBottom:1,
    // paddingTop:1,
    // paddingRight: 1,
    // paddingLeft:1,
      // paddingBottom
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
  },
  card: {
    // height: height / 5,
    // width: width / 1.1,
    width:'90%',
    marginTop:20,
    marginBottom:20,
    alignSelf: 'center',
    marginTop: 10,
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    // elevation: 6,
        shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,

  },
  subtitle: {
    color: '#81C784',
    fontSize: height / 35,
    marginTop:2
  }

})

