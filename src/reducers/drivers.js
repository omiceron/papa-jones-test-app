import {Record, OrderedMap, Seq} from 'immutable'
import {ADD, BUS, CLEAR, DELETE, DRIVER, DRIVER_FORM, EDIT, SAVE, UPDATE} from '../constants/actions'

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
  tempEntity: new DriverRecord(),
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
      return drivers
        .mergeIn(['entities', payload.id], drivers.tempEntity)
        .set('tempEntity', new DriverRecord())

    case DRIVER_FORM + EDIT:
      return drivers.setIn(['tempEntity', payload.key], payload.value)

    case DRIVER_FORM + CLEAR:
      return drivers.set('tempEntity', new DriverRecord())

    case DRIVER_FORM + UPDATE:
      const updatedEntity = drivers.getIn(['entities', payload.id])
      return drivers.set('tempEntity', updatedEntity)

    case DRIVER_FORM + BUS + ADD:
      return drivers.updateIn(['tempEntity', 'buses'], buses => buses.concat(payload.id))

    case DRIVER_FORM + BUS + DELETE:
      return drivers.updateIn(['tempEntity', 'buses'], buses => buses.filter(bus => bus !== payload.id))

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