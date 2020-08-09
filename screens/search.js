import React from 'react';
import { StyleSheet, Text, TextInput, ScrollView, Dimensions, Image, View,TouchableOpacity, AsyncStorage } from 'react-native';
// import Search_Header from "../components/Search_Header";
import {Ionicons, Feather, EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';

import { Card,Button,Item,Label,Input } from "native-base";
import axios from "axios";
import { CONSTANT } from '../shared/trans';
const { width , height} = Dimensions.get('window')
let baseUrl =`https://knekisan.com/`
const strings= CONSTANT.search;
export default class Basket extends React.Component {
  constructor(props) {
  super(props);
   
  this.state = {
    products:[],
    searchtext:"",
    search_product:[],
    lang:"en"
  };
   }
  componentWillMount(){
    this.getProducts();
  }
  componentDidMount() {
    (async () => {
      let value = await AsyncStorage.getItem('lang');
      value = value || 'en';
      this.setState({
        lang: value
      })
    })();
  }
  setResult = data => {
    console.log(data)
    this.setState({
        products: [...this.state.products, ...data] ,
        search_product: [...this.state.search_product, ...data]
    })
}

updateSearch = searchtext => {
    this.setState({searchtext}, () => {
        if('' == searchtext){
            this.setState({
                products: [...this.state.search_product] ,
            });
            return;
        }
        this.state.products = this.state.search_product
                                .filter(function(item) {
                                    return item.name.toUpperCase().includes(searchtext.toUpperCase());
                                })
                                .map(function({_id,name,price,images,status}) {
                                    return {_id,name,price,images,status} ;
                                })
    })
}


  getProducts = () =>{
    axios.get(`${baseUrl}api/v1/product/getall`).
    then((res)=>{
       var products = res.data.data;
         //    var _id = res.data.data.data;
        this.setResult(products)
        // var check = products[0].images[0]
        // console.log(":1:\n\n :2: \n\n"+ JSON.stringify(check).substring(7).slice(0, -1) );
      }).
      catch(e=>{
          Alert.alert('Error : '+ e);
          
      })
    }
    callBackFromChild=(_productList)=>{
        
    }   
  render(){
    let lang = this.state.lang;
    let _productList = this.state.products.filter((status)=> status.status === 'Active').map(obj=>
      <TouchableOpacity
      onPress={()=>{
        this.props.navigation.navigate('ProductDescription', {
            itemId: obj._id,
        });
    }}
    key={obj._id}
      >
        <Card style={styles.listItem}>
          <View>
          { obj.images.length >=1 ? ( 
                <Image
                    style={styles.image}
                    source={{uri : `${baseUrl}${(obj.images[0]).substring(7)}`
                        }}
                    /> 
             ) :  (<Image
                    style={styles.image}
                    source={{uri : `${baseUrl}images/uploads/dummy.jpeg`}}  />  )  }
           </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                {obj.name}
              </Text>
              <Text style={styles.infoText}>₹ {obj.price}</Text>
            </View>
          </Card>
       </TouchableOpacity>
      )
    return (
      <View style={{flex:1,backgroundColor:"#D3D3D3"}}>
        
        {/* Search Header */}
        {/* <Search_Header navigation={this.props.navigation}/> */}

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
             <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{height:30, width:30}}>
                <Ionicons name="ios-arrow-back" size={30} color="white" />
            </TouchableOpacity>
             <View>
                 <Text style={{color:"#fff", fontSize:18}}>{strings.search_product[lang]}</Text>
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
                        placeholder="Search"
                        onChangeText={this.updateSearch}
                        value={this.state.searchtext}
                    autoFocus={true}
                ></TextInput>
                <EvilIcons name="search" size={28} color="#A9A9A9" style={{marginTop:5, marginLeft:-13}} />
             </View>
        </View>

        {/* End search header */}


        <ScrollView>
          <View style={{alignItems:"center",flex:1}}>
            {_productList}
          </View> 
        </ScrollView>      
      </View>
  );
  }
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 20,
    width:width
  },
  contactIcon: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },

})