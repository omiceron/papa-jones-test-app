import {ADD, BUS, DELETE, END, FAILED, FIND_DISTANCE, START, SUCCESS} from '../constants/actions'
import {Record} from 'immutable'

export const DistanceReducerRecord = Record({
  distance: null,
  from: null,
  to: null,
  loading: false,
  loaded: false,
  error: null
})

export default (distanceStore = new DistanceReducerRecord(), action) => {
  const {type, distance, payload, error} = action

  switch (type) {
    case FIND_DISTANCE + END + FAILED:
      console.log(error)
      return distanceStore
        .set('error', error)
        .set('loading', false)

    case FIND_DISTANCE + END + SUCCESS:
      const newStore = distanceStore
        .set('distance', distance)
        .set('from', payload.from)
        .set('to', payload.to)
        .set('error', null)
        .set('loading', false)
      console.log(newStore)
      return newStore

    case FIND_DISTANCE + START:
      return distanceStore
        .set('loading', true)

  }
  return distanceStore
}