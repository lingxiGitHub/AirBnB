import "./Trips.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteBookingThunk, getUserBookings } from "../../store/booking";
import EditBooking from "../EditBooking"
import OpenModalButton from "../OpenModalButton";
import TripCard from "./TripCard";



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

        <div className="trips-title">Trips</div>
            <div className="user-bookings">

                <div className="past-trip-section">
                    <h2>Where you've been</h2>
                    {allUserBooking.map(booking => {

                        return (

                            <div>

                                {new Date(booking.endDate) < today && (


                                    <TripCard
                                        booking={booking}
                                    />
                                )}


                            </div>
                        )
                    }

                    )}

                </div>

                <div>

                    <h2>Current trips</h2>
                    {allUserBooking.map(booking => {

                        // console.log("^^^^", booking)
                        return (
                            <div>

                                {new Date(booking.endDate) >= today && new Date(booking.startDate) <= today && (
                                    <TripCard
                                        booking={booking}
                                    />
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

                                {new Date(booking.startDate) > today && (
                                    <div className="upcoming single-booking">

                                        <TripCard
                                            booking={booking}
                                        />
                                        <OpenModalButton
                                            buttonText="Edit"
                                            modalComponent={<EditBooking booking={booking} />}
                                        />

                                        <button
                                            onClick={async () => {
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