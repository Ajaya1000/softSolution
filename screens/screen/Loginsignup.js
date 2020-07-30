import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View, TouchableOpacity } from 'react-native';
const { width , height} = Dimensions.get('window')
import Login from './Login'
import SignUp from './SignUp'
let Msg = ""
export default class LoginSignup extends React.Component {
componentWillMount(){
    Msg = <Login  nav={this.props.navigation}/>
}
    static navigationOptions={
        
    }

    state={
        toggle:true,
        currentView:"login"   
    }

    _onPress = (v) => {
        if( this.state.currentView !== v) {
            this.setState({
                toggle:!this.state.toggle,
                currentView: v
            })
        }
        if(v==="login"){
            Msg =  <Login />
        }

         if(v==="signup"){
            Msg = <SignUp />
        }   
    }
  render(){
    
    //   for Login Button
        const { toggle } = this.state;
        const textBG = toggle?"#fff":"rgba(52, 52, 52, 0.1)";
        const textcolor= toggle?"#689f39":"#fff";
        const textSize = toggle?25:20
    
    //   for Signup Button
    const textBG2 = toggle?"rgba(52, 52, 52, 0.1)":"#fff";
    const textcolor2= toggle?"#fff":"#689f39";
    const textSize2 = toggle?20:25;

    // const entryView = toggle?<Text>Login</Text>:<Text>Signup</Text>
    
    return (
      <View style={{flex:1,backgroundColor:"#689f39", alignItems:"center", justifyContent:"center"}}>
          <View style={{flexDirection:"row",height:50, width:width-20, elevation:5, marginBottom:5}}>
              <TouchableOpacity onPress={ () => {
                  this._onPress("login")
                //   this.loginData();
                  }} style={{flex:1,backgroundColor:textBG, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:textSize, color: textcolor}}>लॉग इन</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => 
              {
                  this._onPress("signup")
                //   this.signUpData();
              }} style={{flex:1, backgroundColor:textBG2, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:textSize2, color: textcolor2}}>साइन अप</Text>
              </TouchableOpacity>
          </View>
          <View style={{height:height-250, width:width-20, elevation:5, backgroundColor:"#fff"}}>
              {/* {entryView} */}
              {/* <View style={{ marginTop:40 ,paddingHorizontal:60}}>
              {Msg}
              </View> */}
              {Msg}
          </View>       
      </View>
  );
  }
}

const styles = StyleSheet.create({


})
