import {ADD, BUS, DELETE, FIND_DISTANCE} from '../constants/actions'

export default (distanceStore = null, action) => {
  const {type, distance} = action

  switch (type) {
    case FIND_DISTANCE:
      console.log(distance)
      return distanceStore
  }
  return distanceStore
}