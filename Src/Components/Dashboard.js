import React from 'react';  
import { View,} from 'react-native';  
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  
import Screen2 from './Machineinfo';
import Home from './home';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Machineinfo from './Machineinfo';
const Dashboard = createMaterialBottomTabNavigator(  
    {  
        Home: { screen:Home,  
            navigationOptions:{  
                tabBarLabel:'DashBoard',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>  
                    </View>),  
            }  
        },  
        Profile: { screen:Machineinfo,  
            navigationOptions:{  
                tabBarLabel:'MachineInfo',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-desktop'}/>  
                    </View>),  
                activeColor: 'green',  
                // inactiveColor: '#f65a22',  
                barStyle: { backgroundColor: '#000' },  
            }  
        },  
        
    },  
    {  
      initialRouteName: "Home",  
      activeColor: 'green',  
    //   inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#000' },  
    },  
);  
  
export default createAppContainer(Dashboard);  