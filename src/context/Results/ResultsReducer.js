import { UPDATE_RESULTS, CLEAR_RESULTS } from "../types"

export const ResultsReducer = (state, action) => {

    switch(action.type) {
        
        case UPDATE_RESULTS:
            return {
                results: action.results
            }

        case CLEAR_RESULTS:
            return {
                results: []
            }

        default: return state
    }

}