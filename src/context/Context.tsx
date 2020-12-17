import React, { createContext } from 'react'
import { initialState, StateType } from '../reducers'

export const StateContext = createContext<StateType>(initialState)
export const DispatchContext = createContext<React.Dispatch<any>>(() => null)
