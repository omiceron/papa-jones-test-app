import {ADD, BUS, DELETE, DRIVER, EDIT, FIND_DISTANCE, SAVE} from '../constants/actions'

export function addBus(bus) {
  return {
    type: BUS + ADD,
    payload: bus,
    generateId: true
  }
}

export function deleteBus(id) {
  return {
    type: BUS + DELETE,
    payload: {id}
  }
}

export function saveBus(params, id) {
  return {
    type: BUS + SAVE,
    payload: {...params, id}
  }
}

export function updateBus(key, value, id) {
  return {
    type: BUS + EDIT,
    payload: {key, value, id}
  }
}

export function findDistance(from, to) {
  return {
    type: FIND_DISTANCE,
    from,
    to,
    findDistance: true
    // payload: {id}
  }
}

export function addDriver(driver) {
  return {
    type: DRIVER + ADD,
    payload: driver,
    generateId: true
  }
}