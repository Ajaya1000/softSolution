import React from 'react';
import { StyleSheet, Text, View , Dimensions, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

export const Swiper1 = (props) => (
        <View style={{width:width,height:70,marginTop:3}}>
            <Swiper
                autoplay
                style={{height:70}} 
                paginationStyle={{ position: "absolute", top: undefined, bottom: 0 }}
                
            > 
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-2.png")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-3.png")} />
                </TouchableOpacity>
            </Swiper>
        </View>
  );


export const Swiper2 = (props) => (
          <View style={{width:width,height:200}}>
              <Swiper
                  autoplay
                  style={{height:200}} 
                  paginationStyle={{ position: "absolute", top: undefined, bottom: 0 }}
                  
              >
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                    >
                    <Image style={styles.image} source={require("../assets/image1.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/image2.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/image3.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/image4.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-5.png")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/image5.jpg")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/image3.jpg")} />
                </TouchableOpacity>
                {/* <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </TouchableOpacity> */}
              </Swiper>
          </View>
    );


    export const Swiper3 = (props) => (
        <View style={{width:width,height:200}}>
            <Swiper
                autoplay
                style={{height:200}} 
                paginationStyle={{ position: "absolute", top: undefined, bottom: 0 }}
                
            >
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex:1}}
                    onPress={()=>props.navigation.navigate('ProductDescription') }
                    activeOpacity={1}
                >
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </TouchableOpacity>
            </Swiper>
        </View>
  );

  const styles = StyleSheet.create({
    image:{
        flex: 1,
        height: null, 
        width: null, 
        resizeMode: 'contain', 
        borderWidth: 0.1, 
        borderColor: '#D3D3D3'
    }
  })
  
 