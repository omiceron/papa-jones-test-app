import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'
import randomId from '../middlewares/randomId'
import thunk from 'redux-thunk'
import distanceCalculator from '../middlewares/distanceCalculator'

const composeEnhancers =
  __DEV__ && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(thunk, randomId, distanceCalculator))

export const store = createStore(rootReducer, enhancer)

if (__DEV__) window.store = store