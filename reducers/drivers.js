import {Record, OrderedMap, Seq} from 'immutable'
import {ADD, BUS, DELETE, DRIVER} from '../constants/actions'

export const DriverRecord = Record({
  id: null,
  firstName: null,
  middleName: null,
  lastName: null,
  dateOfBirth: null,
  buses: new Seq([])
})

const DriversReducerRecord = Record({
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