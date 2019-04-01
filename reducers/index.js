import {combineReducers} from 'redux'
import buses from './buses'
import drivers from './drivers'

export default combineReducers({
  buses,
  drivers
})