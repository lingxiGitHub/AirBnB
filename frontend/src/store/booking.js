
import { csrfFetch } from "./csrf"

//load bookings
const LOADBOOKING = "bookings/loadBookings"

export const loadBookings = (bookingList) => ({
    type: LOADBOOKING,
    booking: bookingList
})

export const getAllBookings = (spotId) => async dispatch => {

    const response = await fetch(`/api/spots/${spotId}/bookings`)

    if (response.ok) {
        const bookingList = await response.json()
        dispatch(loadBookings(bookingList))
    } else {
        console.log("get all booking store wrong")
    }
}



//add a booking
const ADD_BOOKING = "bookings/addBooking"

export const createBooking = (createdBooking) => ({
    type: ADD_BOOKING,
    booking:createdBooking,
    id:createdBooking.id
})

export const addBookingThunk = (newBooking, spotId) => async dispatch => {
console.log("am i adding?")
console.log(newBooking)
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBooking)
    }
    )

    if (response.ok) {
        console.log("yes booking success",response)
        const createdBooking = await response.json()
        dispatch(createBooking(createdBooking))
    }else{
        console.log("adding fail at store")
    }


}


//reducer
const initialState = {}
export default function bookingReducer(state = initialState, action) {

    // console.log("here????")
    switch (action.type) {

        case LOADBOOKING:
            const allBookings = []


            action.booking.Bookings.forEach(booking => {
                // console.log("!!!",booking)
                allBookings[booking.id] = booking
            })

            // console.log("loooooook", allBookings)

            return {
                ...state,
                spot: {
                    ...state.booking,
                    ...allBookings
                }
            }

        case ADD_BOOKING:
            const newBookingState={...state}
            console.log("AAAAAA",newBookingState)
            newBookingState.spot[action.id]=action.booking
        default:
            return state

    }

}