import React, { useEffect, useState } from 'react'
import style from './Menu.module.scss'
import Button from '../Button/Button'
import Card from './Card/Card'
import Loader from '../Loader/Loader'
import { useMenu } from '../../context/Menu/MenuContext'
import { useNavigate } from "react-router-dom"


function Menu() {

    const { quizes, updateQuizes } = useMenu()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {

        loadDataFromStorage()

    }, [])

    useEffect(() => {

        if (search.length === 0) {

            loadDataFromStorage()
        }

    }, [search])

    function loadDataFromStorage() {

        const quizesData = JSON.parse(localStorage.getItem('quizes'))

        if (quizesData) updateQuizes(quizesData)
    }

    function renderCard(quiz) {

        const isFinished = quiz.passingDate ? true : false

        if (isFinished) return <Card
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            amountQuestions={quiz.questions.length}
            passingDate={quiz.passingDate}
            correctAnswers={quiz.correctAnswers}
        />

        else return <Card
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            amountQuestions={quiz.questions.length}
            creationDate={quiz.creationDate}
        />

    }

    const renderCards = quizes => {

        if (quizes) return quizes.map(quiz => renderCard(quiz))

        else return <div className={style.Center}> <Loader /> </div>

    }

    function searching() {

        const quizesData = JSON.parse(localStorage.getItem('quizes'))

        let filteredQuizes = quizesData

        if (search.length !== 0) filteredQuizes = quizesData.filter(quiz =>
            quiz.title.toLowerCase().startsWith(search.toLowerCase()))

        updateQuizes(filteredQuizes)
    }

    function searchInputKeyPressHandler(event) {

        if (event.key === 'Enter')
            searching()

    }

    return (
        <div className={style.Menu}>

            <header className={style.Header}>

                <div className={style.Upper}>

                    <h2 className={style.Title}> Quiz App </h2>

                </div>

                <div className={style.Search}>

                    <button
                        className={style.CircleButton}
                        onClick={() => navigate(`/create-quiz`)}>
                    </button>

                    <input
                        type="text"
                        placeholder='Enter an quiz name'
                        className={style.Input}
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        onKeyPress={searchInputKeyPressHandler}
                    />

                    <Button
                        isActive={true}
                        color={'Blue'}
                        className={style.Button}
                        onClick={searching}
                    >
                        SEARCH
                    </Button>

                </div>

            </header>

            <main className={style.Content}>

                {renderCards(quizes)}

            </main>

        </div>
    )

}

export default Menu