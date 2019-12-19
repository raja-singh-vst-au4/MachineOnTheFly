 import React, { Component } from 'react'
 import { Text,ScrollView,View,TextInput,TouchableOpacity,

    Image,
    Alert,
    StyleSheet,ImageBackground,KeyboardAvoidingView,AsyncStorage } from 'react-native'
//   import Icon from 'react-native-vector-icons'
//  import  Header1 from './Header'
import Icon from 'react-native-vector-icons/AntDesign';
 import {apiLogin} from '../cons'
 class Login extends Component {
     constructor(props) {
         super(props)
         this.user= React.createRef();
         this.passwd = React.createRef();
        
         this.state = {
     username:'',
    password:'' ,
    asyncUserInfo:'',
     isLoading:false           
                }
         
     }
     

                

            click = () => {

                let data = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "username":this.state.username,
                        "password":this.state.password}),
                }
                return fetch(apiLogin, data)
                    .then(response => {
                        // console.log(response.status)
                        if (response.status == 200) {
                            return response.json();
                        }
                    })
                    .then(responseJson => {
                        let str = responseJson;
                     

                        if(str===undefined){
                            this.setState({ isLoading: false}, () => {
                                
                                  Alert.alert(
                                      'Unable to fetch detail',
                                      "Please retry again after some time",
                                      [
                                          { text: 'OK', onPress: () =>console.log("") },
                                      ],
                                      { cancelable: false },
                                  );
                                  this.user.current.clear();
                                  this.passwd.current.clear();
                              })
                        }
                  
                        else  {

                            this.setState({ isLoading: false,asyncUserInfo:str }, () => {
                                this.storeToken()
                                this.user.current.clear();
                                  this.passwd.current.clear();
                                
                            })
                        } 
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }   
            storeToken = async () => {

                try {
                    await AsyncStorage.setItem('asyncUserInfo', JSON.stringify(this.state.asyncUserInfo)).then(
                         this.props.navigation.navigate('Dashboard')
                        
                        )
                } catch (e) {
                    console.log(e)
                }
              
            }
     render() {
      
         return (
        <View  style={{flex:1}}>
           
                       
                 
                   <ImageBackground source={{uri:'http://excellencetally.com/webapp/Admin/assets/img/backgrounds/2.jpg'}} style={{ width:'100%', height:'100%'}}>
                   <ScrollView>
                   <KeyboardAvoidingView >
                   
                  <View style= {{paddingTop:120,justifyContent:'space-between'}} > 
                      <Text style= {{fontSize:35,textAlign:'center'}}>
                           Welcome!
                           </Text>
                      <Text style ={{fontSize:25,textAlign:"center",alignSelf:'center'}}>
                          We hope you enjoy 
                      </Text>
                      <Text style ={{fontSize:25,textAlign:"center",alignSelf:'center'}}
                      >
                          the stay!
                      </Text>
                      <Text style={{borderBottomWidth:2,width:55,alignSelf:'center'}}></Text>
                      <Text style ={{fontSize:25,textAlign:"center",alignSelf:'center',padding:20}}>
                          Sign in
                      </Text>
                  </View>
                
                  {/* <View style={{paddingTop:300}} > */}
                 <View>
                  
                 <TextInput style= {styles.inputStyle}
                 placeholder = 'username'
                
                 placeholderTextColor='black'
                 onChangeText={(text)=>{this.setState({username:text})}}
                 onSubmitEditing={()=>this.passwd.current.focus()}
                  ref = {this.user}
                />
                </View>
                <View>
                <TextInput style={styles.inputStyle}
                placeholder = 'password'
                placeholderTextColor='black'
                onChangeText={(text)=>{this.setState({password:text})}}
               
                 ref= {this.passwd}
            

                          secureTextEntry= {true}  /> 
                   
                                         </View>
                 
              <View >
                  <TouchableOpacity 
                    
                    onPress={()=>this.click()}
                   >
                  <Icon 
                
                  style = {{alignSelf:'center',paddingTop:20}}
                 
        reverse
        name='rightcircle'
        type='antdesign'
        color='black'
        size={55}
     
      />
         
        
         
        

        </TouchableOpacity>
        <View style={{paddingTop:40}}>
            <View>
            <Text style= {{alignSelf:'center'}}>by signing in you are agreeing to the terms and conditions</Text>
            </View>
            <View style= {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={{borderBottomWidth:1,}} >
                    <Text style={{fontSize:15}}>Privacy policy</Text>
                  
                </TouchableOpacity>
                <Text> and </Text>
                <TouchableOpacity style={{borderBottomWidth:1}} >
                   
                    <Text style={{fontSize:15}}>Terms & Conditions</Text>
                </TouchableOpacity>
            </View>
        </View>

      
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
                </ImageBackground>
                
                
                 </View>
                 
               

         )
     }
 }
 const styles = StyleSheet.create({
     inputStyle :{
        //  borderWidth:2,
        //   borderRadius:20,
         borderColor:'black',
         borderBottomWidth: 2,
         marginLeft:20,
         marginRight:20,
         fontSize:20,
         color:'black',
         paddingTop:30
         
       

     },
     ContainerStyle:{
         flex:1,
     
        //  alignItems:'center'
      

     },
     
       

     
     

 })
 export default Login