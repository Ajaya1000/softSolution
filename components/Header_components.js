import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import { Ionicons, FontAwesome5, Feather,EvilIcons,FontAwesome} from '@expo/vector-icons';
import Constant from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { CONSTANT } from '../shared/trans';

const { width } = Dimensions.get('window')
const mycolor = "#212121" 

// export const Header = (props) => {
//     // let test= await AsyncStorage.getItem('username')
//     // console.log('test :'+JSON.stringify(test));  
    
//   }
const strings= CONSTANT.hc;
export class Header extends React.Component{
    constructor(props) {
        super(props);
         
        this.state = {
            username: null,
            lang:'en'
        };
         }

    componentDidMount(){
        this._checklogin();
         (async () => {
             let value = await AsyncStorage.getItem('lang');
             value = value || 'en';
             this.setState({
                 lang: value
             })
         })();
    }
    _checklogin = async () =>{
        let test= await AsyncStorage.getItem('username')
        // console.log('test\n\n\n\n\n\n\n\n\n :'+JSON.stringify(test));
        this.setState({
            username:test
        }) 
    }
    render() {
        this._checklogin();
        lang= this.state.lang;
        let Id = null
        let msg = null
        if (this.state.username !==null) {
            Id = this.state.username
            msg =strings.cong[lang]
        }
        else{
            msg = ""
            Id = ""
        }
        return (
            <View style={{
                paddingTop:Constant.statusBarHeight,
                top:0,
                left:0,
                right:0,
                height:95 + Constant.statusBarHeight,
                backgroundColor:"#4CBB17"
                
            }}>
              <View style={{
                  flexDirection:"row",
                  marginVertical:5,
                  marginHorizontal:10,
                  width:width-20,
                  justifyContent:"space-between",
              }}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Feather name="menu" size={30} color="white" />
                </TouchableOpacity>
                 
                 <View>
                     <Text style={{color:"#fff"}}>{msg} {Id}</Text>
                     {/* <Text style={{color:"#fff"}}>{Id}</Text> */}
                 </View>
                 <TouchableOpacity
                 onPress={()=>this.state.username !== null ? 
                 this.props.navigation.navigate("Profile") : this.props.navigation.navigate("LoginSignup")
                 }
                 ><FontAwesome5 name="user-circle" size={30} color="white" /></TouchableOpacity>
              </View>
              <View style={{flexDirection:"row" ,height: 35, width:width-30, backgroundColor: "#fff", borderRadius:5, marginHorizontal:15}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}
                        style={{
                            height: 35,
                            width:width-50,
                            fontSize: 17,
                            color: "#010101",
                            backgroundColor: "#fff",
                            borderRadius:5,
                            paddingHorizontal:15,
                            justifyContent:'center'
                        }}
                    >
                        <Text style={{fontSize:17, color:'grey'}}>खोज</Text>
                    </TouchableOpacity>
                    <EvilIcons name="search" size={28} color="#A9A9A9" style={{marginTop:5, marginLeft:-13}} />
                 </View>
            </View>
          );
    }
}



export const Header2 = (props) => {
    return (
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
              marginHorizontal:10,
              width:width-20,
              justifyContent:"space-between",
          }}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Feather name="menu" size={30} color="white" />
            </TouchableOpacity>
             <View>
                 <Text style={{color:"#fff", fontSize:20, marginRight:20}}>Shop By Category</Text>
             </View>
             <View></View>
          </View>
          <View style={{flexDirection:"row" ,height: 35, width:width-30, backgroundColor: "#fff",marginHorizontal:15}}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Search')}
                    style={{
                        height: 35,
                        width:width-50,
                        fontSize: 17,
                        color: "#010101",
                        backgroundColor: "#fff",
                        borderRadius:5,
                        paddingHorizontal:15,
                        justifyContent:'center'
                    }}
                >
                    <Text style={{fontSize:17, color:'grey'}}>खोज</Text>
                </TouchableOpacity>
                <EvilIcons name="search" size={28} color="#A9A9A9" style={{marginTop:5, marginLeft:-13}} />
             </View>
        </View>
      );
  }




export const Header3 = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:45 + Constant.statusBarHeight,
            backgroundColor:"#4CBB17",   
        }}>
          <View style={{
              flexDirection:"row",
              marginVertical:5,
              marginHorizontal:10,
              width:width-20,
              justifyContent:"space-between",
          }}>
              
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Feather name="menu" size={30} color="white" />
            </TouchableOpacity>
             <View>
                 <Text style={{color:"#fff", fontSize:20}}>पूछताछ</Text>
             </View>
             <TouchableOpacity onPress={() => props.navigation.navigate('Search')} activeOpacity={0.8}>
                 <EvilIcons name="search" size={32} color="#fff" style={{marginTop:5, marginRight:8}} />
             </TouchableOpacity>
          </View>
        </View>
      );
}

export const Header4 = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:45 + Constant.statusBarHeight,
            backgroundColor:"#4CBB17",   
        }}>
          <View style={{
              flexDirection:"row",
              marginVertical:5,
              marginHorizontal:10,
              width:width-20,
              justifyContent:"space-between",
          }}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                <Feather name="menu" size={30} color="white" />
            </TouchableOpacity>
             <View>
                 <Text style={{color:"#fff", fontSize:20, paddingLeft:10}}>टोकरी की समीक्षा करें</Text>
             </View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Search')} >
                <EvilIcons name="search" size={32} color="#fff" style={{marginTop:5, marginRight:8}} />
            </TouchableOpacity>
          </View>
        </View>
      );
}


export const Header5 = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:45 + Constant.statusBarHeight,
            backgroundColor:"#4CBB17",   
        }}>
          <View style={{
              flexDirection:"row",
              marginVertical:5,
              marginHorizontal:20,
              width:width-40,
              justifyContent:"space-between",
          }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{height:30, width:30}}>
                <Ionicons name="ios-arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <View style={{flexDirection:"row", marginLeft:5, justifyContent:"space-between"}}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Search')} style={{height:30, width:30}}>
                    <EvilIcons name="search" size={32} color="#fff" style={{marginTop:2}} />
                </TouchableOpacity>
                {/* <Ionicons name="md-share" size={24} color="white" style={{marginTop:5, marginLeft:30}} />
                <FontAwesome name="shopping-basket" size={20} color="white" style={{marginTop:7, marginLeft:30}}/> */}
            </View>

          </View>
        </View>
      );
}