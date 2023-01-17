import allSpots from "../data/all-spots.json"


const LOAD = "spots/loadSpots"

export const loadSpots = (list) => ({
    type: LOAD,
    allSpots:list
})

export const getAllSpots=()=>async dispatch=>{
    const response = await fetch(`/api/spots?page=1&size=20`)
    if (response.ok){
        const listObj=await response.json()
        const list=listObj.Spots
        dispatch(loadSpots(list))
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

            console.log("newAllSpots", newAllSpots)
            return {
                ...state,

                allSpots: {
                    ...state.allSpots,
                    ...newAllSpots
                }
            }
        default:
            return state;


    }
}