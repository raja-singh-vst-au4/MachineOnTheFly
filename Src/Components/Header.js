import React from 'react'
import { View,StyleSheet} from 'react-native'
import { Header} from 'react-native-elements';


const Header1= () => {
    return (
       <View>
    <Header
  leftComponent={{ color: '#fff' }}
  centerComponent={{ text: 'Dashboard', style: { color: '#fff' } }}
  rightComponent={{ icon: 'logout',type :'antdesign', color: '#fff' }}
/>
       </View>
    )
}   



export default Header1
