import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { IinitialState } from './shared/types'
import reducer from './reducers/assets/'

export const defaultInitialState = {
  assets: [],
  portfolio: [],
  loading: false
};

export function initializeStore(initialState: IinitialState = defaultInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
