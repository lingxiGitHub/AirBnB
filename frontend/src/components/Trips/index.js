import "./Trips.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../store/booking";
import EditBooking from "../EditBooking"
import OpenModalButton from "../OpenModalButton";

function changeDateFormat(dateStr) {
    const date = new Date(dateStr)
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
                        // console.log("determine", new Date(booking.endDate) > today)
                        // console.log("today", today)
                        // console.log("end date", new Date(booking.endDate))
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
                        // console.log("upcomming",changeDateFormat(booking.endDate)>today)
                        // console.log("today",today)
                        // console.log("end date", changeDateFormat( booking.endDate))
                        return (
                            <div>

                                {new Date(booking.endDate) > today && (
                                    <div className="upcoming single-booking">

                                        <img className="indi-booking-img" src={booking.Spot.previewImage} alt=""></img>
                                        <div>{booking.Spot.name}</div>
                                        <div>Hosted by {booking.Spot.Owner.firstName} {booking.Spot.Owner.lastName}</div>

                                        <div>{changeDateFormat(booking.startDate)} - {changeDateFormat(booking.endDate)}</div>
                                        <button>Edit</button>
                                        <button>Delete</button>

                                        <OpenModalButton
                                            buttonText="Edit Booking"
                                            modalComponent={<EditBooking bookingId={booking.id} />}
                                        />

                                    </div>
                                )}


                            </div>




                        )
                    }

                    )}

                </div>

                <div className="canceled-trips-section">
                    <h2>Canceled trips</h2>

                </div>


            </div>
        </>

    )



    )
}