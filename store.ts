import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { IinitialState } from './shared/types'
import { AssetsReducer } from './reducers/assets'
import { BoardReducer } from './reducers/board'

const rootReducer = combineReducers({
  AssetsReducer,
  BoardReducer
});

export const defaultInitialState: IinitialState = {
  AssetsReducer: { assets: [], loading: false, portfolio: [] },
  BoardReducer: { overlay: false },
}

export function initializeStore(initialState: IinitialState = defaultInitialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
