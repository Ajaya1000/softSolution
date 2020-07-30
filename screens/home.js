import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View } from 'react-native';
import { Header } from "../components/Header_components"
import  { Swiper1, Swiper2 } from "../components/Swiper" ;
import  { Card1, Card2, Card3, Card4, Card5, LabelCard, LargeCategoryCards, SmallCategoryCards, ScrollVerticalCardView } from "../components/Card"
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
const { width } = Dimensions.get('window')

export default class Home extends React.Component {

  state={
    loading:false,
    refreshing:false, 
    data:[],
    list: [
      // {id:"2", component:<Card4 navigation={this.props.navigation}/>},
      // {id:"3", component:<Swiper1 navigation={this.props.navigation}/>},
      // {id:"4", component:<Card1 navigation={this.props.navigation}/>},
      {id:"5", component:<Swiper2 navigation={this.props.navigation}/>},
      {id:"111", component:<ScrollVerticalCardView navigation={this.props.navigation}/>},

      // {id:"6", component:<LabelCard label="Shop By Category" navigation={this.props.navigation}/>},

      // {id:"7", component:<View style={{flexDirection:"row", marginHorizontal:9}}>
      //                     <View>
      //                       <LargeCategoryCards navigation={this.props.navigation}/>
      //                       <LargeCategoryCards navigation={this.props.navigation}/>
      //                     </View>
      //                     <View>
      //                       <LargeCategoryCards navigation={this.props.navigation}/>
      //                       <LargeCategoryCards navigation={this.props.navigation}/>
      //                     </View>
      //                   </View>},

      // {id:"8", component:<Card3 navigation={this.props.navigation}/>},
      // {id:"9", component:<View style={{flexDirection:"row", marginHorizontal:10}}>
      //                     <View>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                     </View>
      //                     <View>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                     </View>
      //                     <View>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                       <SmallCategoryCards navigation={this.props.navigation}/>
      //                     </View>
      //                   </View>},
      // {id:"10", component:<Swiper1 navigation={this.props.navigation}/>},
      // {id:"11", component:<Card3 navigation={this.props.navigation}/>},
      // {id:"112", component:<ScrollHorizontalCardView navigation={this.props.navigation}/>},
      // {id:"12", component:<Card2 navigation={this.props.navigation}/>},
      // {id:"13", component:<Swiper2 navigation={this.props.navigation}/>},
      // {id:"14", component:<Card2 navigation={this.props.navigation}/>},
      // {id:"15", component:<Card4 navigation={this.props.navigation}/>},
      // {id:"16", component:<LabelCard label="Shop By Category" navigation={this.props.navigation}/>},
      // {id:"17", component:<View style={{flexDirection:"row", marginHorizontal:9}}>
      //                       <View>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                       </View>
      //                       <View>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                       </View>
      //                     </View>},
      // {id:"18", component:<Card2 navigation={this.props.navigation}/>},
      // {id:"19", component:<Swiper1 navigation={this.props.navigation}/>},
      // {id:"20", component:<Card1 navigation={this.props.navigation}/>},
      // {id:"21", component:<LabelCard label="Shop By Category" navigation={this.props.navigation}/>},
      // {id:"22", component:<View style={{flexDirection:"row", marginHorizontal:9}}>
      //                       <View>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                       </View>
      //                       <View>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                       </View>
      //                       <View>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                       </View>
      //                     </View>},
      // {id:"23", component:<Swiper2 navigation={this.props.navigation}/>},
      // {id:"24", component:<Card3 navigation={this.props.navigation}/>},
      // {id:"25", component:<Card5 navigation={this.props.navigation}/>},
      // {id:"26", component:<LabelCard label="Shop By Category" navigation={this.props.navigation}/>},
      // {id:"27", component:<View style={{flexDirection:"row", marginHorizontal:9}}>
      //                       <View>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                       </View>
      //                       <View>
      //                         <LargeCategoryCards navigation={this.props.navigation}/>
      //                       </View>
      //                     </View>},
      // {id:"28", component:<Swiper1 navigation={this.props.navigation}/>},
      // {id:"29", component:<Card4 navigation={this.props.navigation}/>},
  
  ]

  }

  // componentDidMount() {
  //   this.makeRemoteRequest();
  // }

  makeRemoteRequest = () => {
    const url = 'api_url';
    this.setState({
      loading: true
    })
    setTimeout(() => {
      fetch(url)
      .then(res => res.json())
      .then(res =>{
        this.setState({
          data: [...this.state.data, ...res.results],
          refreshing:false    
        })
      })
      .catch(error => {
        this.setState({
          refreshing: false,
        })
      }, 1500);
    })
  }

  handleRefresh = () => {
    this.setState({
      refreshing:true
    })
  }

  handleLoadMore = () => {

  }

  renderFooter = () => {
    if (!this.state.loading) return null

    return(
      <View style={{
        paddingVertical:20,
        borderTopWidth:1,
        borderTopColor:"#CED0CE"
      }}>
        <ActivityIndicator animating size="large"/>
      </View>
    )
  }

  render(){
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
        <Header navigation={this.props.navigation}/>       
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.list}
          renderItem={({ item }) => 
              <View>
                {item.component}
              </View>}
          //refreshing={this.state.refreshing}
          ListFooterComponent={this.renderFooter}
          // onRefresh={this.handleRefresh}
          // onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
        />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
//   image: {
//     flex: 1,
//     height: null, 
//     width: null, 
//     resizeMode: 'contain', 
//     borderWidth: 1, 
//     borderColor: '#dddddd'
// }
});
