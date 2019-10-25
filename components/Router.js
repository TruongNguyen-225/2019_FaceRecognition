import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  DrawerNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import HomeScreen from './HomeScreen';
import Detail_Class from './Class/Detail_Class';
import SearchScreen from './Search/SearchScreen';
import CreateClass from './Class/CreateClass';
import ListClass from './Class/ListClass';
import FollowClass from './Class/FollowClass';
import Attendance from './Class/Attendance';
import Tittle from './global/Tittle';
import Screen_Handle from './Class/Attendance_handle/Screen_Handle';
import Camera from './Class/Attendance_handle/Camera';

import LogIn from './About/HandleAuthentication/LogIn';
import SignUp from './About/HandleAuthentication/SignUp';
import Main from './About/HandleAuthentication/Main';
import Loading from './About/HandleAuthentication/Loading';
import Authentication from './About/HandleAuthentication/Authentication';

import Update_Info from './About/Update/Update_Info';

export const AUTHEN = createStackNavigator (
  {

    LogIn,
    SignUp,
    Authentication,
    Update_Info,
  },
  {
    initialRouteName: 'Authentication',
  }
);

export const StackLoading = createSwitchNavigator ({
  Loading: Loading,
  AUTHEN: AUTHEN,
  Main: Main
  
},
{
  initialRouteName: 'Loading',
}
);
export const RootStack = createStackNavigator (
  {
    HOME: HomeScreen,
    CLASS_DETAILS: Detail_Class,
    CREATE_CLASS: CreateClass,
    LIST_CLASS: ListClass,
    FOLLOW_CLASS: FollowClass,
    ATTENDANCE: Attendance,
    TITTLE: Tittle,
    HANDLE: Screen_Handle,
    CAMERA: Camera,
    SEARCH: SearchScreen,
    AUTHEN,
  },
  {
    initialRouteName: 'HOME',
  }
);
export const Tabbar = createBottomTabNavigator (
  {
    HOME: {
      screen: RootStack,
      navigationOptions: {
        tabBarLabel: 'HOME',
        // tabBarIcon: ({focused, tintColor}) => (
        //   <Icon name="airbnb" size={focused ? 25 : 20} color={tintColor} />
        // ),
      },
    },
    SEARCH: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarLabel: 'SEARCH',
        // tabBarIcon: ({focused, tintColor}) => (
        //   <Icon name="search" size={focused ? 25 : 20} color={tintColor} />
        // ),
      },
    },
    ABOUT: {
      screen: StackLoading,
      navigationOptions: {
        tabBarLabel: 'ABOUT',
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      style: {
        backgroundColor: '#e8eaf6',
        alignItems: 'center',
      },
      activeTintColor: 'tomato',
      inactiveTintColor: 'black',
    },
  }
);

export const AppContainer = createAppContainer (Tabbar);
