import React from 'react'
import {useResults} from '../../../context/Results/ResultsContext'
import {useQuiz} from '../../../context/Quiz/QuizContext'
import style from './ResultsItem.module.scss'
import Option from '../../Quiz/QuizItem/Option/Option'

function ResultsItem( {id, question, options} ) {

    const {results} = useResults()
    const {quiz} = useQuiz()

    const answer = results.find(item => item.questionId === id)
    const currentQuestion = quiz.questions.find(question => question.id === id)

    function getOption(option) {

        const letters = {1: 'A', 2: 'B', 3: 'C', 4: 'D'}

        if (option.id === answer.answerId) {
            
            if (answer.isCorrect) return <Option
                    key = {option.id}
                    id = {option.id}
                    answer = {option.answer}
                    isCorrect = {true}
                />

            else return <Option
                key = {option.id}
                id = {option.id}
                answer = {option.answer}
                isCorrect = {false}
            />

        } else {

            if (currentQuestion.correctAnswerId === option.id) return <Option 
                key = {option.id}
                id = {option.id}
                answer = {option.answer}
                letter = { letters[option.id] }
                checked
            />

            else return <Option
                key = {option.id}
                id = {option.id}
                answer = {option.answer}
                letter = { letters[option.id] }
            />
        }

    }

    const output = options => options.map( option => getOption(option) )

    return (
        <div>
            <div className={style.QuizItem}>

                <div className={style.Question}>

                    <h1> {question} </h1>

                </div>

                <div className={style.Options}>

                    {output(options)}

                </div>

            </div>
        </div>
    )

}

export default ResultsItem