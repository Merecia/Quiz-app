import { LOAD_QUIZ, SET_CURRENT_QUESTION, FINISH_QUIZ, START_QUIZ } from '../types'

export const QuizReducer = (state, action) => {

    switch (action.type) {

        case LOAD_QUIZ:
            return {
                ...state,
                quiz: action.quiz
            }

        case SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestionId: action.currentQuestionId
            }

        case START_QUIZ:
            return {
                ...state,
                isFinished: false
            }

        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }

        default: return state
    }

}