import allSpots from "../data/all-spots.json"
import singleSpotData from "../data/single-spot.json"
import { csrfFetch } from './csrf';
import { useHistory } from "react-router-dom";



//homepage load all spots
const LOAD = "spots/loadSpots"
export const loadSpots = (list) => ({
    type: LOAD,
    allSpots: list
})

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots?page=1&size=20`)
    if (response.ok) {
        const listObj = await response.json()
        const list = listObj.Spots
        dispatch(loadSpots(list))
    }
}
// single page load all info
const LOADSINGLE = "singleSpot/loadSingleSpot"
export const loadSingleSpot = (detailObj) => ({
    type: LOADSINGLE,
    singleSpot: detailObj
})

export const getSingleSpot = (spotId) => async dispatch => {
    // console.log("spotId at getSingleSpot", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`)
    // console.log(response)
    if (response.ok) {
        const detailObj = await response.json()
        dispatch(loadSingleSpot(detailObj))
    }
}
// const ADD_SPOT = "spots/addSpots"
export const addSpot = (newSpot) => async dispatch => {
    let createdSpotId;
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSpot)
    });
    if (response.ok) {
        const createdSpot = await response.json()
        // console.log("createdSpot", createdSpot)
        createdSpotId = createdSpot.id
        // console.log("createdSpotId", createdSpotId)
    }

    if (createdSpotId) {

        const responseUrl = await csrfFetch(`/api/spots/${createdSpotId}/images`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSpot)
        })
        if (responseUrl.ok) {
            const createdSpotUrl = await responseUrl.json()

            return createdSpotId
        }
    }

}



//delete spot
const DELETE_SPOT = "spots/deleteSpot"
export const deleteSpot = (id) => ({
    type: DELETE_SPOT,
    id
})

export const deleteSpotThunk = (id) => async dispatch => {

    const res = await csrfFetch(`/api/spots/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteSpot(id))
        dispatch(getAllSpots())
    }


}



//update spot
const UPDATE_SPOT = "spots/updateSpot"
export const updateSingleSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

export const updateSpotThunk = (spot) => async dispatch => {
    const { id, address, city, state, country, lat, lng, name, description, price } = spot
    const res = await csrfFetch(`/api/spots/${+id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address, city, state, country, lat, lng, name, description, price
        })
    })

    if (res.ok) {
        const updatedSpot = await res.json()
        dispatch(updateSingleSpot(updatedSpot))
        dispatch(getSingleSpot(updatedSpot.id))
        return updatedSpot
    }
}






const initialState = {};

export default function spotsReducer(state = initialState, action) {
    switch (action.type) {

        case LOAD:
            const newAllSpots = {}
            action.allSpots.forEach(spot => {
                newAllSpots[spot.id] = spot
            })

            // console.log("newAllSpots", newAllSpots)
            return {
                ...state,

                allSpots: {
                    // ...state.allSpots,
                    ...newAllSpots
                }
            };
        case LOADSINGLE: {
            const newSingleState = action.singleSpot[0]

            return {
                ...state,
                singleSpot: {
                    ...state.singleSpot,
                    ...newSingleState
                }
            };
        };



        case DELETE_SPOT: {
            const deleteSpotState = { ...state }
            delete deleteSpotState.singleSpot[action.id]
            return deleteSpotState
        }

        case UPDATE_SPOT: {
            const updateSpotState = { ...state }
            updateSpotState.singleSpot[action.spot.id] = action.spot
            // console.log("look")
            // console.log("updateSpotState",updateSpotState)
            return updateSpotState
        }

        default:
            return state;


    }
}