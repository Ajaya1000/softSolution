import React, { Component } from "react";
import { Image, View, Dimensions } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from "native-base";
import {
  EvilIcons,
  Entypo,
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AsyncStorage } from "react-native";
import { Modal } from "react-native-paper";
import { Lightbox } from "react-modal-image";
import { CONSTANT } from "../shared/trans";
const { width, height } = Dimensions.get("window");
const strings= CONSTANT.profile;

export default class CardImageExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      imageProfile: "",
      ucity: "",
      uState: "",
      aadharModal: false,
      panModal: false,
      imageAadhar: null,
      imagePan: null,
      lang:'en'
    };
  }
  componentWillMount() {
    this._checklogin();
  }
  componentDidMount() {
    console.log("component did mount called ajay");
    (async () => {
      console.log("profile fetching");
      try {
        console.log("inside try block");
        let user_data = await AsyncStorage.getItem("userdata");
        console.log(typeof user_data);
        user_data = JSON.parse(user_data);
        console.log("user data is");
        console.log(user_data);
        this.setState({
          id: user_data._id,
          mNumber: user_data.mobile,
          ifscCode: user_data.bankDetails.ifscCode,
          bank_name: user_data.bankDetails.bank_name,
          accNumber: user_data.bankDetails.accNumber,
          accHolderName: user_data.bankDetails.accHolderName,
          selected: "Farmer",
          imageProfile: user_data.documentsUploaded[0],
          imageAadhar: user_data.documentsUploaded[1],
          imagePan: user_data.documentsUploaded[2],
          fullName: "test",
          username: user_data.userName,
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
          firstName: user_data.firstName || "",
          lastName: user_data.lastName || "",
        });
      } catch (error) {
        Alert.alert("Profile details couldn't be fetched");
        console.log(error);
      }
    })();
    (async () => {
      let value = await AsyncStorage.getItem('lang');
      value = value || 'en';
      this.setState({
        lang: value
      })
    })();
  }

  _checklogin = async () => {
    let imageProfile = await AsyncStorage.getItem("imageProfile");
    console.log("profile_pic:\n" + JSON.stringify(imageProfile));
    this.setState({
      imageProfile,
    });
  };

  render() {
    const {lang} = this.state;
    return (
      <Container>
        {/* <View>
         <Card>
         <CardItem>
            <Body style={{alignItems:"center"}}>
                <Text>
                    My Account
                </Text>
            </Body>
         </CardItem>
         </Card>
     </View> */}

        <View
          style={{
            height: 290,
            width: width,
            backgroundColor: "#fff",
            elevation: 5,
          }}
        >
          <View
            style={{ marginTop: 10, marginRight: 5, alignItems: "flex-end" }}
          >
            <TouchableOpacity
              style={{ height: 30, width: 30, alignItems: "flex-end" }}
              onPress={() => this.props.navigation.navigate("UpdateProfile")}
            >
              <MaterialIcons name="edit" size={24} color="#76BA1B" />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
                elevation: 10,
              }}
            >
              <Image
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 100,
                  resizeMode: "cover",
                }}
                source={{
                  uri: `${this.state.imageProfile}`,
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                {this.state.username}
              </Text>
            </View>
          </View>
        </View>
        {/* <Content style={{maxHeight:200}}>
          <Card >
            <CardItem style={{backgroundColor:"#76BA1B"}}>
              <Left style={{flex:1}}>
                <Thumbnail source={require('../assets/home-2.png')} />
                <Body>
                  <Text style={{color:"#fff"}}>{this.state.username}</Text>
                </Body>
              </Left>
              <Right style={{flex:1}}>
             <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("UpdateProfile")}
             ><SimpleLineIcons name="pencil" size={24} color="#fff" /></TouchableOpacity>
              </Right>
            </CardItem>
            <CardItem cardBody style={{backgroundColor:"#f37372"}}>
            <View style={{height: 200, flex: 1,marginTop:20}}>
            <CardItem style={{backgroundColor:"#fff"}}>
              <Left>
              <EvilIcons name="location" size={48} color="red" />
                <Body>
                  <Text style={{color:"#000"}}>{this.state.ucity}</Text>
                  <Text style={{color:"#000",marginTop:20}} note>{this.state.uState}</Text>
                </Body>
              </Left>
              <Right>
                <TouchableOpacity style={{borderColor:"red",borderWidth:1,padding:5}}>
                    <Text style={{color:"red"}}>Change</Text>
                </TouchableOpacity>
              </Right>
            </CardItem>
            </View>
            </CardItem>

          </Card>
          
        </Content> */}

        <Content style={{ marginTop: 20 }}>
          <List>
            {/* <ListItem>
              <Entypo name="back-in-time" size={24} color="black" />
              <TouchableOpacity><Text> &nbsp;My Inquiry</Text></TouchableOpacity>
            </ListItem> */}

            {/* <ListItem>
            <Left>
              <SimpleLineIcons name="wallet" size={24} color="black" />
              <TouchableOpacity><Text> &nbsp;My Wallet</Text></TouchableOpacity>
            </Left>
            <Right>
                <Text style={{color:"#689f39"}}>Rs 0.0</Text>
            </Right>
            </ListItem> */}

            {/* <ListItem>
              <Entypo name="credit-card" size={24} color="black" />

              <TouchableOpacity><Text> &nbsp;Payment Notifications</Text></TouchableOpacity>
            </ListItem> */}

            {/* <ListItem>
              <SimpleLineIcons name="bubbles" size={24} color="black" />
              <TouchableOpacity><Text> &nbsp;My Ratings & Reviews</Text></TouchableOpacity>
            </ListItem>
            <ListItem>
              <Entypo name="bell" size={24} color="black" />
              <TouchableOpacity><Text> &nbsp;Notifications</Text></TouchableOpacity>
            </ListItem>
            <ListItem>
              <MaterialCommunityIcons name="wallet-giftcard" size={24} color="black" />
              <TouchableOpacity><Text> &nbsp;My Gift Cards</Text></TouchableOpacity>
            </ListItem>
            <ListItem>
              <SimpleLineIcons name="location-pin" size={24} color="black" />
              <TouchableOpacity><Text> &nbsp;My Delivery Address</Text></TouchableOpacity>
            </ListItem>*/}
            <ListItem>
              <Text> &nbsp;{this.state.username}</Text>
            </ListItem>
            <ListItem>
              <Text> &nbsp;+91{this.state.mNumber} </Text>
            </ListItem>
            <ListItem>
              <Text> &nbsp;city: {this.state.uCity} </Text>
            </ListItem>
            <ListItem>
              <Text> &nbsp;state: {this.state.uState} </Text>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ aadharModal: true });
                }}
                style={{ flexDirection: "row", marginTop: 25 }}
              >
                <AntDesign name="idcard" size={26} color="black" />
                <Text>&nbsp;&nbsp;:{strings.see_aadhar[lang]}</Text>
                <Text>
                  &nbsp;&nbsp;
                  <Entypo name={this.state.check2} size={18} color="green" />
                </Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ panModal: true });
                }}
                style={{ flexDirection: "row", marginTop: 25 }}
              >
                <AntDesign name="idcard" size={26} color="black" />
                <Text>&nbsp;&nbsp;:{strings.see_pan[lang]}</Text>
                <Text>
                  &nbsp;&nbsp;
                  <Entypo name={this.state.check3} size={18} color="green" />
                </Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <AntDesign name="logout" size={24} color="black" />
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.removeItem("username").then(() =>
                    this.props.navigation.replace("Home")
                  );
                }}
              >
                <Text> &nbsp;{strings.logout[lang]}</Text>
              </TouchableOpacity>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
