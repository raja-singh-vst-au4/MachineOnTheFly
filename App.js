/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  // StyleSheet,
  // ScrollView,
  // View,
  // Text,
  // StatusBar,
} from 'react-native';
// import 'react-native-gesture-handler'

import MainNavigator from './Src/Components/Appnavigator'
// import  Drawer from './Src/Components/NotificationScreen'
// import { createAppContainer } from 'react-navigation';


class App extends React.Component
{
  render(){
  return (
 <SafeAreaView style = {{flex:1,color:'#fff'}}>
<MainNavigator/>

</SafeAreaView>

      
  );
}};


export default App;
