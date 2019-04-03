import {
  ADD, BUS, BUS_FORM, CLEAR, DELETE, DRIVER, DRIVER_FORM, EDIT, FIND_DISTANCE, SAVE,
  UPDATE
} from '../constants/actions'

export function deleteBus(id) {
  return {
    type: BUS + DELETE,
    payload: {id}
  }
}

export function saveBus(id) {
  return (dispatch, getState) => {
    dispatch({
      type: BUS + SAVE,
      payload: {id}
    })
  }
}

export function updateBus(key, value) {
  return {
    type: BUS + EDIT,
    payload: {key, value}
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

export function clearBusForm() {
  return {
    type: BUS_FORM + CLEAR
  }
}

export function addBus() {
  return (dispatch, getState) => {
    dispatch({
      type: BUS + ADD,
      generateId: true
    })
  }
}

export function findDistance(from, to) {
  return (dispatch) => dispatch({
    type: FIND_DISTANCE,
    findDistance: true,
    payload: {from, to}
  })
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

export function saveDriver(id) {
  return {
    type: DRIVER + SAVE,
    payload: {id}
  }
}

export function updateDriverForm(id) {
  return (dispatch) => {
    if (!id) return

    dispatch({
      type: DRIVER_FORM + UPDATE,
      payload: {id}
    })
  }
}

export function updateDriver(key, value) {
  return {
    type: DRIVER_FORM + EDIT,
    payload: {key, value}
  }
}

export function toggleBus(id, value) {
  return {
    type: DRIVER_FORM + BUS + (value ? ADD : DELETE),
    payload: {id}
  }
}

export function clearDriverForm() {
  return {
    type: DRIVER_FORM + CLEAR
  }
}