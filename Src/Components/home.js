import React, { Component } from 'react'
import { Text, View,StyleSheet,AsyncStorage,TouchableOpacity } from 'react-native'
import { Header,Card,} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {apiMachine} from '../cons'


class Home extends React.Component 
{  
  constructor(props) {
    super(props)
  
    this.state = {
       machinestatus:"on",
       Openmachineip:'12.024.100.020',
       isLoading:true,
       data:'',
      
    }
  }
  componentDidMount() {
    this.getUserAsyncData();
    }
    getUserAsyncData = async () => {
    try {
    const value = await AsyncStorage.getItem('asyncUserInfo')
    if (value) {
    let userData = JSON.parse(value);
  
    this.setState({ data: userData }, () => {
  
    
  
    })
    }
    } catch (e) {
    // read error
    }
    console.log('Done')
    }
  statusCall=()=>
  {
    let data = {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "username":this.state.data.username,
          "status_on":this.state.machinestatus}),
  }
  return fetch(apiMachine, data)
      .then(response => {
          // console.log(response.status)
          if (response.status == 200) {
              return response.json();
          }
      })
      .then(responseJson => {
          let str = responseJson;
       

          if(str.status=="Machine off"){
              this.setState({ machinestatus:"onn"}, () => {
                  
                    // Alert.alert(
                    //     'Unable to fetch detail',
                    //     "Please retry again after some time",
                    //     [
                    //         { text: 'OK', onPress: () =>console.log("") },
                    //     ],
                    //     { cancelable: false },
                    // );
                    // this.user.current.clear();
                    // this.passwd.current.clear();
                    console.log(this.state.machinestatus)
                })
          }
         else if(str.status=="Machine onn")
          {
            this.setState({ machinestatus:"onn"},() => {
              console.log(this.state.machinestatus)
            })
          }
    
       
      })
      .catch(error => {
          console.error(error);
      });
  }
     
    
  
    render() { 
     
      return (  
        <View style={styles.container}>
       <View>
    <Header
  leftComponent={{ color: '#fff' }}
  centerComponent={{ text: 'Dashboard', style: { color: '#fff' ,fontSize:20} }}
  rightComponent={<Icon
    reverse
    name='logout'
    type='antdesign'
    color='#fff'
    size={26}
    onPress={() =>this.props.navigation.navigate('Login')}
  />}
/>
       </View>
          <View >  
           <Card  title = 'Status'>
             <View style ={{flexDirection:'row',justifyContent:'space-between'}}> 
               <Text style ={{fontSize:18}}>
                 Current Machine Status
               </Text>
               <Text style={{fontWeight:"bold",fontSize:20}}>
                 {(this.state.machinestatus === "on")?"On":(this.state.machinestatus === 2)?"Pending":"Off"}
               </Text>
             </View>
             <View style = {{alignSelf:'center',paddingTop:12,color:'blue'}}>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>this.statusCall()}
                            >
                   
  <Text style={{fontSize:15,alignSelf:'center',paddingTop:7,}}>{this.state.machinestatus}</Text>
               </TouchableOpacity>
               </View>
           </Card>
           <Card  title = 'IP Address'>
             <View style ={{flexDirection:'row',justifyContent:'space-between'}}> 
               <Text style ={{fontSize:18}}>
                            Open for IP               </Text>
               <Text style={{fontWeight:"bold",fontSize:20}}>
              {this.state.Openmachineip}
               </Text>
               
             </View>
           </Card>
           {/* <Card  title = 'IP Address'>
             <View style ={{flexDirection:'row',justifyContent:'space-between'}}> 
               <Text style ={{fontSize:18}}>
                                           </Text>
               <Text style={{fontWeight:"bold",fontSize:20}}>
              {this.state.Openmachineip}
               </Text>
               
             </View> */}
           {/* </Card> */}
          </View>  
          </View> 
          
      );  
    }  
  }  
  const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
       
    },  
    button: {
      backgroundColor: '#3393FF',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 12,
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      overflow: 'hidden',
      // paddingTop:25,
  
      width:200,
      height:40
      
  
    },
});  
export default Home
