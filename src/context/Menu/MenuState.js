import React, {useReducer} from 'react'
import {MenuReducer} from './MenuReducer'
import {MenuContext} from './MenuContext'
import { UPDATE_QUIZES } from '../types'

function MenuState( {children} ) {

    const initialState = {

        quizes: null
    }

    const [state, dispatch] = useReducer(MenuReducer, initialState)

    const updateQuizes = quizes => {

        dispatch({
            type: UPDATE_QUIZES,
            quizes: quizes
        })

    }

    return (

        <MenuContext.Provider value = {{
            quizes: state.quizes,
            updateQuizes
        }}>

            {children}

        </MenuContext.Provider>

    )

}

export default MenuState