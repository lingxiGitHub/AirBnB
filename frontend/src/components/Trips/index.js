import "./Trips.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBookingThunk, getUserBookings } from "../../store/booking";
import { useModal } from "../../context/Modal";
import EditBooking from "../EditBooking";
import TripCard from "./TripCard";

export default function Trips() {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!sessionUser) return;
        dispatch(getUserBookings()).catch(() => null).then(() => setIsLoaded(true));
    }, [dispatch, sessionUser]);

    const allUserBookingObj = useSelector(state => state.bookings.user);
    const allUserBooking = allUserBookingObj ? Object.values(allUserBookingObj) : [];

    const today = new Date();
    const byStart = (a, b) => new Date(a.startDate) - new Date(b.startDate);
    const upcoming = allUserBooking.filter(b => new Date(b.startDate) > today).sort(byStart);
    const current = allUserBooking.filter(b => new Date(b.startDate) <= today && new Date(b.endDate) >= today);
    const past = allUserBooking.filter(b => new Date(b.endDate) < today).sort((a, b) => byStart(b, a));

    const cancel = async (booking) => {
        await dispatch(deleteBookingThunk(booking.id));
        dispatch(getUserBookings());
    };

    if (!sessionUser) {
        return (
            <main className="page trips-page">
                <h1 className="trips-title">Trips</h1>
                <p className="muted">Log in to see your trips.</p>
            </main>
        );
    }

    return (
        <main className="page trips-page">
            <h1 className="trips-title">Trips</h1>

            {isLoaded && upcoming.length === 0 && current.length === 0 && (
                <div className="no-trips">
                    <div className="no-trips-text">
                        <h2>No trips booked...yet!</h2>
                        <p className="muted">Time to dust off your bags and start planning your next adventure.</p>
                        <Link to="/" className="btn btn-outline">Start searching</Link>
                    </div>
                    <img
                        className="no-trips-img"
                        src="https://a0.muscache.com/im/pictures/d727f355-3f10-44b5-9750-d1efca2438fc.jpg?im_w=1200"
                        alt=""
                    />
                </div>
            )}

            {current.length > 0 && (
                <section className="trips-section">
                    <h2>Happening now</h2>
                    <div className="trips-grid trips-grid-large">
                        {current.map(booking => <TripCard key={booking.id} booking={booking} large />)}
                    </div>
                </section>
            )}

            {upcoming.length > 0 && (
                <section className="trips-section">
                    <h2>Upcoming reservations</h2>
                    <div className="trips-grid trips-grid-large">
                        {upcoming.map(booking => (
                            <TripCard key={booking.id} booking={booking} large>
                                <div className="trip-actions">
                                    <button
                                        className="btn btn-outline trip-action"
                                        onClick={() => setModalContent(<EditBooking booking={booking} />)}
                                    >
                                        Change dates
                                    </button>
                                    <button className="btn-link trip-action-link" onClick={() => cancel(booking)}>
                                        Cancel reservation
                                    </button>
                                </div>
                            </TripCard>
                        ))}
                    </div>
                </section>
            )}

            {past.length > 0 && (
                <section className="trips-section">
                    <h2>Where you've been</h2>
                    <div className="trips-grid">
                        {past.map(booking => <TripCard key={booking.id} booking={booking} />)}
                    </div>
                </section>
            )}
        </main>
    );
}
