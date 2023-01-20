import { csrfFetch } from "./csrf"

const LOADREVIEW = "reviews/loadReviews"

//load reviews

export const loadReviews = (reviewList) => ({
    type: LOADREVIEW,
    spot: reviewList
})

export const getSpotReviews = (spotId) => async dispatch => {

    // console.log("spotId at getSpotReviews",spotId)
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    // console.log("review response",response)
    if (response.ok) {
        const reviewList = await response.json()
        // const reviewList = reviewListObj.reviewList

        // console.log("look at this spot id", spotId)
        // console.log("reviewList", reviewList)
        dispatch(loadReviews(reviewList))
    }

    // if (response.status===404){
    //     return
    // }
}


//create review
const ADD_REVIEW = "reviews/addReview"
export const createReview = (createdReview) => ({
    type: ADD_REVIEW,
    id: createdReview.id,
    createdReview

})


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
        dispatch(createReview(createdReview))

    }
}

//delete review

const DELETE_REVIEW = "reviews/deleteReview"

export const deleteReview = (id) => ({
    type: DELETE_REVIEW,
    id
})

export const deleteReviewThunk = (id) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteReview(id))
    }
}

//reset ?
// const RESET="Reviews/ResetState"
// export const actionResetState=()=>({
//     type:RESET
// })



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
        case DELETE_REVIEW:
            const deleteReviewState = { ...state }
            // console.log("look if undefined", deleteReviewState)
            delete deleteReviewState.spot[action.id]
            return deleteReviewState;
        case ADD_REVIEW:
            const newReviewState = { ...state }
            newReviewState.spot[action.id] = action.createdReview
            return newReviewState

        default:
            return state
    }

}