import React from 'react'
import style from './Card.module.scss'
import Button from '../../Button/Button'
import {useNavigate} from 'react-router-dom'
import {useMenu} from '../../../context/Menu/MenuContext'

function Card({ title, id, amountQuestions, creationDate, passingDate, correctAnswers, perfect}) {

    const isFinished = passingDate ? true : false
    const percentCorrectAnswers = Math.round(correctAnswers / amountQuestions * 100)
    const navigate = useNavigate()
    const startQuizButtonClickHandler = () => navigate('/quiz/' + id)
    const {updateQuizes} = useMenu()

    function getClasses() {

        let classes = []

        classes.push(style.Card)

        if (perfect) classes.push(style.Perfect)

        return classes.join(' ')

    }

    function deleteIconClickHandler() {

        let quizes = JSON.parse(localStorage.getItem('quizes'))

        quizes = quizes.filter(quiz => quiz.id !== id).map((quiz, index) => {

            quiz.id = index + 1

            return quiz
        })

        localStorage.setItem('quizes', JSON.stringify(quizes))

        updateQuizes(quizes)
    }

    return (

        <div className={getClasses()}>

            <div className = {style.CloseIcon}>

                <span onClick = {deleteIconClickHandler}> x </span>

            </div>

            <div className={style.Top}>

                <h1 className={style.Title}> {title} </h1>

                <p className={style.NumberQuestions}> Number of questions: {amountQuestions} </p>

            </div>

            <div className={style.Bottom}>

                <hr />

                {
                    isFinished 
                    ? <>
                        <p> You have already taken this quiz </p>
                        <p> Date the quiz was taken: {passingDate} </p>
                        <p> Number of points earned: {correctAnswers}/{amountQuestions}
                        &nbsp;({percentCorrectAnswers}%) </p>
                    </>

                    : <>
                        <p> You haven't taken this quiz yet </p>
                        <p> Date of quiz creation: {creationDate} </p>
                    </>
                }

            </div>

            <Button 
                className={style.StartButton} 
                color={'Purple'} 
                isActive={true} 
                onClick = {startQuizButtonClickHandler}
            >
                Take the quiz
            </Button>

        </div>

    )
}

export default Card