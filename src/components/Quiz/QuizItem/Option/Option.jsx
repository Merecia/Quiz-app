import React from 'react'
import style from './Option.module.scss'
import checkIcon from './images/check.svg'
import crossIcon from './images/cross.svg'
import {useQuiz} from '../../../../context/Quiz/QuizContext'
import {useResults} from '../../../../context/Results/ResultsContext'

function Option ( {id, letter, answer, isActive, checked, isCorrect} ) {

    const { quiz, currentQuestionId } = useQuiz()
    const { answerQuestion } = useResults()
    const currentQuestion = quiz.questions.find(question => question.id === currentQuestionId)

    function clickHandler() {

        const isCorrect = id === currentQuestion.correctAnswerId

        const answer = { questionId: currentQuestionId, answerId: id, isCorrect }

        answerQuestion(answer)

    }

    let circleColor = '#EDE8E3'
    let optionColor = '#F4F3F6'
    let textColor = '#060710'

    if (checked) {

        optionColor = '#45C486'
        textColor = '#F4F3F6'
    }

    if (isCorrect === true) {

        circleColor = '#F4F3F6'
        optionColor = '#45C486'
        textColor = '#F4F3F6'
    }

    else if (isCorrect === false) {

        optionColor = 'rgba(240, 87, 108)'
        circleColor = '#F4F3F6'
        textColor = '#F4F3F6'
    }

    function fillCircle() {

        if (checked) 
            return <span className = {style.Letter}> {letter} </span>

        else if (isCorrect === true) 
            return <img className = {style.Check} src = {checkIcon} alt = "check" />

        else if (isCorrect === false) 
            return <img className = {style.Cross} src = {crossIcon} alt = "cross"/>
        
        else 
            return <span className = {style.Letter}> {letter} </span>
    }

    return (
        <div 
            className = {style.Option} 
            onClick = {isActive ? clickHandler: null} 
            style = {{backgroundColor: optionColor}}
        >

            <div className = {style.Circle} style = {{backgroundColor: circleColor}}>

                { fillCircle() }

            </div>

            <span className = {style.Answer} style = {{color: textColor}}> {answer} </span>

        </div>
    )

}

export default Option