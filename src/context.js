import React, { useContext, createContext, useReducer } from 'react'

const ContextProvider = createContext()

export const AppProvider = ({ reducer, initialState, children }) => {
  return (
    <ContextProvider.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ContextProvider.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(ContextProvider)
}
