import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'

 class Screen4 extends Component {
   
        render() {  
            return (  
                <View style={styles.container}>  
                    <Text>Cart Screen</Text>  
                </View>  
            );  
        }  
    } 
    const styles = StyleSheet.create({  
        container: {  
            flex: 1,  
            justifyContent: 'center',  
            alignItems: 'center'  
        },  
    });  
    export default Screen4
