import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'

import TabBarIcon from './TabBarIcon'
import Home from '../screens/Home'
import Drivers from '../screens/Drivers'
import Buses from '../screens/Buses'
import BusCreator from '../screens/BusCreator'
import DriverCreator from '../screens/DriverCreator'
import BusLink from '../screens/BusLink'
import Calculated from '../screens/Calculated'
import BusEditor from '../screens/BusEditor'
import DriverEditor from '../screens/DriverEditor'

const renderTabBarIcon = (name) => ({tintColor, focused}) =>
  <TabBarIcon
    name = {Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`}
    focused = {focused}
  />

const HomeStack = createStackNavigator({
  Home,
  Calculated
}, {
  navigationOptions: {
    tabBarLabel: 'Navigate',
    tabBarIcon: renderTabBarIcon('navigate')
  }
})

const BusesStack = createStackNavigator({
  Buses,
  BusCreator,
  BusEditor
}, {
  navigationOptions: {
    tabBarLabel: 'Buses',
    tabBarIcon: renderTabBarIcon('bus')
  }
})

const DriversStack = createStackNavigator({
  Drivers,
  DriverCreator,
  DriverEditor,
  BusLink
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
