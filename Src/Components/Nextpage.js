import React, { Component } from 'react'
import { Text, View ,Button} from 'react-native'
import Employees from './Employees'
 class Nextpage extends Component {
     state = {album:[]}

      componentWillMount()
      {
          fetch ('https://dummy.restapiexample.com/api/v1/employees',  
          {
              method: 'GET'
          } )
       
        
          .then((response) => response.json())
          .then((responseJson) => {
           
             this.setState({
                album: responseJson
             })
          })
          .catch((error) => {
             console.error(error);
          });
       
        
        }
        datalist()
      {
         return this.state.album.map((details)=>{
              return <Employees  key ={details.id} edetail= {details} />
        // return <View><Text>{details.id}</Text></View>
          })
      }


    render() {
        console.log(this.state.album)
        return (
           <>
           
           {this.datalist()}
           <Text>sdasdc</Text>
         
           </>
        )
    }
}

export default Nextpage
