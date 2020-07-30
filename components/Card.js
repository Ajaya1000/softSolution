import React from 'react';
import { StyleSheet, Text, View , Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground, Alert} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { Card } from "react-native-paper" ;
import axios from "axios";
import { AsyncStorage } from 'react-native';
let baseUrl =`https://knekisan.com/`
// let baseUrl = `http://192.168.29.157:4000/`;
const { width } = Dimensions.get('window')
var productData = []
export const Card1 = (props) => (
            <TouchableOpacity
                onPress={()=>props.navigation.navigate('ProductDescription') }
                activeOpacity={0.7}
                style={{elevation:3}}
            >
                <Card style={styles.mycard}>
                    <View style={{ width: '100%', height: 150}} >
                        <Image
                            style={styles.image}
                            source={require("./../assets/home-2.png")}
                        />    
                                 
                    </View>
                </Card>
            </TouchableOpacity>
  );
export const Card2 = (props) => (
        <TouchableOpacity
            onPress={()=>props.navigation.navigate('ProductDescription') }
            activeOpacity={0.7}
            style={{elevation:3}}
        >
            <Card style={styles.mycard}>
                <View style={{ width: '100%', height: 250}} >
                    <Image
                        style={styles.image}
                        source={require("./../assets/swiper-1.png")}
                    />    
                             
                </View>
            </Card>
        </TouchableOpacity>
);
export const Card3 = (props) => (
        <TouchableOpacity
            onPress={()=>props.navigation.navigate('ProductDescription') }
            activeOpacity={0.7}
            style={{elevation:3}} 
        >
            <Card style={styles.mycard}>
                <View style={{ width: '100%', height: 200}} >
                    <Image
                        style={styles.image}
                        source={require("./../assets/swiper-1.png")}
                    />    
                             
                </View>
            </Card>
        </TouchableOpacity>
);
export const Card4 = (props) => (
        <TouchableOpacity
            onPress={()=>props.navigation.navigate('ProductDescription') }
            activeOpacity={0.7}
            style={{elevation:3}}
        >
            <Card style={styles.mycard}>
                <View style={{ width: '100%', height: 70}} >
                    <Image
                        style={styles.image}
                        source={require("./../assets/swiper-1.png")}
                    />    
                             
                </View>
            </Card>
        </TouchableOpacity>
);
export const Card5 = (props) => (
        <TouchableOpacity
            onPress={()=>props.navigation.navigate('ProductDescription') }
            activeOpacity={0.7}
            style={{elevation:3}}
        >
            <Card style={styles.mycard}>
                <View style={{ width: '100%', height: 100}} >
                    <Image
                        style={styles.image}
                        source={require("./../assets/swiper-1.png")}
                    />    
                             
                </View>
            </Card>
        </TouchableOpacity>
);
export const LabelCard = (props) => (
    <View style={{marginTop:3}}>
        <Card style={{marginHorizontal:10, }}>
            <View style={{ width: '100%', height: 40, justifyContent:"center", alignItems:"center",backgroundColor:"#E0FFFF"}} >
                <Text style={{fontFamily:"serif", fontWeight:"bold"}}>{props.label}</Text>                
            </View>
        </Card>
    </View>
);
export const LargeCategoryCards = (props) => (
        <TouchableOpacity
            onPress={()=>props.navigation.navigate('ProductDescription') }
            activeOpacity={0.7}
            style={{backgroundColor:"#FAFAD2",borderWidth: 0.5, borderColor: '#D3D3D3'}}
        >
            <Card>
                <View style={{ width: width/2 - 10, height: width/2 - 10, padding:15, backgroundColor:"#FAFAD2"}} >
                    <Image
                        style={styles.image}
                        source={require("./../assets/swiper-1.png")}
                    />  
                    <View style={{alignItems:"center"}}>
                        <Text style={{marginTop:3}}>श्रेणी नाम</Text>  
                    </View>         
                </View>
            </Card>
        </TouchableOpacity>
);
export const SmallCategoryCards = (props) => (
        <TouchableOpacity
            onPress={()=>props.navigation.navigate('ProductDescription') }
            activeOpacity={0.7}
            style={{backgroundColor:"#FAFAD2",borderWidth: 0.5, borderColor: '#D3D3D3'}}
        >
            <Card>
                <View style={{ width: width/3 - 8, height: width/3 - 8, padding:15, backgroundColor:"#FAFAD2"}} >
                    <Image
                        style={styles.image}
                        source={require("./../assets/swiper-1.png")}
                    />    
                    <View style={{alignItems:"center"}}>
                        <Text style={{marginTop:3, fontSize:10}}>श्रेणी नाम</Text>
                    </View>         
                </View>
            </Card>
        </TouchableOpacity>
)
// export class ScrollHorizontalCard extends React.Component{
//     componentWillMount(){
//         this.getProducts();
//     }
//     constructor(props) {
//     super(props);
     
//     this.state = {
//         products:[],
//         _id:"hii"
//     };
//      }
//     getProducts = () =>{
//     axios.get(`${baseUrl}api/v1/product/getall`).
//     then((res)=>{
//        var products = res.data.data;
//     //    var _id = res.data.data.data;
//         this.setState({products})
//         var check = products[0].images[0]
//         console.log(":1:\n\n :2: \n\n"+ JSON.stringify(check).substring(7).slice(0, -1) );

        
//       }).
//       catch(e=>{
//           Alert.alert('Error : '+ e);
          
//       })
//     }
//     render(){
//         // console.log('hii\n\n+'+this.state._id);
        
//         return(
//             this.state.products.map((obj)=>
//             <TouchableOpacity
//             onPress={()=>{
//                 this.props.navigation.navigate('ProductDescription', {
//                     itemId: obj._id,
//                 });
//             }}
//             // activeOpacity={0.7} 
//             style={{elevation:3, marginVertical:5, marginHorizontal:5, width: 150, height: 200, backgroundColor:"#fff"}}
//         >
//             <View style={{ width:150,height:120,paddingVertical:5, paddingLeft:1,paddingRight:3}}>
//                 <Image
//                     style={styles.image}
//                     // source={{uri: `${baseUrl}${JSON.stringify(obj.images[0]).substring(7).slice(0, -1)}` }}
//                     // source={require("./../assets/swiper-1.png")}
//                     source={
//                     {uri : `${baseUrl}${JSON.stringify(obj.images[0]).substring(7).slice(0, -1)}` } 
//                         ? {uri : `${baseUrl}${JSON.stringify(obj.images[0]).substring(7).slice(0, -1)}` }
//                         : require("./../assets/swiper-1.png")
//                      }
//                 /> 
//             </View> 
//             <View style={{paddingHorizontal:10, alignItems:"center"}}>
//                 <Text style={{width:130, fontSize:13}}>{obj.name}</Text>
//                 {/* <View style={{flexDirection:"row"}}> */}
//                     {/* <View style={{ flexDirection:"row", height:17,width:35, marginTop:3, backgroundColor:"#D0F0C0", alignItems:"center", justifyContent:"center"}}> */}
//                         {/* <Text style={{fontSize:13, color:"green"}}>4.5 </Text>
//                         <AntDesign name="star" size={10} color="green" /> */}
//                     {/* </View> */}
//                     {/* <Text style={{marginTop:2, fontSize:13}}> 10181 Ratings</Text> */}
//                 {/* </View> */}
//                 {/* <Text style={{fontSize:13}}>750 ml</Text> */}
//             </View>                      
//             <View style={{paddingHorizontal:10}}>
//                 <Text style={{marginTop:15, fontSize:14}}>MRP: {obj.price}</Text>
//                 {/* <Text style={{fontWeight:"bold", fontSize:14}}>Rs 98</Text> */}
//             </View>
//             <View style={{alignItems:"center", marginTop:15}}>
//                 {/* <View style={{height:30, width:60, justifyContent:"center", alignItems:"center", backgroundColor:"#DC143C", borderRadius:5}}> */}
//                     {/* <Text style={{color:"#fff", fontSize:14}}>ADD</Text>     */}
//                 {/* </View> */}
//             </View>  
//         </TouchableOpacity>
       
//             )
//         );
//     }
// }


export class ScrollHorizontalCard extends React.Component{
    componentWillMount(){
        this.getProducts();
    }
    constructor(props) {
    super(props);
     
    this.state = {
        products:[],
        _id:"",
        imageUri:require('./../assets/swiper-1.png')
    };
     }
    getProducts = () =>{
    axios.get(`${baseUrl}api/v1/product/getall`).
    then((res)=>{
       var products = res.data.data;
        this.setState({products})
        // var check = products[0].images[0]
        // console.log("\n\n\n\n"+ JSON.stringify(check).substring(7).slice(0, -1) );
      }).
      catch(e=>{
          Alert.alert('Error : '+ e);
      })
    }
    render(){
        return(
            this.state.products.filter((status)=> status.status === 'Active').map((obj)=>
            <TouchableOpacity
            onPress={()=>{
                this.props.navigation.navigate('ProductDescription', {
                    itemId: obj._id,
                });
            }}
            style={{elevation:3, marginVertical:5, marginHorizontal:5, width: 150, height: 200, backgroundColor:"#fff"}}>
            <View style={{ width:150,height:120,paddingVertical:5, paddingLeft:1,paddingRight:3}}>
            { obj.images.length >=1 ? ( 
                <Image
                    style={styles.image}
                    source={{uri : `${baseUrl}${(obj.images[0]).substring(7)}`
                     }}
                    // source={uri:{ (obj.images.length >= 1) ? "":""}}
                    // source={{uri:this.state.imageUri}}  
                /> 
             ) :  (<Image
                    style={styles.image}
                    source={{uri : `${baseUrl}images/uploads/dummy.jpeg`}}

                    // source={require('./../assets/swiper-1.png')}
                    // require('./../assets/swiper-1.png')
                    // source={uri:{ (obj.images.length >= 1) ? "":""}}
                    // source={{uri:this.state.imageUri}}  
                />  )  }
           
            </View> 
                <View style={{paddingHorizontal:10, alignItems:"center"}}>
                <Text style={{width:130, fontSize:13}}>{obj.name}</Text>
            </View>                      
                <View style={{paddingHorizontal:10}}>
                <Text style={{marginTop:15, fontSize:14}}>₹ {obj.price}</Text>
            </View>
               <View style={{alignItems:"center", marginTop:15}}>
            </View>  
        </TouchableOpacity>

              
            
            )    
        ); 
    }
}

export class ScrollHorizontalCardViewNew extends React.Component{
    componentWillMount(){
        this.getProducts();
    }
    constructor(props) {
    super(props);
     
    this.state = {
        products:[],
        _id:"",
        imageUri:require('./../assets/swiper-1.png')
    };
     }
    getProducts = () =>{
    axios.get(`${baseUrl}api/v1/product/getall`).
    then((res)=>{
       var products = res.data.data;
        this.setState({products})
        // var check = products[0].images[0]
        // console.log("\n\n\n\n"+ JSON.stringify(check).substring(7).slice(0, -1) );
      }).
      catch(e=>{
          Alert.alert('Error : '+ e);
      })
    }
    render(){
        return(
            this.state.products.filter((status)=> status.status === 'Active').map((obj)=>
            <TouchableOpacity
            onPress={()=>{
                this.props.navigation.navigate('ProductDescription_new', {
                    itemId: obj._id,
                });
            }}
            style={{flexDirection:'row', elevation:3, width:width-10, height: 130, alignItems:'center', justifyContent:'space-between', marginVertical:5, marginHorizontal:5, backgroundColor:"#fff"}}>
            <View style={{ width:150,height:120,paddingVertical:5, paddingLeft:1,paddingRight:3}}>
            { obj.images.length >=1 ? ( 
                <Image
                    style={styles.image}
                    source={{uri : `${baseUrl}${(obj.images[0]).substring(7)}`
                     }}
                    // source={uri:{ (obj.images.length >= 1) ? "":""}}
                    // source={{uri:this.state.imageUri}}  
                /> 
             ) :  (
                 <Image
                    style={styles.image}
                    source={{uri : `${baseUrl}images/uploads/dummy.jpeg`}}

                    // source={require('./../assets/swiper-1.png')}
                    // require('./../assets/swiper-1.png')
                    // source={uri:{ (obj.images.length >= 1) ? "":""}}
                    // source={{uri:this.state.imageUri}}  
                />  )  }
            </View> 
            
            <View>
                <View style={{paddingHorizontal:10, alignItems:"center"}}>
                    <Text style={{width:130, fontSize:13}}>{obj.name}</Text>
                </View>                      
                    <View style={{paddingHorizontal:10}}>
                    <Text style={{marginTop:15, fontSize:14}}>₹ {obj.price}</Text>
                </View>
                <View style={{alignItems:"center", marginTop:15}}>
                </View>  
            </View>

        </TouchableOpacity>

            )    
        ); 
    }
}
export const TransparentCard = (props) => (
    <TouchableOpacity
        onPress={()=>props.navigation.navigate('ProductDescription') }
        activeOpacity={0.7}
        style={{elevation:3, 
                marginVertical:5, 
                marginHorizontal:5, 
                width: 150, height: 200, 
                backgroundColor:"rgba(52, 52, 52, 0.8)", 
                borderColor:"#fff", borderWidth:1,
                alignItems:"center",
                justifyContent:"center"
            }}
    >
        <Text style={{fontSize:15, color:"#fff"}}>और देखो</Text>
          
    </TouchableOpacity>
);
export const ScrollHorizontalCardView = (props) => (
    <View style={{width:"100%", height:230, paddingTop:7, paddingBottom:8, backgroundColor:"#fff", marginBottom:3}}>
        <ImageBackground source={require("./../assets/horizontalcardbackground.jpg")} style={styles.image}>
            <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <ScrollHorizontalCard navigation={props.navigation}/>
                {/* <TransparentCard navigation={props.navigation}/> */}
            </ScrollView>
        </ImageBackground>
    </View>
);
export const OffersLargeCards = (props) => (
    <TouchableOpacity
        onPress={()=>props.navigation.navigate('ProductDescription') }
        activeOpacity={0.7}
        style={{backgroundColor:"#FAFAD2",borderWidth: 0.5, borderColor: '#D3D3D3'}}
    >
        <Card>
            <View style={{ width: width/2 - 10, height: width/2 - 10}} >
                <Image
                    style={styles.image}
                    source={require("./../assets/swiper-1.png")}
                />  
            </View>
        </Card>
    </TouchableOpacity>
);
export const ScrollHorizontal_Product_Suggestion = (props) => (
    <TouchableOpacity
        onPress={()=>props.navigation.navigate('ProductDescription') }
        activeOpacity={0.7}
        style={{elevation:3, marginTop:5, marginBottom:5, marginHorizontal:5, width: 150, height: 200, backgroundColor:"#fff"}}
    >
        <View style={{ width:150,height:120,paddingVertical:5 }}>
            <Image
                style={styles.image}
                source={require("./../assets/swiper-1.png")}
            /> 
        </View> 
        <View style={{paddingHorizontal:10,}}>
            <Text style={{width:130, fontSize:13}}>Fresho - Carrot - Ooty</Text>
            {/* <Text style={{fontSize:13, marginTop:25}}>500 g</Text> */}
        </View>                      
        <View style={{paddingHorizontal:10}}>
            {/* <View style={{flexDirection:'row', marginTop:15}}> */}
                {/* <Text style={{fontSize:14, color:'grey'}}>MRP: </Text>
                <Text style={{fontSize:14, textDecorationLine:'line-through', color:'grey', textDecorationColor:'grey'}}>Rs 100</Text> */}
            {/* </View> */}
            {/* <Text style={{fontWeight:"bold", fontSize:14}}>Rs 33</Text> */}
        </View>
        <View style={{alignItems:"center", marginTop:15}}>
            {/* <TouchableOpacity style={{height:30, width:60, justifyContent:"center", alignItems:"center", backgroundColor:"#DC143C", borderRadius:5}}>
                <Text style={{color:"#fff", fontSize:14}}>ADD</Text>    
            </TouchableOpacity> */}
        </View>  
    </TouchableOpacity>
);
export const ScrollHorizontal_Product_SuggestionView = (props) => (
    <View style={{width:"100%", height:320, paddingTop:7, backgroundColor:"#fff", marginBottom:3}}>
        <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <ScrollHorizontal_Product_Suggestion navigation={props.navigation}/>
            <ScrollHorizontal_Product_Suggestion navigation={props.navigation}/>
            <ScrollHorizontal_Product_Suggestion navigation={props.navigation}/>
            <ScrollHorizontal_Product_Suggestion navigation={props.navigation}/>
            <ScrollHorizontal_Product_Suggestion navigation={props.navigation}/>
            <ScrollHorizontal_Product_Suggestion navigation={props.navigation}/>
            {/* <TransparentCard navigation={props.navigation}/> */}
        </ScrollView>
    </View>
);


export class ScrollVerticalCard extends React.Component{
    componentWillMount(){
        this.getProducts();
    }
    constructor(props) {
    super(props);
     
    this.state = {
        products:[],
        _id:"",
        imageUri:require('./../assets/swiper-1.png')
    };
     }
    getProducts = () =>{
    axios.get(`${baseUrl}api/v1/product/getall`).
    then((res)=>{
       var products = res.data.data;
        this.setState({products})
      }).
      catch(e=>{
          Alert.alert('Error : '+ e);
      })
    }
    render(){
        return(
            this.state.products.filter((status)=> status.status === 'Active').map((obj)=>
            <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('ProductDescription', {
                            itemId: obj._id,
                        });
                    }}
                    key={obj._id}
                    style={{flexDirection:'row', elevation:3, width: width-10, height: 130, alignItems:'center', justifyContent:'space-between', marginVertical:5, marginHorizontal:5, backgroundColor:"#fff"}}>
                <View style={{ width:150,height:120,paddingVertical:5, paddingLeft:5,paddingRight:3}}>
                { obj.images.length >=1 ? ( 
                    <Image
                        style={styles.image}
                        source={{uri : `${baseUrl}${(obj.images[0]).substring(7)}`
                        }}
                    /> 
                ) :  (<Image
                        style={styles.image}
                        source={{uri : `${baseUrl}images/uploads/dummy.jpeg`}}
                    />  )  }
           
                </View> 
                <View>
                    <View style={{paddingHorizontal:10, alignItems:"center"}}>
                        <Text style={{width:130, fontSize:18}}>{obj.name}</Text>
                    </View>                      
                    <View style={{paddingHorizontal:10}}>
                        <Text style={{marginTop:15, fontSize:22, color:'#76BA1B'}}>₹ {obj.price}</Text>
                    </View>
                    <View style={{alignItems:"center", marginTop:15}}>
                    </View>  
                </View>
        </TouchableOpacity>
            
            )    
        ); 
    }
}



export const ScrollVerticalCardView = (props) => (
    <View style={{width:"100%", paddingTop:7, paddingBottom:8, backgroundColor:"#fff", marginBottom:3}}>
            <ScrollView>
                <ScrollVerticalCard navigation={props.navigation}/>
                
            </ScrollView>
    </View>
);

//used inside product Description
export class ScrollVerticalCard2 extends React.Component{
    componentWillMount(){
        this.getProducts();
    }
    constructor(props) {
    super(props);
     
    this.state = {
        products:[],
        _id:"",
        imageUri:require('./../assets/swiper-1.png')
    };
     }
    getProducts = () =>{
    axios.get(`${baseUrl}api/v1/product/getall`).
    then((res)=>{
       var products = res.data.data;
        this.setState({products})
      }).
      catch(e=>{
          Alert.alert('Error : '+ e);
      })
    }
    render(){
        return(
            this.state.products.filter((status)=> status.status === 'Active').map((obj)=>
            <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('ProductDescription_new', {
                            itemId: obj._id,
                        });
                    }}
                    key={obj._id}
                    style={{flexDirection:'row', elevation:3, width: width-10, height: 130, alignItems:'center', justifyContent:'space-between', marginVertical:5, marginHorizontal:5, backgroundColor:"#fff"}}>
                <View style={{ width:150,height:120,paddingVertical:5, paddingLeft:5,paddingRight:3}}>
                { obj.images.length >=1 ? ( 
                    <Image
                        style={styles.image}
                        source={{uri : `${baseUrl}${(obj.images[0]).substring(7)}`
                        }}
                    /> 
                ) :  (<Image
                        style={styles.image}
                        source={{uri : `${baseUrl}images/uploads/dummy.jpeg`}}
                    />  )  }
           
                </View> 
                <View>
                    <View style={{paddingHorizontal:10, alignItems:"center"}}>
                        <Text style={{width:130, fontSize:18}}>{obj.name}</Text>
                    </View>                      
                    <View style={{paddingHorizontal:10}}>
                        <Text style={{marginTop:15, fontSize:22, color:'#76BA1B'}}>₹ {obj.price}</Text>
                    </View>
                    <View style={{alignItems:"center", marginTop:15}}>
                    </View>  
                </View>
        </TouchableOpacity>
            
            )    
        ); 
    }
}



export const ScrollVerticalCardView2 = (props) => (
    <View style={{width:"100%", paddingTop:7, paddingBottom:8, backgroundColor:"#fff", marginBottom:3}}>
            <ScrollView>
                <ScrollVerticalCard2 navigation={props.navigation}/>
                
            </ScrollView>
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
    },
    mycard: { 
        marginHorizontal: 10,
        marginVertical:5,
    },
  })