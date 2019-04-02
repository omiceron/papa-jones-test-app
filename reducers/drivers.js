import {Record, OrderedMap, Seq} from 'immutable'
import {ADD, BUS, DELETE, DRIVER, SAVE} from '../constants/actions'

export const DriverRecord = Record({
  id: null,
  firstName: null,
  middleName: null,
  lastName: null,
  dateOfBirth: null,
  buses: new Seq([])
})

export const DriversReducerRecord = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false,
  error: null
})

export default (drivers = new DriversReducerRecord(), action) => {
  const {type, payload, randomId} = action

  switch (type) {
    case DRIVER + ADD:
      return drivers.setIn(['entities', randomId], new DriverRecord({...payload, id: randomId}))

    case DRIVER + DELETE:
      return drivers.deleteIn(['entities', payload.id])

    case DRIVER + SAVE:
      return drivers.mergeIn(['entities', payload.id], payload)

    case BUS + DELETE:
      return drivers.update('entities', (entities) => {
        const keys = entities.keySeq()

        return entities.withMutations(newEntities => keys
          .forEach(id => newEntities
            .updateIn([id, 'buses'], (buses) => buses
              .filter(bus => bus !== payload.id)
            )
          )
        )
      })

  }
  return drivers
}