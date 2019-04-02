import {combineReducers} from 'redux'
import buses from './buses'
import drivers from './drivers'
import distance from './distance'

export default combineReducers({
  buses,
  drivers,
  distance
})