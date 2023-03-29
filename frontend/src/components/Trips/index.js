import "./Trips.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteBookingThunk, getUserBookings } from "../../store/booking";
import EditBooking from "../EditBooking"
import OpenModalButton from "../OpenModalButton";

function changeDateFormat(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: 'short'
    });

    return formattedDate

}

export default function Trips() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserBookings());
        setIsLoaded(true)
    }, [dispatch])

    const allUserBookingObj = useSelector((state) => {
        return state.bookings.user
    })

    const allUserBooking = allUserBookingObj ? Object.values(allUserBookingObj) : []

    const today = new Date()


    return (isLoaded && (

        <>
            <div className="user-bookings">

                <div className="past-trip-section">
                    <h2>Where you've been</h2>
                    {allUserBooking.map(booking => {

                        return (

                            <div>

                                {new Date(booking.endDate) < today && (
                                    <div className="single-booking past-trips">

                                        <img className="indi-booking-img" src={booking.Spot.previewImage} alt=""></img>
                                        <div>{booking.Spot.name}</div>
                                        <div>Hosted by {booking.Spot.Owner.firstName} {booking.Spot.Owner.lastName}</div>

                                        <div>{changeDateFormat(booking.startDate)} - {changeDateFormat(booking.endDate)}</div>

                                    </div>
                                )}


                            </div>




                        )
                    }

                    )}

                </div>


                <div className="upcoming-trips-section">

                    <h2>Upcoming trips</h2>

                    {allUserBooking.map(booking => {

                        // console.log("^^^^", booking)
                        return (
                            <div>

                                {new Date(booking.endDate) >= today && (
                                    <div className="upcoming single-booking">

                                        <img className="indi-booking-img" src={booking.Spot.previewImage} alt=""></img>
                                        <div>{booking.Spot.name}</div>
                                        <div>Hosted by {booking.Spot.Owner.firstName} {booking.Spot.Owner.lastName}</div>

                                        <div>{changeDateFormat(booking.startDate)} - {changeDateFormat(booking.endDate)}</div>
                             

                                        <OpenModalButton
                                            buttonText="Edit"
                                            modalComponent={<EditBooking booking={booking} />}
                                        />

                                        <button
                                            onClick={async() => {
                                                await dispatch(deleteBookingThunk(booking.id))
                                                dispatch(getUserBookings())
                                            }}
                                        >Delete</button>
                                    </div>
                                )}


                            </div>




                        )
                    }

                    )}

                </div>

 


            </div>
        </>

    )



    )
}