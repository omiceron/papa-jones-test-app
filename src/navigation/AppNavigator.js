import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Main from './Main'

export default createAppContainer(createSwitchNavigator({
  Main
}))