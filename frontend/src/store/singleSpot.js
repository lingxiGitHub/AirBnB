import singleSpotData from "../data/single-spot.json"


const LOAD = "singleSpot/loadSingleSpot"

export const loadSingleSpot = () => ({
    type: LOAD,
    singleSpotData
})







const initialState = {}

export default function singleSpotReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD: {
            const newState = { ...state, ...action.singleSpotData[0] }

            return newState
        }
        default:

            return state;

    }
}
