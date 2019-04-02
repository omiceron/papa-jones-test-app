import {Record, OrderedMap} from 'immutable'
import {ADD, BUS, BUS_FORM, CLEAR, DELETE, EDIT, FIND_DISTANCE, SAVE, UPDATE} from '../constants/actions'

export const BusRecord = Record({
  id: null,
  model: null,
  speed: null,
  year: null
})

export const BusesReducerRecord = Record({
  entities: new OrderedMap({}),
  tempEntity: new BusRecord(),
  loading: false,
  loaded: false,
  error: null
})

export default (buses = new BusesReducerRecord(), action) => {
  const {type, payload, randomId, distance} = action

  switch (type) {
    case BUS + ADD:
      return buses
        .setIn(['entities', randomId], new BusRecord({...payload, id: randomId}))
        .set('tempEntity', new BusRecord())

    case BUS + DELETE:
      return buses.deleteIn(['entities', payload.id])

    case BUS + EDIT:
      return buses.updateIn(['tempEntity', payload.key], () => payload.value)

    case BUS + SAVE:
      return buses
        .mergeIn(['entities', payload.id], payload)
        .set('tempEntity', new BusRecord())

    case BUS_FORM + CLEAR:
      return buses
        .set('tempEntity', new BusRecord())

    case BUS_FORM + UPDATE:
      const updatedEntity = buses.getIn(['entities', payload.id])
      return buses
        .set('tempEntity', updatedEntity)

  }
  return buses
}