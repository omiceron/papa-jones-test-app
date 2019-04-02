import {Record, OrderedMap} from 'immutable'
import {ADD, BUS, DELETE, EDIT, FIND_DISTANCE, SAVE} from '../constants/actions'

export const BusRecord = Record({
  id: null,
  model: null,
  speed: null,
  year: null
})

export const BusesReducerRecord = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false,
  error: null
})

export default (buses = new BusesReducerRecord(), action) => {
  const {type, payload, randomId, distance} = action

  switch (type) {
    case BUS + ADD:
      return buses.setIn(['entities', randomId], new BusRecord({...payload, id: randomId}))

    case BUS + DELETE:
      return buses.deleteIn(['entities', payload.id])

    case BUS + EDIT:
      return buses.updateIn(['entities', payload.id, payload.key], () => payload.value)

    case BUS + SAVE:
      return buses.mergeIn(['entities', payload.id], payload)

  }
  return buses
}