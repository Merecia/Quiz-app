import React, { useEffect, useState } from 'react'
import style from './Menu.module.scss'
import Button from '../Button/Button'
import Card from './Card/Card'
import Loader from '../Loader/Loader'
import {useMenu} from '../../context/Menu/MenuContext' 

function Menu() {

    const {quizes, updateQuizes} = useMenu()
    const [search, setSearch] = useState('')

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

        console.log('ТЕСТЫ: ')
        console.log(quizesData)

        console.log('КОЛИЧЕСТВО ТЕСТОВ: ')
        console.log(quizesData.length)

        if (quizesData) updateQuizes(quizesData)
    }

    function renderCard(quiz) {

        const isFinished = quiz.passingDate ? true : false

        if (isFinished && quiz.questions.length === quiz.correctAnswers) return <Card
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            amountQuestions={quiz.questions.length}
            passingDate={quiz.passingDate}
            correctAnswers={quiz.correctAnswers}
            perfect
        />

        else if (isFinished && quiz.questions.length !== quiz.correctAnswers) return <Card
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

        else return <Loader />

    }

    function searching() {

        const quizesData = JSON.parse(localStorage.getItem('quizes'))

        let filteredQuizes = quizesData

        if (search.length !==0) filteredQuizes = quizesData.filter(quiz =>
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

                    <input
                        type="text"
                        placeholder='Введите название теста'
                        className={style.Input}
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        onKeyPress = {searchInputKeyPressHandler}
                    />

                    <Button
                        isActive={true}
                        color={'Blue'}
                        className={style.Button}
                        onClick = {searching}
                    >
                        ПОИСК
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