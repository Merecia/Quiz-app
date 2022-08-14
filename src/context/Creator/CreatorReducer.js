import { TO_DEFAULT, UPDATE_CORRECT_ANSWER, UPDATE_CURRENT_QUESTION_ID, UPDATE_OPTIONS, 
    UPDATE_QUESTION, UPDATE_QUESTIONS_LIST, 
    UPDATE_VALID_STATUS } from "../types"

export const CreatorReducer = (state, action) => {

    switch (action.type) {

        case UPDATE_CURRENT_QUESTION_ID:
            return {
                ...state,
                currentQuestionId: action.currentQuestionId
            }

        case UPDATE_QUESTIONS_LIST:
            return {
                ...state,
                questionsList: action.questionsList
            }

        case UPDATE_CORRECT_ANSWER:
            return {
                ...state,
                correctAnswerId: action.correctAnswerId
            }

        case UPDATE_OPTIONS:
            return {
                ...state,
                options: action.options
            }

        case UPDATE_QUESTION:
            return {
                ...state,
                question: action.question
            }

        case UPDATE_VALID_STATUS:
            return {
                ...state,
                isValid: action.isValid
            }

        case TO_DEFAULT:
            return {
                ...state,
                question: '',
                options: [
                    { id: 1, answer: '' },
                    { id: 2, answer: '' },
                    { id: 3, answer: '' },
                    { id: 4, answer: '' }
                ],
                correctAnswerId: 1,
                isValid: false
            }

        default: return state
    }

}