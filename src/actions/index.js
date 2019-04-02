import {ADD, BUS, BUS_FORM, CLEAR, DELETE, DRIVER, EDIT, FIND_DISTANCE, SAVE, UPDATE} from '../constants/actions'

export function deleteBus(id) {
  return {
    type: BUS + DELETE,
    payload: {id}
  }
}

export function clearBusForm() {
  return {
    type: BUS_FORM + CLEAR
  }
}

export function saveBus(id) {
  return (dispatch, getState) => {
    const payload = getState().buses.tempEntity.toObject()

    dispatch({
      type: BUS + SAVE,
      payload: {...payload, id}
    })
  }
}

export function updateBus(key, value) {
  return {
    type: BUS + EDIT,
    payload: {key, value}
  }
}

export function findDistance(from, to) {
  return (dispatch) => dispatch({
    type: FIND_DISTANCE,
    findDistance: true,
    payload: {from, to}
  })
}

export function addBus() {
  return (dispatch, getState) => {
    const payload = getState().buses.tempEntity.toObject()

    dispatch({
      type: BUS + ADD,
      payload,
      generateId: true
    })
  }
}

export function addDriver(driver) {
  return {
    type: DRIVER + ADD,
    payload: driver,
    generateId: true
  }
}

export function deleteDriver(id) {
  return {
    type: DRIVER + DELETE,
    payload: {id}
  }
}

export function saveDriver(params, id) {
  return {
    type: DRIVER + SAVE,
    payload: {...params, id}
  }
}

export function updateBusForm(id) {
  return (dispatch) => {
    if (!id) return

    dispatch({
      type: BUS_FORM + UPDATE,
      payload: {id}
    })
  }
}