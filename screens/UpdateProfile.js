import React, { Component } from 'react';
import {Text, AsyncStorage,Alert} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label,Picker,Icon,FooterTab,Button,Footer } from 'native-base';
import * as Permissions from 'expo-permissions';
import {MaterialCommunityIcons,AntDesign,Entypo} from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native-animatable';
export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state={
          id:'',
          accHolderName: false,
          bank_nameChanged: false,
          accNumberChanged: false,
          ifscCodeChanged: false,
          accHolderNameChanged: false,
          aadharNumberChanged: false,
          selectedChanged:false,
          mNumberChanged: false,
          usernameChanged: false,
          selected: "Farmer",
          imageProfile: null,
          imageAadhar: null,
          imagePan: null,
          fullName:"test",
          username:"",
          
          password:"",
          mNumber:"",
          
          land:"",
          area:"sq",
          comodity:null,
          bank_name:'',
          accNumber:"",
          ifscCode:"",
          aadharNumber: '',
          pan:"",
          addressLine1:"",
          addressLine2:"",
          uState:"",
          uCity:"",
          panChanged:false,
          addressLine1Changed:false,
          addressLine2Changed:false,
          uStateChanged:false,
          uCityChanged:false,
          check1:null,
          check2:null,
          check3:null,
          textInput: [],
          inputData: [],
          bankBttn:false,
          showAlert:false,
          firstName:'',
          lastName:''
    }
  }
  componentDidMount() {
    this.getPermissionAsync();
    console.log('component did mount called ajay');
    (async()=>{
      console.log('profile fetching')
      try{
        console.log('inside try block')
        let user_data = await AsyncStorage.getItem('userdata');
        console.log(typeof user_data);
        user_data = JSON.parse(user_data);
        console.log('user data is')
        console.log(user_data);
        this.setState({
            id:user_data._id,
            mNumber:user_data.mobile,
            ifscCode: user_data.bankDetails.ifscCode,
            bank_name: user_data.bankDetails.bank_name,
            accNumber: user_data.bankDetails.accNumber,
            accHolderName: user_data.bankDetails.accHolderName,
            selected: "Farmer",
            imageProfile: user_data.documentsUploaded[0],
            imageAadhar: user_data.documentsUploaded[1],
            imagePan: user_data.documentsUploaded[2],
            fullName: "test",
            username: user_data.username,
            password: "",
            land: "",
            area: "sq",
            comodity: null,
            aadharNumber: user_data.aadharNumber,
            pan: user_data.pan,
            addressLine1: user_data.addressLine1,
            addressLine2: user_data.addressLine2,
            uState: user_data.state,
            uCity: user_data.city,
            check1: null,
            check2: null,
            check3: null,
            textInput: [],
            inputData: [],
            bankBttn: false,
            showAlert: false,
            selected: user_data.userType,
            firstName:user_data.firstName || '',
            lastName:user_data.lastName || ''

        })
      } catch (error){
        Alert.alert("Profile details couldn't be fetched");
        console.log(error);
      }
    })();

  }

  handleSubmit=()=>{
    let obj={id:this.state.id}
    console.log('user id is '+obj.id);
    if(this.state.selectedChanged)
      obj.userType = this.state.selected;
    if(this.state.usernameChanged)
      obj.userName=this.state.username
    if (this.state.addressLine1Changed)
      obj.addressLine1 = this.state.addressLine1
    if (this.state.addressLine2Changed)
      obj.addressLine2 = this.state.addressLine2
    if (this.state.uStateChanged)
      obj.state = this.state.uState
    if (this.state.uCityChanged)
      obj.city = this.state.uCity
    obj.bankDetails={}
    // if (this.state.bank_nameChanged)
      obj.bankDetails.bank_name = this.state.bank_name
    // if (this.state.accHolderNameChanged)
      obj.bankDetails.accHolderName = this.state.accHolderName
    // if (this.state.accNumberChanged)
      obj.bankDetails.accNumber = this.state.accNumber
    // if (this.state.ifscCodeChanged)
      obj.bankDetails.ifscCode = this.state.ifscCode
      obj.user_data.documentsUploaded=[this.state.imageProfile,this.state.imageAadhar,this.state.imagePan];
    console.log('object is');
    console.log(obj);

    // obj = JSON.stringify(obj);
    // console.log(obj);
    axios.post('https://knekisan.com/api/v1/users/update',obj).then((res) => {
      console.log('inside update');
      console.log(res);
       Alert.alert("उपयोगकर्ता update सुस्पष्ट रूप से");
      (async()=>{
        try {
          await AsyncStorage.setItem("userdata", JSON.stringify(res.data.data))
        } catch (error) {
          console.log(error);
        }
      })();
      //  this.props.nav.navigate("Home");
    }).catch (error=>{
      Alert.alert("Server Error, Please Try Again Later");
      console.log("error while trying update");
      console.log(error);
    })
  }
        getPermissionAsync = async () => {
          if (Constants.platform.ios) {
            const {
              status
            } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
              alert('क्षमा करें, हमें यह काम करने के लिए कैमरा रोल की अनुमति चाहिए!');
            }
          }
        };
        _pickImageProfileGallery = async () => {
          try {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
              base64: true
            });
            if (!result.cancelled) {
              console.log('result  : ' + result.uri);

              let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test.${result.uri.split(".")[1]}`
              }

              const data = new FormData();
              data.append('file', newFile)
              data.append('upload_preset', 'UserProfile')
              data.append("cloud_name", "dd0txohwe")
              fetch("https://api.cloudinary.com/v1_1/dd0txohwe/image/upload", {
                  method: "POST",
                  body: data
                })
                .then(res => res.json())
                .then(data => {
                  console.log('cloudinary: \n\n\n\n\n\n\n\n\n' + data.url);
                  this.setState({
                    imageProfile: data.url,
                    check1: "check"
                  })
                })
              this.setState({
                showAlert: false
              });
            }

            console.log(result);
          } catch (E) {
            console.log(E);
            this.setState({
              showAlert: false
            });
          }
        };
        _pickImageProfileCamera = async () => {
          try {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
              base64: true
            });
            if (!result.cancelled) {
              console.log('result  : ' + result.uri);

              let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test.${result.uri.split(".")[1]}`
              }

              const data = new FormData();
              data.append('file', newFile)
              data.append('upload_preset', 'UserProfile')
              data.append("cloud_name", "dd0txohwe")
              fetch("https://api.cloudinary.com/v1_1/dd0txohwe/image/upload", {
                  method: "POST",
                  body: data
                })
                .then(res => res.json())
                .then(data => {
                  console.log('cloudinary: \n\n\n\n\n\n\n\n\n' + data.url);
                  this.setState({
                    imageProfile: data.url,
                    check1: "check"
                  })
                })
              this.setState({
                showAlert: false
              });
            }

            console.log(result);
          } catch (E) {
            console.log(E);
            this.setState({
              showAlert: false
            });
          }
        };

       userChoice = () => {
         this.setState({
           showAlert: true
         });
       }
       _pickImageAadhar = async () => {
         try {
           let result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.All,
             allowsEditing: true,
             aspect: [4, 3],
             quality: 1,
             base64: true
           });
           if (!result.cancelled) {
             console.log('result  : ' + result.uri);

             let newFile = {
               uri: result.uri,
               type: `test/${result.uri.split(".")[1]}`,
               name: `test.${result.uri.split(".")[1]}`
             }

             const data = new FormData();
             data.append('file', newFile)
             data.append('upload_preset', 'UserProfile')
             data.append("cloud_name", "dd0txohwe")
             fetch("https://api.cloudinary.com/v1_1/dd0txohwe/image/upload", {
                 method: "POST",
                 body: data
               })
               .then(res => res.json())
               .then(data => {
                 console.log('cloudinary: \n\n\n\n\n\n\n\n\n' + data.url);
                 this.setState({
                   imageAadhar: data.url,
                   check2: "check"
                 })
               })
           }

           console.log(result);
         } catch (E) {
           console.log(E);
           this.setState({
             showAlert: false
           });
         }
       };
       _pickImagePan = async () => {
         console.log('pick image pan called')
         try {
           let result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.All,
             allowsEditing: true,
             aspect: [4, 3],
             quality: 1,
             base64: true
           });
           if (!result.cancelled) {
             console.log('result  : ' + result.uri);

             let newFile = {
               uri: result.uri,
               type: `test/${result.uri.split(".")[1]}`,
               name: `test.${result.uri.split(".")[1]}`
             }

             const data = new FormData();
             data.append('file', newFile)
             data.append('upload_preset', 'UserProfile')
             data.append("cloud_name", "dd0txohwe")
             fetch("https://api.cloudinary.com/v1_1/dd0txohwe/image/upload", {
                 method: "POST",
                 body: data
               })
               .then(res => res.json())
               .then(data => {
                 console.log('cloudinary: \n\n\n\n\n\n\n\n\n' + data.url);
                 this.setState({
                   imagePan: data.url,
                   check3: "check"
                 })
               })
           }

           console.log(result);
         } catch (E) {
           console.log(E);
           this.setState({
             showAlert: false
           });
         }
       };
  
  render() {
    return (
      <Container>
        <Content>
        <Picker
              mode="dropdown"
              iosHeader="Select User Type"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width:200,marginLeft:5,marginBottom:-30,marginTop:10 }}
              selectedValue={this.state.selected}
              onValueChange={(selected)=>this.setState({selected,selectedChanged:true})}
            >
              <Picker.Item label="किसान" value="Farmer" />
              <Picker.Item label="Adatiya" value="Adatiya" />
              <Picker.Item label="दलाल" value="Broker" />
              
            </Picker>
          <Form style={{flexDirection:"row",flex:1}}>
            <Item floatingLabel style={{width:150}}>
              <Label>उपयोगकर्ता नाम</Label>
              < Input value = {
                this.state.username
              }
              onChangeText = {
                firstName => this.setState({
                  username, usernameChanged:true
                })
              }
              />
            </Item>
            <Item floatingLabel style={{width:150,marginLeft:50}}>
              <Label>अंतिम नाम दर्ज करो</Label>
              < Input value = {
                this.state.lastName
              }
              onChangeText = {
                firstName => this.setState({
                  lastName
                })
              }
              />
            </Item>
          </Form>
          <Form style={{flex:1}}>
            <Item floatingLabel>
              <Label>मोबाइल नंबर</Label>
              < Input value = {
                this.state.mNumber
              }
              onChangeText = {
                mNumber => this.setState({
                  mNumber, mNumberChanged:true
                })
              }
              />
            </Item>
            <Item floatingLabel >
              <Label>पता 1</Label>
              < Input value = {
                this.state.addressLine1
              }
              onChangeText = {
                addressLine1 => this.setState({
                  addressLine1, addressLine1Changed:true
                })
              }
              />
            </Item>
            <Item floatingLabel >
              <Label>पता 2</Label>
              < Input value = {
                this.state.addressLine2
              }
              onChangeText = {
                addressLine2 => this.setState({
                  addressLine2, addressLine2:true
                })
              }
              />
            </Item>
            <Item floatingLabel >
              <Label>राज्य</Label>
              < Input value = {
                this.state.uState
              }
              onChangeText = {
                uState => this.setState({
                  uState,uStateChanged:true
                })
              }
              />
            </Item>
            <Item floatingLabel >
              <Label>शहर</Label>
              < Input value = {
                this.state.uCity
              }
              onChangeText = {
                uCity => this.setState({
                  uCity, uCityChanged:true
                })
              }
              / >
            </Item>
            <Item floatingLabel >
              <Label>बैंक का नाम</Label>
              < Input value = {
                this.state.bank_name
              }
              onChangeText = {
                bank_name => this.setState({
                  bank_name, bank_nameChanged:true
                })
              }
              />
            </Item>
            <Item floatingLabel >
              <Label>खाताधारक का नाम</Label>
              < Input value = {
                this.state.accHolderName
              }
              onChangeText = {
                accHolderName => this.setState({
                  accHolderName, accHolderNameChanged:true
                })
              }
              />
            </Item>
            <Item floatingLabel >
              <Label>खाता संख्या</Label>
              < Input value = {
                this.state.accNumber
              }
              onChangeText = {
                accNumber => this.setState({
                  accNumber, accNumberChanged:true
                })
              }
              />
            </Item>
            <Item floatingLabel >
              <Label>IFSC कोड</Label>
              < Input value = {
                this.state.ifscCode
              }
              onChangeText = {
                ifscCode => this.setState({
                  ifscCode, ifscCodeChanged:true
                })
              }
              />
            </Item>
            {/* <Form> */}
            <Item style={{marginTop:18}}
                  floatingLabel>
              <Label>आधार संख्या</Label>
              <Input value={this.state.aadharNumber}
                  onChangeText={
                      aadharNumber => this.setState({
                        aadharNumber, aadharNumberChanged:true
                      })
                  }
              />
            </Item>
            <Item style={{marginTop:18}}
                  floatingLabel>
              <Label>पैन</Label>
              <Input value={this.state.pan}
                  onChangeText={
                      pan=>this.setState({pan,panChanged:true})
                  }
              />
            </Item>
            <TouchableOpacity onPress={this.userChoice} style={{flexDirection:"row",marginTop:25}}>
            <MaterialCommunityIcons name="face-profile" size={26} color="black" />
                <Text>
                &nbsp;&nbsp;:अपनी फोटो अपलोड करें
                </Text>
                <Text>
                &nbsp;&nbsp;<Entypo name={this.state.check1} size={18} color="green"/>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickImageAadhar} style={{flexDirection:"row",marginTop:25}}>
                   <AntDesign name="idcard" size={26} color="black" />
                <Text>
                &nbsp;&nbsp;:अपना आधार अपलोड करें
                </Text>
                <Text>
                &nbsp;&nbsp;<Entypo name={this.state.check2} size={18} color="green"/>
                </Text>
               
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickImagePan} style={{flexDirection:"row",marginTop:25}}>
            <AntDesign name="idcard" size={26} color="black" />
                <Text>
                &nbsp;&nbsp;:अपना पैन अपलोड करें
                </Text>
                <Text>
                &nbsp;&nbsp;<Entypo name={this.state.check3} size={18} color="green"/>
                </Text>
            </TouchableOpacity>
                   <AwesomeAlert
                show={this.state.showAlert}
                showProgress={false}
                // title=""
                message="आप दस्तावेज़ कैसे अपलोड करेंगे?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="कैमरा से"
                confirmText="गैलरी से"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                  this._pickImageProfileCamera()
                }}
                onConfirmPressed={() => {
                  this._pickImageProfileGallery()
                }}
              />
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full style={{backgroundColor:"#454543"}} onPress={this.handleSubmit}>
              <Text style={{color:"#fff"}}>अपडेट करें</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}