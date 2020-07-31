import BackgroundTimer from 'react-native-background-timer';
import { notificationManager } from '.';
// Start a timer that runs continuous after X milliseconds
var data = [];
// var init = async ()=> {
//     let userId = await AsyncStorage.getItem('user')
//     console.log(userId);
//     await this.makeRemoteRequest(userId);
//     console.log(this.state.data);
// }
var makeRemoteRequest = async (userId) => {
    const url = baseUrl + 'api/v1/inquiry/user/' + userId;
    let newData;
    console.log('\n\n', url)
    await fetch(url)
        .then(res => res.json())
        .then(res => {
            // this.setState({
               
            //     refreshing: false
            // })
             newData: [...res.data]
            // console.log(this.state.data);
        })
        .catch(error => {
            this.setState({
                refreshing: false,
            })
        })
    return newData;
 
}
var notify = async() =>{
    let newData = await makeRemoteRequest();
    if(newData && newData.length==data.length){
        for(let i=0;i<data.length;i++){
            if(newData[i] && data[i]){
                if (newData[i].status && data[i].status && newData[i].status !== data[i].status) {
                    notificationManager.showNotification(0, newData[i].status, newData[i].status)
                }
                if (newData[i].paymentRecievedFlag && data[i].paymentRecievedFlag && newData[i].paymentRecievedFlag !== data[i].paymentRecievedFlag) {
                    notificationManager.showNotification(1, "भुगतान प्राप्त", "भुगतान प्राप्त")
                }
                if (newData[i].quantityRecievedFlag && data[i].quantityRecievedFlag && newData[i].quantityRecievedFlag !== data[i].quantityRecievedFlag) {
                    notificationManager.showNotification(2, "प्राप्त मात्रा", "प्राप्त मात्रा")
                }
            }
            
        }
    }
}
var intervalId;
const timerStart = async () =>{
    console.log('timer started');
    data = await makeRemoteRequest();
    notificationManager.configure();
    intervalId = BackgroundTimer.setInterval(() => {
        console.log('tick');
        notify();

    }, 1000);
}
export default timerStart;
// Cancel the timer when you are done with it
BackgroundTimer.clearInterval(intervalId);