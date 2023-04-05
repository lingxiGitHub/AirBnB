import { csrfFetch } from './csrf';

//search spot

const SEARCH_SPOTS = "spots/searchSpots"

const search = (spots) => ({
    type: SEARCH_SPOTS,
    spots
})

const RESET = "spots/reset"
export const reset = () => ({
    type: RESET
})

export const search_spots_thunk = (keyword) => async (dispatch) => {

    // console.log("at the search thunk???", keyword)
    const response = await csrfFetch(`/api/search/${keyword}`)

    if (response.ok) {
        const searchResult = await response.json()
        dispatch(search(searchResult))
        return
    }
}

const initialState = {};
export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        case SEARCH_SPOTS:
            const newState = {}
            action.spots.forEach(spot => {
                // console.log("lalala", newState)
                newState[spot.id] = spot
            })

            return newState

  
            case RESET:
                // console.log("reset??????")
                return {}


        default:
            return state;
    }
}