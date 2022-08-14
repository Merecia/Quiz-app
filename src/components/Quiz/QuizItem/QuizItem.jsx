import React from 'react'
import style from './QuizItem.module.scss'
import Option from './Option/Option'
import {useResults} from '../../../context/Results/ResultsContext'

function QuizItem( {id, question, options} ) {

    const {results} = useResults()

    let answer =  results.find(item => item.questionId === id)

    function getOption (option) {

        const letters = {1: 'A', 2: 'B', 3: 'C', 4: 'D'}

        if (answer) {

            if (answer.questionId === id && answer.answerId === option.id) return <Option
                key = {option.id}
                id = {option.id}
                answer = { option.answer }
                letter = { letters[option.id] }
                checked
                isActive
            />
            
        }
        
        return <Option 
            key = {option.id}
            id = {option.id}
            answer = {option.answer}
            letter = { letters[option.id] }
            isActive
        />
    }
    
    const output = options => options.map( option => getOption(option) )

    return (
        <div className = {style.QuizItem}>

            <div className = {style.Question}>

                <h1> {question} </h1>

            </div>

            <div className = {style.Options}>

                { output(options) }

            </div>

        </div>
    )

}

export default QuizItem