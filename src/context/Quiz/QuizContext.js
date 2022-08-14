import {createContext, useContext} from 'react'

export const QuizContext = createContext()

export const useQuiz = () => useContext(QuizContext)