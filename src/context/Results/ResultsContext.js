import {createContext, useContext} from 'react'

export const ResultsContext = createContext()

export const useResults = () => useContext(ResultsContext)