import React from 'react'
import style from './App.module.scss'
import {Route, Routes} from 'react-router-dom'
import QuizPage from './pages/QuizPage/QuizPage'
import Menu from './components/Menu/Menu'
import QuizCreator from './components/QuizCreator/QuizCreator'
import { useQuiz } from './context/Quiz/QuizContext'

function App() {

    return (
        <main className={style.App}>

            <Routes>

                <Route path = '/' element = {<Menu/>} />
                <Route path = '/create-quiz' element = {<QuizCreator/>} />
                <Route path = '/quiz/:id' element = {<QuizPage/>} />

            </Routes>

        </main>
    )

}

export default App