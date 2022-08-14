import React from 'react'
import style from './Select.module.scss'

function Select ( {label, value, onChange, options} ) {

    const htmlFor = `${label} - ${Math.random()}`

    function renderOption(option) {

        return (
            <option
                value = {option.value}
                key = {option.value}
            >
                {option.text}
            </option>
        )

    }

    const renderOptions = options => options.map( option => renderOption(option) )
    
    return (
        <div className = {style.Select}>

            <label htmlFor=""> {label} </label>

            <select
                id = {htmlFor}
                value = {value}
                onChange = {onChange}
            >

                {renderOptions(options)}

            </select>

        </div>
    )

}

export default Select