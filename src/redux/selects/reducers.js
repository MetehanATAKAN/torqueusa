import { selectsTypes } from "./constant";

const initialState = {
    selects : []
}


const totalSelects = (state = initialState, action) => {

    switch (action.type) {
        case selectsTypes.TOTAL_SELECTS:
            return {
                ...state,
                selects: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default totalSelects