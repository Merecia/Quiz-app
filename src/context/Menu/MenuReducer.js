import { UPDATE_QUIZES } from "../types";


export const MenuReducer = (state, action) => {

    switch(action.type) {

        case UPDATE_QUIZES:
            return {
                quizes: action.quizes
            }
        
        default: return state

    }

}