import React, { createContext } from 'react'
import { initialState, StateType } from '../reducers'

export const Context = createContext<{
  state: StateType
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
})
