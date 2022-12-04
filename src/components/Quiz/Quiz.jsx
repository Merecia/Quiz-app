import React, { useEffect } from 'react'
import style from './Quiz.module.scss'
import close from './images/close.svg'
import leftArrow from './images/leftArrow.svg'
import rightArrow from './images/rightArrow.svg'
import QuizItem from './QuizItem/QuizItem'
import Button from '../Button/Button'
import Progressbar from '../ProgressBar/Progressbar'
import { useResults } from '../../context/Results/ResultsContext'
import { useQuiz } from '../../context/Quiz/QuizContext'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'

function Quiz({ id }) {

    const { results } = useResults()
    const { loadQuiz, quiz, currentQuestionId, finishQuiz,
        toNextQuestion, toPreviousQuestion } = useQuiz()
    const navigate = useNavigate()

    useEffect(() => {

        const quizesData = JSON.parse(localStorage.getItem('quizes'))

        const searchedQuiz = quizesData.find(quiz => quiz.id == id)

        loadQuiz(searchedQuiz)

    }, [])

    let currentQuestion
    
    if (quiz.length !== 0) {
        currentQuestion = quiz.questions.find(question => question.id === currentQuestionId)
    }

    const isQuestionLast = () => currentQuestionId === quiz.questions.length
    const isQuestionFirst = () => currentQuestionId === 1
    const areAllQuestionsAnswered = () => results.length === quiz.questions.length
    const closeIconClickHandler = () => navigate('/')

    if (quiz.length !== 0) return (

        <div className={style.Quiz}>

            <div className={style.QuizForm}>

                <div className={style.Header}>

                    <h2 className={style.Title}> {quiz.title} </h2>

                    <button className={style.CloseButton} onClick={closeIconClickHandler}>

                        <img src={close} alt='close' className={style.CloseIcon} />

                    </button>

                </div>

                <QuizItem
                    id={currentQuestion.id}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                />

                <div className={style.Footer}>

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
                        isActive={areAllQuestionsAnswered()}
                        onClick={areAllQuestionsAnswered() ? finishQuiz : null}
                        color={'Blue'}
                        className={style.FinishButton}
                    >
                        Finish the test
                    </Button>

                </div>

            </div>

        </div>

    )

    else return <Loader />

}

export default Quiz