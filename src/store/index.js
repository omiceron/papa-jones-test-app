import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers/index'
import randomId from '../middlewares/randomId'
import thunk from 'redux-thunk'
import distanceCalculator from '../middlewares/distanceCalculator'

import {BusesReducerRecord, BusRecord} from '../reducers/buses'
import {DriverRecord, DriversReducerRecord} from '../reducers/drivers'
import immutableTransform from 'redux-persist-transform-immutable'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  transforms: [immutableTransform({
    records: [
      BusesReducerRecord,
      BusRecord,
      DriverRecord,
      DriversReducerRecord,
    ]
  })],
  key: 'store',
  storage,
}

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers =
  __DEV__ && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(thunk, randomId, distanceCalculator))

export const store = createStore(persistedRootReducer, enhancer)
export const persistor = persistStore(store)

if (__DEV__) window.store = store