import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import DriversScreen from '../screens/DriversScreen'
import BusesScreen from '../screens/BusesScreen'
import AddBusFormScreen from '../screens/AddBusFormScreen'
import AddDriverFormScreen from '../screens/AddDriverFormScreen'
import LinkBusToDriverFormScreen from '../screens/LinkBusToDriverScreen'
import CalculatedListScreen from '../screens/CalculatedListScreen'
import EditBusFormScreen from '../screens/EditBusFormScreen'

const renderTabBarIcon = (name) => ({tintColor, focused}) =>
  <TabBarIcon
    name = {Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`}
    focused = {focused}
  />

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  CalculatedList: CalculatedListScreen
}, {
  navigationOptions: {
    tabBarLabel: 'Navigate',
    tabBarIcon: renderTabBarIcon('navigate')
  }
})

const BusesStack = createStackNavigator({
  Buses: BusesScreen,
  AddBus: AddBusFormScreen,
  EditBus: EditBusFormScreen
}, {
  navigationOptions: {
    tabBarLabel: 'Buses',
    tabBarIcon: renderTabBarIcon('bus')
  }
})

const DriversStack = createStackNavigator({
  Drivers: DriversScreen,
  AddDriver: AddDriverFormScreen,
  LinkBuses: LinkBusToDriverFormScreen
}, {
  navigationOptions: {
    tabBarLabel: 'Drivers',
    tabBarIcon: renderTabBarIcon('people')
  }
})

export default createBottomTabNavigator({
  HomeStack,
  BusesStack,
  DriversStack
})
