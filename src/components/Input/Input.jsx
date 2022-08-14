import React from 'react'
import style from './Input.module.scss'

function Input( {placeholder, label, onChange, value} ) {

    return (
        <div className = {style.Input}>

            <p> {label} </p>

            <input type="text" placeholder = {placeholder} value = {value} onChange = {onChange} />

        </div>
    )

}

export default Input