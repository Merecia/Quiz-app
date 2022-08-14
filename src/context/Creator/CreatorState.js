import React, {useReducer} from 'react'
import {CreatorContext} from './CreatorContext'
import {CreatorReducer} from './CreatorReducer'
import { TO_DEFAULT, UPDATE_CORRECT_ANSWER, UPDATE_CURRENT_QUESTION_ID, UPDATE_OPTIONS, UPDATE_QUESTION, UPDATE_QUESTIONS_LIST, UPDATE_VALID_STATUS } from '../types'

function CreatorState( {children} ) {

    const initialState = {
        questionsList: [],
        question: '',
        options: [
            {id: 1, answer: ''},
            {id: 2, answer: ''},
            {id: 3, answer: ''},
            {id: 4, answer: ''}
        ],
        correctAnswerId: 1,
        isValid: false,
        currentQuestionId: 1
    }

    const [state, dispatch] = useReducer(CreatorReducer, initialState)

    const updateOptions = options => {

        dispatch({
            type: UPDATE_OPTIONS,
            options: options
        })
        
    }

    const addQuestion = question => {

        const update = [...state.questionsList]

        update.push(question)

        updateQuestionsList(update)
    }

    const validation = () => {

        const MINIMUM_QUESTION_LENGTH = 4
        const MINIMUM_OPTION_ANSWER_LENGTH = 1

        let isValid = true

        if (state.question.length < MINIMUM_QUESTION_LENGTH) 
            isValid = false

        state.options.forEach(option => {

            if (option.answer.length < MINIMUM_OPTION_ANSWER_LENGTH) 
                isValid = false

        })

        updateValidStatus(isValid)
    }

    const updateQuestion = question => {

        dispatch({
            type: UPDATE_QUESTION,
            question: question
        })

    }

    const updateCurrentQuestionId = id => {

        dispatch({
            type: UPDATE_CURRENT_QUESTION_ID,
            currentQuestionId: id
        })

    }

    const updateQuestionsList = questionsList => {

        dispatch({
            type: UPDATE_QUESTIONS_LIST,
            questionsList: questionsList
        })

    }

    const updateCorrectAnswerId = correctAnswerId => {

        dispatch({
            type: UPDATE_CORRECT_ANSWER,
            correctAnswerId: correctAnswerId
        })

    }

    const updateValidStatus = isValid => {

        dispatch({
            type: UPDATE_VALID_STATUS,
            isValid: isValid
        })
    }

    const clearFields = () => {
        
        dispatch({
            type: TO_DEFAULT
        })

    }

    return (

        <CreatorContext.Provider value = {{
            options: state.options, question: state.question, correctAnswerId: state.correctAnswerId,
            isValid: state.isValid, questionsList: state.questionsList,
            currentQuestionId: state.currentQuestionId, updateQuestion,
            updateOptions, updateCorrectAnswerId, validation, clearFields, addQuestion,
            updateCurrentQuestionId
        }}>

            {children}

        </CreatorContext.Provider>
        
    )

}

export default CreatorState