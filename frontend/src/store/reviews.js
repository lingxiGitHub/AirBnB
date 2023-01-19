import { csrfFetch } from "./csrf"

const LOADREVIEW = "reviews/loadReviews"

export const loadReviews = (reviewList) => ({
    type: LOADREVIEW,
    spot: reviewList
})

export const getSpotReviews = (spotId) => async dispatch => {

    // console.log("spotId at getSpotReviews",spotId)
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviewList = await response.json()
        // const reviewList = reviewListObj.reviewList

        // console.log("reviewList",reviewList)
        // console.log("reviewList", reviewList)
        dispatch(loadReviews(reviewList))
    }
}

export const addReview = (newReview, spotId) => async dispatch => {
    let createdReviewId
    //do we need to pass in spotId as well?
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
    });
    if (response.ok) {
        const createdReview = await response.json()

    }
}


const initialState = {}

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case LOADREVIEW:
            const allReviews = {}
            // console.log("look",action.spot)
            action.spot.Reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return {
                ...state,
                spot: {
                    ...state.spot,
                    ...allReviews
                }
            }

        default:
            return state
    }

}