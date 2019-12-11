import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator  } from 'react-navigation-drawer';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Grid from './Grid';
import Modal from './Modal';
import Testing from './Testing';
import Testing1 from './Testing1';
import SideMenu from './SideMenu';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import LiveDetails from './screens/LiveDetails';
import HistoryReplay from './screens/HistoryReplay';
import AlertManagement from './screens/AlertManagement';
import AlertSettings from './screens/AlertSettings';
import TripDetails from './screens/TripDetails';
import TripReport from './screens/TripReport';
import HistoryReport from './screens/HistoryReport';
import LiveLocation from './screens/LiveLocation';
import Alerts from './screens/Alerts';
import HistoryLocation from './screens/HistoryLocation';
import CodeRed from './screens/CodeRed';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';


const stack = createStackNavigator({
    // modal: { screen: Modal },
    // testing1: { screen: Testing1 },
    login: { screen: Login },
    historyLocation: { screen: HistoryLocation },
    testing: { screen: Testing },
    grid: { screen: Grid },
    dashboard: { screen: Dashboard },
    liveDetails: { screen: LiveDetails },
    liveLocation: { screen: LiveLocation },
    historyReplay: { screen: HistoryReplay },
    alertManagement: { screen: AlertManagement },
    alertSettings: { screen: AlertSettings },
    alerts: { screen: Alerts },
    tripDetails: { screen: TripDetails },
    tripReport: { screen: TripReport },
    historyReport: { screen: HistoryReport },
    codeRed: { screen: CodeRed },
});


const AppNavigator = createDrawerNavigator({
    Home: {
        screen: stack
    },
},
{
    // initialRouteName: 'login',
    contentComponent: SideMenu
}
);

export default createAppContainer(AppNavigator);
