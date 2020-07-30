import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View, Alert, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, EvilIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { Header5 } from "../components/Header_components";
import { Form, Item, Label, Input, Button } from 'native-base';
import { AsyncStorage } from 'react-native';
// import { Table, Row, Rows } from 'react-native-table-component';
import {  ScrollHorizontalCardViewNew, ScrollVerticalCardView2 } from "../components/Card"
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'
import axios from 'axios'
import Modal from "react-native-modal";
var _ = require('lodash');
// import Product_enquiy from './screen/Product_enquiy'
let baseUrl = `https://knekisan.com/`
const { width, height } = Dimensions.get('window')

export default class Product_Description extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _productName: "",
            _productDisc: "",
            _productPrice: "",
            _productImages: [],
            _productFrontImage: '',
            _productqualityParameters: [],
            _productId: "",
            _modalVisible: false,
            bori: "",
            quality: "",
            weight: "",
            vehicleNo: "",
            driver: "",
            remarks: "",
            customer: "",
            userQuality:"",
            product: "",
            disabledButton: true,
            groupByCategory: [],
            productImage:[]
        };
    }
    componentWillMount() {
        let user = AsyncStorage.getItem('user');
        // let parsed = JSON.parse(user);  
        //    console.log('key:\n\n\n\n\n\n '+  JSON.stringify(user) );

        axios.get(`${baseUrl}api/v1/product/${this.props.route.params.itemId}`)
            .then((res) => {
                // console.log('result : ', JSON.stringify(res));
                var _productName = res.data.data.name
                var _productDisc = res.data.data.description
                var _productPrice = res.data.data.price
                var _productImages = res.data.data.images
                var _productqualityParameters = res.data.data.qualityParameters
                // var _productqualityqualityParameter = _productqualityParameters.map(q => q.qualityParameter)
                // var productImage = _productImages[0]
                // console.log('image url : '+_productImages);
                
                var _productId = res.data.data._id
                if (_productImages.length >= 1) {
                    
                    this.setState({ productImage : _productImages })
                }
                else {
                    this.setState({ productImage: ["public/images/uploads/dummy.jpeg"] })
                }
                this.setState({
                    _productName, _productDisc, _productPrice,
                    //  _productImages: JSON.stringify(_productImages),
                    // _productFrontImage: trya.slice(0, -1),
                    _productqualityParameters, _productId
                })
                // console.log("HII \n\n\n\n " + _productqualityParameter[0]._id)
                // console.log('test\n'+this.props.route.params);
                // let _productId = this.props.params.itemId
                // let _productId = this.pro


                const groups = _.groupBy(_productqualityParameters, 'qualityParameter')
                const array = Object.values(groups)
                this.setState({ groupByCategory: groups })
                console.log("groups : " + JSON.stringify(array));

            })
            .catch(err => console.log('Error', err)
            )
    }
    componentDidMount() {

    }


    checkInquiry = async() => {
        let username= await AsyncStorage.getItem('username')
        // console.log('\n\nInquiry\n')
        // console.log(username)
        if(username !== null){
            this.setState({ _modalVisible: true })
        }
        else{
            this.props.navigation.navigate('LoginSignup')
        }
        
    }


    sendEnquire = async (id) => {
        // console.log('State check :\n\n\n\n\n '+JSON.stringify(this.state));
        let _userKey = await AsyncStorage.getItem('user')
        axios.post(`${baseUrl}api/v1/inquiry/create/`, {
            "bori": this.state.bori,
            "quality": this.state.userQuality,
            "weight": this.state.weight,
            "vehicleNo": this.state.vehicleNo,
            "driver": this.state.driver,
            "remarks": this.state.remarks,
            "customer": _userKey,
            "product": id
        }).
            then((data) => {
                // console.log("sucess : "+ data)
                Alert.alert("सफलता", "जांच भेजी गई! हम आप तक वापस आ रहे हैं जल्द ही।")
                this.props.navigation.goBack();
            }).
            catch((e) => {
                console.log(e);

            })
        // Alert.alert("Sucess","We will contact you soon")
    }
    // disabledButtonCheck=()=>{
    //     if(
    //         this.state.bori !== ""&&
    //         this.state.weight !== ""&&
    //         this.state.vehicleNo !== ""&&
    //         this.state.driver !== ""&&
    //         this.state.remarks !== ""
    //     ){
    //         // this.setState({disabledButton:false})
    //         return false
    //     }
    //     else{
    //         return true
    //         // this.setState({disabledButton:true})
    //     }
    // }

    render() {
        // let check = this.state._productqualityParameters.map(q => q)
        
        // console.log(this.state._productName);

        console.log(this.state.productImage);

        //   this.disabledButtonCheck();
        //   console.log('test',this.state._productqualityParameter[0])
        // let _quality =this.state._productqualityParameter.map(q=>{
        //     <Text style={{width:width-45, color:'grey'}}>
        //         Parameter : {q.minimum}
        //         </Text> 
        // })
        // let _quality  = <Text>{this.state._productqualityParameter.map(q=>q.minimum)}</Text>
        // let _quality = this.state._productqualityParameter.map(quality=>{
        //     <View style={{paddingVertical:10, paddingHorizontal:15}}>
        //         <Text style={{width:width-45, color:'grey'}}>
        //         Parameter : {quality.qualityParameter}
        //         </Text> 
        //         <Text style={{width:width-45, color:'grey'}}>
        //         Minimum : {quality.minimum}
        //         </Text> 
        //         <Text style={{width:width-45, color:'grey'}}>
        //         Maximum : {quality.maximum}
        //         </Text> 
        //         <Text style={{width:width-45, color:'grey'}}>
        //         Deduction : {quality.deduction}
        //         </Text> 
        //      </View>
        //     })

        // let qualityParameter = this.state._productqualityParameter.map(quality=>quality.qualityParameter)
        // // this.setState({test})
        // console.log('testing : \n '+JSON.stringify(qualityParameter));
        return (
            <View style={{ flex: 1, backgroundColor: "#D3D3D3" }}>
                <Header5 navigation={this.props.navigation} />
                <ScrollView>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ padding: 10 }}>
                            <View style={{ height: 25, width: 120, borderColor: "green", alignItems: "center", justifyContent: "center", borderWidth: 1, borderRadius: 2, backgroundColor: "#d0f0c0" }}>
                                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{this.state._productName}</Text>
                            </View>
                            <Text style={{ fontSize: 22, marginTop: 5 }}>{this.state._productDisc}</Text>
                            <View style={{ flexDirection: 'row', width: 180, marginTop: 3, justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹ {this.state._productPrice}</Text>
                                {/* <View style={{flexDirection:'row', marginTop:3}}>
                                <Text style={{fontSize:13, color:'grey'}}>MRP:  </Text>
                                <Text style={{fontSize:13, color:'grey', textDecorationLine:"line-through", textDecorationColor:"grey"}}>{this.state._productPrice}</Text>
                            </View> */}
                                {/* <View style={{width:50, height:18, marginTop:2, backgroundColor:'red', borderRadius:2, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:12, color:'#fff'}}>37% off</Text>
                            </View> */}
                            </View>
                            {/* <Text style={{fontSize:10, color:'grey'}}>(inclusive of all taxes)</Text> */}
                        </View>

                        <View>
                            <View style={{ width: width, height: 400 }}>
                                <Swiper
                                    autoplay
                                    style={{ height:400 }}
                                    paginationStyle={{ position: "absolute", top: undefined, bottom: 0 }}

                                >

                                {    
                                    this.state.productImage.map(image=>{

                                        return(
                                            <Image
                                        style={styles.image}
                                        // source={{uri:`${baseUrl}${this.state._productFrontImage}`}}
                                        // source={require("./../assets/swiper-1.png")}
                                        source={
                                            { uri: `${baseUrl}${image.substring(7)}` }
                                        }
                                    />
                                        )
                                    })
                                }
                                </Swiper>
                            </View>
                        </View>
                        {/* <View style={{ paddingHorizontal:10, marginTop:15}}> */}
                        {/* <Text style={{fontSize:20}}>Pack Sizes</Text> */}
                        {/* <View style={{height:60, width:width-20, marginTop:10, borderColor:"green", borderWidth:1, borderRadius:5}}>
                            <View style={{width:50, height:15, backgroundColor:'red', borderRadius:2, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:10, color:'#fff'}}>37% off</Text>
                            </View>
                            <View style={{flexDirection:'row', paddingHorizontal:10, justifyContent:'space-between'}}>
                                <Text style={{fontSize:13, fontWeight:'bold'}}>1 kg</Text>
                                <View>
                                    <Text style={{fontSize:13, fontWeight:'bold'}}>{this.state._productPrice}</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize:13, color:'grey'}}>MRP:  </Text>
                                        <Text style={{fontSize:13, color:'grey', textDecorationLine:"line-through", textDecorationColor:"grey"}}>{this.state._productPrice}</Text>
                                    </View>
                                </View>
                                <RadioButton
                                    value="first"
                                    status='checked'
                                    color='black'
                                />
                            </View>
                        </View> */}
                        {/* <View style={{ flexDirection:'row', marginTop:15, marginBottom:15, justifyContent:'flex-end'}}>
                            <TouchableOpacity style={{ flexDirection:'row'}}>
                                <Text style={{ fontWeight:'bold'}}>+1 more combo  </Text>
                                <AntDesign name="right" size={18} color="black" />
                            </TouchableOpacity>
                        </View> */}
                        {/* </View> */}

                    </View>
                    {/* <View style={{height:60, paddingHorizontal:10, paddingVertical:10, marginTop:5, backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text>Your next available slot  </Text>
                        <Ionicons name="ios-information-circle-outline" size={20} color="grey" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            style={{height:15,width:20}}
                            source={require('./../assets/truck.png')}
                        />
                        <Text>  All Slots Full. Please Try Again Later</Text>
                    </View>
                </View> */}
                    <View style={{ marginTop: 5, padding: 10, backgroundColor: '#fff' }}>
                        <Text style={{ fontSize: 20 }}>इस उत्पाद के बारे में</Text>
                    </View>
                    <View style={{ height: 1 }}></View>
                    {/* <View style={{padding:10, backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:16, color:'grey'}}>About</Text>
                        <TouchableOpacity>
                            <Ionicons name="ios-add" size={28} color="grey" style={{paddingRight:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingVertical:10, paddingHorizontal:15}}>
                        <Text style={{width:width-45, color:'grey'}}>
                            DSogufbfb fask bhf bdnff kl jbhfo ibh few oib nesf o k l f e wjbn few olifbe wbf fEW KJ BNFKE W FBN4EWJBE BN  REGKIWB N FBHI F HIGBN GFH NEWGF EBH REGNEW TEBNR
                        </Text> 
                    </View>
                </View> */}
                    {/* <View style={{height:1}}></View>
                <View style={{padding:10, backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:16, color:'grey'}}>Nutritional Facts</Text>
                        <TouchableOpacity>
                            <Ionicons name="ios-add" size={28} color="grey" style={{paddingRight:10}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingVertical:10, paddingHorizontal:15}}>
                        <Text style={{width:width-45, color:'grey'}}>
                            DSogufbfb fask bhf bdnff kl jbhfo ibh few oib nesf o k l f e wjbn few olifbe wbf fEW KJ BNFKE W FBN4EWJBE BN  REGKIWB N FBHI F HIGBN GFH NEWGF EBH REGNEW TEBNR
                        </Text> 
                    </View>
                </View> */}
                    <View style={{ height: 1 }}></View>
                    <View style={{ padding: 10, backgroundColor: '#fff' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
                            <Text style={{ fontSize: 24, color: 'grey' }}>गुणवत्ता पैरामीटर</Text>
                            {/* <TouchableOpacity>
                            <Ionicons name="ios-add" size={28} color="grey" style={{paddingRight:10}}/>
                        </TouchableOpacity> */}
                        </View>

                        {

                            Object.keys(this.state.groupByCategory).map(q => {

                                return (
                                    <View style={{ marginBottom: 15 }}>
                                        <View
                                            style={{}}><Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>{q}</Text></View>
                                        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', paddingTop: 5 }}>
                                            <View style={{ flex: 1, alignSelf: 'stretch', alignItems: "center" }} ><Text style={{ color: "gray" }}>कम से कम</Text></View>
                                            <View style={{ flex: 1, alignSelf: 'stretch', alignItems: "center" }} ><Text style={{ color: "gray" }}>ज्यादा से ज्यादा</Text></View>
                                            <View style={{ flex: 1, alignSelf: 'stretch', alignItems: "center" }} ><Text style={{ color: "gray" }}>कटौती</Text></View>
                                        </View>

                                        {
                                            this.state.groupByCategory[q].map(val => {
                                                return (
                                                    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                                                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: "center" }} ><Text>{val.minimum}</Text></View>
                                                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: "center" }} ><Text>{val.maximum}</Text></View>
                                                        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: "center" }} ><Text>{val.deduction}</Text></View>
                                                    </View>
                                                )
                                            })
                                        }

                                        {/* <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text>test</Text></View> 
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text>test</Text></View> 
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text>test</Text></View> 
                            </View> */}

                                    </View>
                                );
                            })
                        }
                        {/* {
                    Object.keys(this.state.groupByCategory).map(q=>{
                        return(
                            <View style={{marginBottom:15}}>
                            <View
                            style={{}}><Text style={{fontSize:18,fontWeight:"bold",marginTop:10}}>{q.qualityParameter}</Text></View>
                            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row',paddingTop:5 }}>
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={{color:"gray"}}>Minimum</Text></View> 
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={{color:"gray"}}>Maximum</Text></View> 
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={{color:"gray"}}>Deduction</Text></View> 
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text>{q.minimum}</Text></View> 
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text>{q.maximum}</Text></View> 
                                <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text>{q.deduction}</Text></View> 
                            </View>

                            </View>
                        )
                    })
                } */}
                        {/* {
                    this.state.groupByCategory.map(pro=>{
                        return(
                            <View>
                            <Text>
                                hi
                            </Text>
                            </View>
                        )
                    })
                } */}

                        {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={state.tableData} textStyle={styles.text}/>
                    </Table> */}
                        {/* <View style={{paddingVertical:10, paddingHorizontal:15}}>
                        <Text style={{width:width-45, color:'grey'}}>
                         Parameter : 
                        </Text> 
                        <Text style={{width:width-45, color:'grey'}}>
                         Values :
                        </Text> 
                        <Text style={{width:width-45, color:'grey'}}>
                         Factors : 
                        </Text> 
                    </View> */}

                        {/* <View style={{paddingVertical:10, paddingHorizontal:15}}>
                        <Text style={{width:width-45, color:'grey'}}>
                         Parameter : {this.state._productqualityParameter.parameter}
                        </Text> 
                        <Text style={{width:width-45, color:'grey'}}>
                         Values : {this.state._productqualityParameter.values}
                        </Text> 
                        <Text style={{width:width-45, color:'grey'}}>
                         Factors : {this.state._productqualityParameter.factors}
                        </Text> 
                    </View> */}
                    </View>
                    <View style={{ height: 60, marginTop: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "center", backgroundColor: 'black'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.checkInquiry()
                                    //    this.sendEnquire(
                                    //        this.state._productqualityParameter.parameter,
                                    //        this.state._productqualityParameter.values,
                                    //        this.state._productqualityParameter._id
                                    //    );
                                }}
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "center", backgroundColor: 'black' }}>
                                <FontAwesome name="openid" size={24} color="white" />
                                <Text style={{ fontSize: 17, color: '#fff', paddingLeft: 25 }}>जांच भेजें</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Modal View */}
                        <Modal style={{ backgroundColor: "green", alignItems: "center" }} isVisible={this.state._modalVisible}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this.setState({ _modalVisible: false })}>
                                    <FontAwesome style={{ marginLeft: 10, marginTop: 5 }} color="#fff" size={36} name="close" />
                                </TouchableOpacity>

                                <View style={{ flex: 1, backgroundColor: "#689f39", alignItems: "center", justifyContent: "center" }}>
                                    <View style={{ flexDirection: "row", height: 50, width: width - 20, elevation: 5, marginBottom: 5 }}>
                                    </View>
                                    <View style={{ height: height - 210, width: width - 20, elevation: 5, backgroundColor: "#fff" }}>

                                        <View>
                                            <Text style={{ fontSize: 20, marginTop: 35, textAlign: "center" }}>विवरण दर्ज करें</Text>
                                            <Form style={{ alignItems: "center" }}>
                                                <Item floatingLabel >
                                                    <Label>बोरी</Label>
                                                    <Input
                                                        onChangeText={
                                                            bori => this.setState({ bori })
                                                        }
                                                    />
                                                </Item>
                                                <Item floatingLabel>
                                                    <Label>वजन</Label>
                                                    <Input
                                                        onChangeText={
                                                            weight => this.setState({ weight })
                                                        }
                                                    />
                                                </Item>
                                                <Item floatingLabel>
                                                    <Label>गाडी नंबर</Label>
                                                    <Input
                                                        onChangeText={
                                                            vehicleNo => this.setState({ vehicleNo })
                                                        }
                                                    />
                                                </Item>
                                                <Item floatingLabel>
                                                    <Label>चालक</Label>
                                                    <Input
                                                        onChangeText={
                                                            driver => this.setState({ driver })
                                                        }
                                                    />
                                                </Item>
                                                <Item floatingLabel>
                                                    <Label>टिप्पणियों</Label>
                                                    <Input
                                                        onChangeText={
                                                            remarks => this.setState({ remarks })
                                                        }
                                                    />
                                                </Item>
                                                <Item floatingLabel>
                                                    <Label>गुणवत्ता</Label>
                                                    <Input
                                                        onChangeText={
                                                            userQuality => this.setState({ userQuality })
                                                        }
                                                    />
                                                </Item>
                                                
                                                <Button
                                                    disabled={
                                                        this.state.bori &&
                                                            this.state.weight &&
                                                            this.state.vehicleNo &&
                                                            this.state.driver ? false : true
                                                    }

                                                    onPress={() => {
                                                        this.sendEnquire(
                                                            // this.state._productqualityParameter.parameter,
                                                            // this.state._productqualityParameter.values,
                                                            this.state._productId
                                                        );
                                                    }}
                                                    style={{
                                                        justifyContent: "center", marginTop: 35, width: 200, borderRadius: 30,
                                                        backgroundColor:
                                                            this.state.bori &&
                                                                this.state.weight &&
                                                                this.state.vehicleNo &&
                                                                this.state.driver &&
                                                                this.state.remarks ? "green" : "gray"
                                                    }}
                                                    success>
                                                    <Text style={{ color: "#fff" }}>जांच भेजें</Text>
                                                </Button>
                                            </Form>
                                        </View>

                                    </View>
                                </View>
                                {/* <Product_enquiy 
              parameter={this.state._productqualityParameter.parameter}
              values={this.state._productqualityParameter.values}
              _id={this.state._productqualityParameter._id}
              /> */}
                            </View>
                        </Modal>
                    </View>
                    <View style={{ padding: 10, marginTop: 5, backgroundColor: '#fff' }}>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>और उत्पाद</Text>
                        {/* <ScrollHorizontal_Product_SuggestionView /> */}
                      <ScrollVerticalCardView2 navigation={this.props.navigation}/>

                    </View>
                    {/* <View style={{padding:10, marginTop:5, backgroundColor:'#fff'}}>
                    <Text style={{fontSize:16, marginBottom:10}}>Frequently Bought Together</Text>
                </View> */}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'contain',
        borderWidth: 0.1,
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
})
