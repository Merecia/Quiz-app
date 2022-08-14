import React, {useReducer} from 'react'
import { UPDATE_RESULTS, CLEAR_RESULTS } from '../types'
import { ResultsContext } from './ResultsContext'
import { ResultsReducer } from './ResultsReducer'

function ResultsState( {children} ) {

    const initialState = {
        results: []
    }

    const [state, dispatch] = useReducer(ResultsReducer, initialState)

    const updateResults = results => {

        dispatch({
            type: UPDATE_RESULTS,
            results: results
        })

    }

    const clearResults = () => {

        dispatch({
            type: CLEAR_RESULTS
        })

    }

    const answerQuestion = ({questionId, answerId, isCorrect}) => {

        const results = state.results

        if ( results.find(item => item.questionId === questionId) ) {

            const question = results.find(item => item.questionId === questionId)

            question.answerId = answerId
            
            question.isCorrect = isCorrect
        }

        else results.push({questionId, answerId, isCorrect})

        updateResults(results)
    }

    return(
        <ResultsContext.Provider 
            value = {{
                isFinished: state.isFinished, 
                results: state.results,
                answerQuestion,
                clearResults
            }}
        >

            {children}

        </ResultsContext.Provider>
    )

}

export default ResultsState