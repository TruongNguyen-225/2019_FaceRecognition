import React, { Component } from 'react';
import {Dimensions, Image} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator
} from 'react-navigation';

import loginComponent from 'PhanAnh/subComponent/Login';
import homeComponent from 'PhanAnh/subComponent/Home';
import infoAccountComponent from 'PhanAnh/miniComponent/infoAccount';
import designComponent from 'PhanAnh/subComponent/Design';
import {Login, Home, Info, Design, AuthLoading} from 'PhanAnh/subComponent/screenName';
import AuthLoadingScreen from 'PhanAnh/miniComponent/LoadingScreen';

const AuthStack = createStackNavigator({ Login: loginComponent,Design: designComponent }, { headerMode: 'none' });
const HomeStack = createStackNavigator({ 
    Home: homeComponent, 
    Info: infoAccountComponent,  
}, 
    { headerMode: 'none' });
const SwithNav = createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            Auth: AuthStack,
            App: HomeStack
        },
        {
            initialRouteName: AuthLoading
        }
    );
export default Run = createAppContainer( SwithNav );