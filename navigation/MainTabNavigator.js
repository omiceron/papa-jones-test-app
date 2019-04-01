import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import DriversScreen from '../screens/DriversScreen'
import SettingsScreen from '../screens/SettingsScreen'
import BusesScreen from '../screens/BusesScreen'
import AddBusFormScreen from '../screens/AddBusFormScreen'
import AddDriverFormScreen from '../screens/AddDriverFormScreen'
import LinkBusToDriverFormScreen from '../screens/LinkBusToDriverScreen'
import CalculatedListScreen from '../screens/CalculatedListScreen'
import EditBusFormScreen from '../screens/EditBusFormScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  CalculatedList: CalculatedListScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Navigate',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused = {focused}
      name = {Platform.OS === 'ios' ? 'ios-navigate' : 'md-navigate'}
    />
  )
}

const BusesStack = createStackNavigator({
  Buses: BusesScreen,
  AddBus: AddBusFormScreen,
  EditBus: EditBusFormScreen
})

BusesStack.navigationOptions = {
  tabBarLabel: 'Buses',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused = {focused}
      name = {Platform.OS === 'ios' ? 'ios-bus' : 'md-bus'}
    />
  )
}

const DriversStack = createStackNavigator({
  Drivers: DriversScreen,
  AddDriver: AddDriverFormScreen,
  LinkBuses: LinkBusToDriverFormScreen
})

DriversStack.navigationOptions = {
  tabBarLabel: 'Drivers',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused = {focused}
      name = {Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  )
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused = {focused}
      name = {Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  BusesStack,
  DriversStack,
  SettingsStack
})
