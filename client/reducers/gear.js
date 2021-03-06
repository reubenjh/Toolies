const initialState = {
    gear: [],
    isFetching: true,
    isSaving: false
}

export default function gear(state = initialState, action) {
    switch (action.type) {
        case 'GEAR_REQUEST':
            return {
                ...state,
                isFetching: action.isFetching,
                isSaving: action.isSaving
            }
        case 'SET_GEAR':
            return {
                ...state,
                gear: action.gear,
                isFetching: action.isFetching,
                isSaving: action.isSaving
            }
        case 'GEAR_ERROR':
            return {
                ...state,
                isFetching: action.isFetching,
                isSaving: action.isSaving,
                errorMessage: action.message
            }
        case 'REQUEST_GEAR_SAVE':
            return {
                ...state,
                isFetching: action.isFetching,
                isSaving: action.isSaving
            }
        case 'GEAR_ADD':
            let newGearArr = [...state.gear, action.item]
            return {
                ...state,
                gear: newGearArr,
                isFetching: false,
                isSaving: false
            }
        case 'EDIT_REQUEST':
            return {
                ...state,
                isFetching: action.isFetching,
                isSaving: action.isSaving
            }
        case 'EDIT_GEAR':
            const newItem = Object.assign(
                {}, 
                state.gear.find(item => item.id == action.item.id), 
                action.item
            ) 
            return {
                ...state,
                gear: [...state.gear.filter(item => item.id != action.item.id), newItem],
                isFetching: false,
                isSaving: false
            }
        default:
            return state
    }
}