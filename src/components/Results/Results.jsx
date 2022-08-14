import React from 'react'
import style from './Results.module.scss'
import close from './images/close.svg'
import Button from '../Button/Button'
import Progressbar from '../ProgressBar/Progressbar'
import ResultsItem from './ResultsItem/ResultsItem'
import { useQuiz } from '../../context/Quiz/QuizContext'
import { useResults } from '../../context/Results/ResultsContext'
import leftArrow from './images/leftArrow.svg'
import rightArrow from './images/rightArrow.svg'
import { useNavigate } from 'react-router-dom'

function Results() {

    const { quiz, currentQuestionId, toNextQuestion, toPreviousQuestion, startQuiz } = useQuiz()
    const { results, clearResults } = useResults()
    const navigate = useNavigate()

    const currentQuestion = quiz.questions.find(question => question.id === currentQuestionId)

    const countCorrectAnswers = () => results.filter(answer => answer.isCorrect).length
    const isQuestionLast = () => currentQuestionId === quiz.questions.length
    const isQuestionFirst = () => currentQuestionId === 1

    const correctAnswers = countCorrectAnswers()
    const amountQuestions = quiz.questions.length
    const percentCorrectAnswers = Math.round(correctAnswers / amountQuestions * 100)

    function retry() {

        clearResults()

        startQuiz()
    }

    function getPrettyDate(date) {

        let day = date.getDate()

        if (String(day).length === 1) day = '0' + day

        let month = date.getMonth() + 1

        if (String(month).length === 1) month = '0' + month

        let year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    function finish() {

        retry()

        const quizesData = JSON.parse(localStorage.getItem('quizes'))

        let currentDate = new Date()

        quizesData[quiz.id - 1].passingDate = getPrettyDate(currentDate)

        quizesData[quiz.id - 1].correctAnswers = correctAnswers

        localStorage.setItem('quizes', JSON.stringify(quizesData))

        navigate('/')
    }

    return (
        <div className={style.Results}>

            <div className={style.ResultsForm}>

                <div className={style.Header}>

                    <h2 className={style.Grade}>

                        Оценка: {correctAnswers} из {amountQuestions} ({percentCorrectAnswers}%)

                    </h2>

                    <h2 className={style.Title}> Результаты теста </h2>

                    <button className={style.CloseButton} onClick={finish}>

                        <img src={close} alt='close' className={style.CloseIcon} />

                    </button>

                </div>

                <ResultsItem
                    id={currentQuestion.id}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                />

                <div className={style.Footer}>

                    <Button
                        color={'Purple'}
                        isActive={true}
                        onClick={retry}
                    >
                        Пройти ещё раз
                    </Button>

                    <div className={style.Center}>

                        <img
                            src={leftArrow}
                            alt='leftArrow'
                            className={style.LeftArrow}
                            onClick={!isQuestionFirst() ? toPreviousQuestion : null}
                        />

                        <div className={style.Progress}>

                            <Progressbar completed={currentQuestionId / quiz.questions.length * 100} />

                            <span className={style.Counter}>

                                {currentQuestionId} / {quiz.questions.length}

                            </span>

                        </div>

                        <img
                            src={rightArrow}
                            alt='rightArrow'
                            className={style.RightArrow}
                            onClick={!isQuestionLast() ? toNextQuestion : null}
                        />

                    </div>

                    <Button
                        color={'Blue'}
                        isActive={true}
                        onClick={finish}
                    >
                        В главное меню
                    </Button>

                </div>

            </div>
        </div>

    )

}

export default Results