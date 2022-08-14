import React from 'react'
import style from './Progressbar.module.scss'

function Progressbar( {completed} ) {

    const settings = { width: `${completed}%` }

    return (
        <div className = {style.WholeBar}>

            <div className = {style.CompletedPart} style = {settings}>

            </div>

        </div>
    )

}

export default Progressbar