import React from 'react'
import {useParams} from 'react-router-dom'
import {useQuiz} from '../../context/Quiz/QuizContext'
import Quiz from '../../components/Quiz/Quiz'
import Results from '../../components/Results/Results'

function QuizPage() {

    const {isFinished} = useQuiz()
    const id = useParams().id

    return (

        <div>
            
            { isFinished ? <Results /> : <Quiz id = {id}/>}

        </div>
    )

}

export default QuizPage