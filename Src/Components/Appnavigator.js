import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Nextpage from './Nextpage';
import Login from './Login';
import Employees from './Employees'
import  Header from './Header'
import Dashboard from './Dashboard'




const MainNavigator = createStackNavigator({
    Login: {screen: Login},
    // Employees:{screen:Employees},
       //  Nextpage:{screen:Nextpage},
       Dashboard :{screen : Dashboard}
  },

  {
    defaultNavigationOptions: {
     header: null
    }},
  
  );
  
//   const Navigate = createAppContainer(MainNavigator);
//   export default Navigate
  
  export default createAppContainer(MainNavigator);;