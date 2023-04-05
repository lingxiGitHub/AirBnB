
import { csrfFetch } from "./csrf"
// import { useHistory } from "react-router-dom"

//load bookings
const LOADBOOKING = "bookings/loadBookings"

export const loadBookings = (bookingList) => ({
    type: LOADBOOKING,
    booking: bookingList
})

const LOADUSERBOOKING = "bookings/loadUserBookings"

export const loadUserBookings = (userBooking) => ({
    type: LOADUSERBOOKING,
    userBooking: userBooking
})

export const getAllBookings = (spotId) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (response.ok) {
        const bookingList = await response.json()
        dispatch(loadBookings(bookingList))
    } else {
        console.log("get all booking store wrong")
    }
}

export const getUserBookings = () => async dispatch => {

    const userResponse = await csrfFetch(`/api/bookings/current`)

    if (userResponse.ok) {
        const userBooking = await userResponse.json()
        dispatch(loadUserBookings(userBooking))
    }

}


//add a booking
const ADD_BOOKING = "bookings/addBooking"

export const createBooking = (createdBooking) => ({
    type: ADD_BOOKING,
    booking: createdBooking,
    id: createdBooking.id
})

export const addBookingThunk = (newBooking, spotId) => async dispatch => {
    // const history = useHistory()
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBooking)
    }
    )

    if (response.ok) {
        // console.log("yes booking success", response)
        const createdBooking = await response.json()
        await dispatch(createBooking(createdBooking))
        // history.push(`/success`)

    } else {
        console.log("adding fail at store")
    }

    //  return response
}


//edit a booking
const UPDATE_BOOKING = "bookings/updateBooking"

export const updateBooking = (updatedBooking) => ({
    type: UPDATE_BOOKING,
    updatedBooking
})

export const updateBookingThunk = (booking, bookingId) => async dispatch => {
    const { startDate, endDate } = booking
    // console.log("here????")
    const res = await csrfFetch(`/api/bookings/${+bookingId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            startDate, endDate
        })
    })

    if (res.ok) {
        const updatedBooking = await res.json()
        await dispatch(updateBooking(updatedBooking))
        dispatch(getUserBookings())
    } else {
        console.log("update thunk failed")
    }

}

// delete a booking

const DELETE_BOOKING = "bookings/deleteBooking"

export const deleteBooking = (id) => ({
    type: DELETE_BOOKING,
    id
})

export const deleteBookingThunk = (id) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteBooking(id))
    }
}



//reducer
const initialState = {}
export default function bookingReducer(state = initialState, action) {

    // console.log("here????")
    switch (action.type) {

        case LOADBOOKING:
            const allBookings = {}
            const bookingsArray = action.booking.Bookings

            bookingsArray.forEach(booking => {
                allBookings[booking.id] = booking
            })



            return {
                ...state,
                spot: {
                    ...state.booking,
                    ...allBookings
                }
            }



        case LOADUSERBOOKING:
            const allUserBooking = {}

            const userBookingArray = action.userBooking.Bookings

            userBookingArray.forEach(booking => {
                allUserBooking[booking.id] = booking
            })

            return {
                ...state,
                user: {
                    ...state.booking,
                    ...allUserBooking
                }
            }


        case ADD_BOOKING:
            const newBookingState = { ...state }
            // console.log("AAAAAA",newBookingState)
            newBookingState[action.id] = action.booking
            return newBookingState

        case UPDATE_BOOKING: {
            const updatedBookingState = { ...state }
            // console.log("looook", updatedBookingState)
            updatedBookingState.user[action.updatedBooking.id] = action.updatedBooking
            return updatedBookingState
        }

        case DELETE_BOOKING: {
            const deleteBookingState = { ...state }
            // console.log("heyyy", deleteBookingState)
            delete deleteBookingState.user[action.id]
            return deleteBookingState;
        }


        default:
            return state

    }

}