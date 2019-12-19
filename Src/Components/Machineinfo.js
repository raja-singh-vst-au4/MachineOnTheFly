import React, { Component } from 'react'
import { Text,AsyncStorage, Button,View,StyleSheet,TouchableOpacity,TextInput,ScrollView,KeyboardAvoidingView,Alert } from 'react-native'
import { Header,Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {apiStatus,apiAuth} from '../cons'
// const {machine_password,allowed_ip,machine_username,machine_ip,security_id} =this.state.machinedata
class Machineinfo extends Component {
    
  constructor(props) {
    super(props)
    this.ipInput = React.createRef();
    this.passwdtext= React.createRef();
    this.state = {
      machinestatus:1,
      Openmachineip:'12.024.100.020',
      showtextField:false,
      machinePassword:'',
      ipAdress:'',
      isLoading:false,
      data:'',
      showIpField:false,
      updateIp:true,
     
  
    }
  }
  isValidIP() {
  
    const octet = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
    const regex = new RegExp(`^${octet}\\.${octet}\\.${octet}\\.${octet}$`);
    alert( regex.test(this.state.ipAdress));
    {(regex.test(this.state.ipAdress))?this.setState({showIpField:false,updateIp:true}):null}
    this.ipInput.current.clear();
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
    this.retrievedata()
    
  
    })
    }
    } catch (e) {
    // read error
    }
    console.log('Done')
    }
  retrievedata=()=>
     {
  fetch(apiStatus,
       {
        method :'GET',
        withCredentials: true,
        headers: {
          "username":this.state.data.username
      
          }
    })
     .then((response) => response.json())
     .then((responseJson) => {
      console.log(responseJson)
       this.setState({
         isLoading: false,
         machinedata: responseJson,
       }, function(){
      

       });
   
     })
     .catch((error) =>{
       console.error(error);
     });
   
      }
  
  

  
click2=()=>
{
  this.setState({
  showtextField:false
  })
  let data = {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
              "username":this.state.data.username,
             "password":this.state.machinePassword,
              "token":this.state.data.token
          
             
            
    }),
    }
    return fetch(apiAuth, data)
    .then(response => {
    if (response.status == 200) {
    return response.json();
    
    }
    })
    .then(responseJson => {
    let str = responseJson;
    console.log(JSON.stringify(str))
    if (str.success) {
    this.setState({ isLoading: false,showIpField:true ,updateIp:false}, 
      // () => {
      // onpres=this
    // Alert.alert(
    // 'Successfully',
    //    "Authenticate Successfully",
    // [
    // { text: 'OK', onPress: () =>this.setState({showIpField:true}) },
    // ],
    // { cancelable: false },
    // );
    // }
    )
    } else {
    
    this.setState({ isLoading: false }, () => {
    Alert.alert(
    'Unable to fetch detail',
    "Please retry again after some time",
    [
    { text: 'OK', onPress: () => alert("failed") },
    ],
    { cancelable: false },
    );
   
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
              <ScrollView>
                <KeyboardAvoidingView>

                
            <View>
         <Header
          
       leftComponent={{ color: '#fff' }}
       centerComponent={{ text: 'MachineInfo', style: { color: '#fff' ,fontSize:20} }}
 
       rightComponent={<Icon
        reverse
        name='logout'
        type='antdesign'
        color='#fff'
        size={26}
        onPress={() =>this.props.navigation.navigate('Login')}
      />
 
 }
      

     /> 
            </View>
               <View >  
                <Card  title = 'Status'>
                  <View style ={{flexDirection:'row',justifyContent:'space-between'}}> 
                    <Text style ={{fontSize:18}}>
                      Current Machine Status
                    </Text>
                    <Text style={{fontWeight:"bold",fontSize:20}}>
                      {(this.state.machinestatus === 0)?"On":(this.state.machinestatus === 2)?"Pending":"Off"}
                    </Text>
                 
                  </View>
                  {(this.state.updateIp)?
                  <View style = {{alignSelf:'center',paddingTop:12,color:'blue'}}>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>this.setState({showtextField:true})}
                            >
                   
                   <Text style={{fontSize:15,alignSelf:'center',paddingTop:7,}}>Update IP</Text>
               </TouchableOpacity>
               </View>
               :null}
               {(this.state.showtextField)?
               <View style = {{flexDirection:'row'}}>
                 <View>
                 <TextInput 
                    style={{width:240}}
                 placeholder = "enter password"
                 placeholderTextColor='black'
                ref = {this.passwdtext}
                            onChangeText={(text)=>this.setState({machinePassword:text})} />
                            </View>
                            <View>
                            <TouchableOpacity style ={styles.button1} >
                              <Text 
                              onPress={()=> this.click2()}
                              style = {{fontSize:20,alignSelf:'center'}}>
                                ok
                              </Text>
                            </TouchableOpacity>
                            </View>
                           
                            
                 </View>
                 :null}
               {(this.state.showIpField)?
                 <View>
                   <TextInput 
                     placeholderTextColor='black'
                   placeholder="Enter Machine IP"
                   ref={this.ipInput}
                              onChangeText={(text)=>this.setState({ipAdress:text})}
                              
                              
                   />
                   <Button title = 'ok'
                           onPress={()=>this.isValidIP()}
                          
                   />
                 </View>
                 :null}
                </Card>
                <Card  title = 'IP Address'>
                  <View style ={{flexDirection:'row',justifyContent:'space-between'}}> 
                    <Text style ={{fontSize:18}}>
                         Open for IP             
                    </Text>
                    <Text style={{fontWeight:"bold",fontSize:20}}> 
                   {this.state.Openmachineip}
                    </Text>
                  </View >
                  {/* <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style  ={{fontSize:18}}>
                    username {this.state.machinedata.username}
                    </Text>
                  </View>
                  <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style  ={{fontSize:18}}>
                    username {this.state.machinedata.machine_password}
                    </Text>
                  </View>
                  <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style  ={{fontSize:18}}>
                    username {this.state.machinedata.allowed_ip}
                    </Text>
                  </View>
                  <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style  ={{fontSize:18}}>
                    username {this.state.machinedata.machine_username}
                    </Text>
                  </View>
                  <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style  ={{fontSize:18}}>
                    username {this.state.machinedata.machine_ip}
                    </Text>
                  </View>
                  <View style ={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style  ={{fontSize:18}}>
                    Security ID {this.state.machinedata.security_id}
                    </Text>
                  </View> */}
                
                </Card>
               </View> 
               </KeyboardAvoidingView>
               </ScrollView> 
               </View> 
          )
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
        button1: {
          backgroundColor: '#3393FF',
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 12,
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          // overflow: 'hidden',
          width:50,
          marginLeft:50
          
        }
          // paddingTop:25,
      
    });  
      export default Machineinfo