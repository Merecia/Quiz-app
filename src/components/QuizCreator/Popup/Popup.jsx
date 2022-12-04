import React, {useState} from 'react'
import style from './Popup.module.scss'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import {useCreator} from '../../../context/Creator/CreatorContext'
import {useNavigate} from 'react-router-dom'

function Popup({ handleClose }) {

    const {questionsList, isValid, question, options, correctAnswerId, currentQuestionId} = useCreator()
    const MINIMUM_TITLE_LENGTH = 4
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    function finishButtonClickHandler() {

        let questions = questionsList

        if (isValid) questions.push({
            id: currentQuestionId,
            question,
            options,
            correctAnswerId
        })

        addQuizToLocalStorage(questions)

        navigate('/');
    }

    function getPrettyDate(date) {

        let day = date.getDate()

        if (String(day).length === 1) day = '0' + day
        
        let month = date.getMonth() + 1

        if (String(month).length === 1) month = '0' + month

        let year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    function addQuizToLocalStorage(questions) {

        let id
        let quizes = JSON.parse(localStorage.getItem('quizes'))

        if (quizes) {

            if (quizes.length !== 0) {
            
                const lastId = quizes.map(quiz => quiz.id).sort().pop()
                id = lastId + 1
            }

            else {
                quizes = []
                id = 1
            }

        }
        
        else {
            quizes = []
            id = 1
        }

        let currentDate = new Date()
        let creationDate = getPrettyDate(currentDate)

        let quiz = {id,title,questions,creationDate}
        
        quizes.push(quiz)

        localStorage.setItem('quizes', JSON.stringify(quizes))
    }

    return (
        <div className={style.Popup}>

            <div className={style.Box}>

                <span className={style.CloseIcon} onClick={handleClose}> x </span>

                <div className={style.Content}>

                    <Input
                        label='Enter a name for the Quiz'
                        value = {title}
                        onChange = {event => setTitle(event.target.value)}
                    />


                    <div className={style.Button}>

                        <Button
                            isActive={title.length >= MINIMUM_TITLE_LENGTH}
                            color={'Blue'}
                            onClick = {finishButtonClickHandler}
                        >
                            Finish
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    )

}

export default Popup