import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import  { Swiper1, Swiper2, Swiper3 } from "../components/Swiper" ;
import  { Card1, Card2, Card3, Card4, Card5, LabelCard, OffersLargeCards, ScrollHorizontalCardView } from "../components/Card"
import { Header3 } from "../components/Header_components"
const { width } = Dimensions.get('window')

const items=[
    {id:"3", component:<Swiper3/>},
    {id:"7", component:<View style={{flexDirection:"row", marginHorizontal:9, marginTop:3}}>
                        <View>
                          <OffersLargeCards/><OffersLargeCards/>
                        </View>
                        <View>
                          <OffersLargeCards/><OffersLargeCards/>
                        </View>
                      </View>},
    {id:"8", component:<View style={{flexDirection:"row", marginHorizontal:9, marginTop:3}}>
                            <View>
                            <OffersLargeCards/><OffersLargeCards/>
                            </View>
                            <View>
                            <OffersLargeCards/><OffersLargeCards/>
                            </View>
                        </View>},
    {id:"9", component:<View style={{flexDirection:"row", marginHorizontal:9, marginTop:3}}>
                        <View>
                          <OffersLargeCards/><OffersLargeCards/>
                        </View>
                        <View>
                          <OffersLargeCards/><OffersLargeCards/>
                        </View>
                        <View>
                          <OffersLargeCards/><OffersLargeCards/>
                        </View>
                      </View>},
    {id:"10", component:<Swiper1/>},
    {id:"11", component:<Card3/>},
]



export default class Offers extends React.Component {
    state={
        loading:true,
        refreshing:false,
        data:[],
    
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
        <View style={{flex:1,backgroundColor:"#D3D3D3"}}>  
          <Header3 navigation={this.props.navigation}/>     
          <FlatList
            keyExtractor={item => item.id}
            data={items}
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


})
