import { csrfFetch } from './csrf';

//search spot

const SEARCH_SPOTS = "spots/searchSpots"

const search = (spots) => ({
    type: SEARCH_SPOTS,
    spots
})

export const search_spots_thunk = (keyword) => async (dispatch) => {

    console.log("at the search thunk???", keyword)
    const response = await fetch(`/api/search/${keyword}`)

    if (response.ok) {
        const searchResult = await response.json()
        dispatch(search(searchResult))
    }
}

const initialState = {};
export default function searchReducer(state = initialState, action) {

    switch (action.type) {
        case SEARCH_SPOTS:
            const newState = {}
            action.spots.forEach(spot => {
                console.log("lalala", newState)
                newState[spot.id] = spot
            })

            return  newState

            



        default:
            return state;
    }
}