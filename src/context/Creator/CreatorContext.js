import {createContext, useContext} from 'react'

export const CreatorContext = createContext()

export const useCreator = () => useContext(CreatorContext)