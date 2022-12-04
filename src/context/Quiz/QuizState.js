import React, {useReducer} from 'react'
import { LOAD_QUIZ, SET_CURRENT_QUESTION, FINISH_QUIZ, START_QUIZ } from '../types'
import {QuizContext} from './QuizContext'
import {QuizReducer} from './QuizReducer'

function QuizState( {children} ) {

    const initialState = {
        quiz: [],
        currentQuestionId: 1,
        isFinished: false
    }

    const [state, dispatch] = useReducer(QuizReducer, initialState)

    const finishQuiz = () => {

        dispatch({
            type: FINISH_QUIZ
        })

        setCurrentQuestionId(1)
    }

    const startQuiz = () => {

        dispatch({
            type: START_QUIZ
        })

        setCurrentQuestionId(1)
    }

    const loadQuiz = data => {

        dispatch({
            type: LOAD_QUIZ,
            quiz: data
        })

    }

    const setCurrentQuestionId = id => {

        dispatch({
            type: SET_CURRENT_QUESTION,
            currentQuestionId: id
        })

    }

    const toNextQuestion = () => {

        const currentId = state.currentQuestionId

        setCurrentQuestionId(currentId + 1)
    }

    const toPreviousQuestion = () => {

        const currentId = state.currentQuestionId

        setCurrentQuestionId(currentId - 1)
    }

    return (
        <QuizContext.Provider value = {{
            quiz: state.quiz, 
            currentQuestionId: state.currentQuestionId,
            isFinished: state.isFinished,
            toNextQuestion,
            toPreviousQuestion,
            finishQuiz,
            startQuiz,
            loadQuiz
        }}>

            {children}

        </QuizContext.Provider>
    )

}

export default QuizState
