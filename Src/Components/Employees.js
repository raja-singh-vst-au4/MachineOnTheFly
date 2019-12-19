import React from 'react'
import { View, Text } from 'react-native'


const Employees = ({edetail}) => {
 
    const {id} = edetail
    console.log(id)
    return (
        <View style ={{flex:1,backgroundColor:'red'}}>
            <View >
    <Text>jui</Text>
         </View>
        </View>
    )
}

export default Employees
