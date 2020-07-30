import React, { Component } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right,List,ListItem } from 'native-base';
import { EvilIcons,Entypo,SimpleLineIcons,MaterialCommunityIcons,MaterialIcons,AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
const { width, height } = Dimensions.get('window')

export default class CardImageExample extends Component {
  constructor(props) {
    super(props);
     
    this.state = {
        username: "",
        profile_pic: "",
        ucity:"",
        uState:""
    };
     }
componentWillMount(){
    this._checklogin()
}



_checklogin = async () =>{
    let profile_pic= await AsyncStorage.getItem("profile_pic")
    console.log('profile_pic:\n'+JSON.stringify(profile_pic));
    this.setState({ profile_pic }) 
}



  render() {
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

      <View style={{height:290, width:width, backgroundColor:'#fff', elevation:5}}>
        
        <View style={{marginTop:10, marginRight:5, alignItems:'flex-end'}}>
          <TouchableOpacity style={{ height:30, width:30, alignItems:'flex-end'}}
                            onPress={()=>this.props.navigation.navigate("UpdateProfile")}
          >
            <MaterialIcons name="edit" size={24} color="#76BA1B" />
          </TouchableOpacity>
        </View>
        
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <View style={{height:200, width:200, borderRadius:100, elevation:10}}>
            <Image style={{height:200, width:200, borderRadius:100, resizeMode:'cover'}} 
                   source={{uri:`${this.state.profile_pic}`}} />
          </View>
          <View style={{marginTop:10}}>
            <Text style={{fontSize:22, fontWeight:'bold'}}>{this.state.username}</Text>
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
     
        <Content style={{marginTop:20}}>
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
              <AntDesign name="logout" size={24} color="black" />
              <TouchableOpacity
              onPress={()=>{
                AsyncStorage.removeItem('username').then(()=>this.props.navigation.replace("Home"))
              }}
              ><Text> &nbsp;लॉग आउट</Text></TouchableOpacity>
            </ListItem> 
          </List>
        </Content>
      </Container>
 
 );
  }
}