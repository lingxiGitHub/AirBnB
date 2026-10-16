import "./Booking.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { getAllBookings, addBookingThunk } from "../../store/booking";
import { useModal } from '../../context/Modal';
import LoginFormModal from "../LoginFormModal";
import { formatPrice, formatRating, pluralize } from "../../utils/format";

// GMT+800 or GMT-600
const gmtStr = ` GMT${new Date("2030-01-02").toString().split("GMT")[1]}`;
const DAY_MS = 24 * 60 * 60 * 1000;
const todayStr = () => new Date().toISOString().split("T")[0];

export default function Booking({ spotId, singleSpot, isOwner }) {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [booked, setBooked] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (sessionUser) dispatch(getAllBookings(+spotId));
    }, [dispatch, spotId, sessionUser]);

    const nights = startDate && endDate
        ? Math.round((new Date(endDate) - new Date(startDate)) / DAY_MS)
        : 0;
    const total = nights > 0 ? nights * singleSpot.price : 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!sessionUser) return setModalContent(<LoginFormModal />);
        if (nights <= 0) return setErrors(["Checkout must be after check-in"]);

        setErrors([]);
        setSubmitting(true);
        dispatch(addBookingThunk({ startDate: startDate + gmtStr, endDate: endDate + gmtStr }, spotId))
            .then(() => setBooked(true))
            .catch(async (res) => {
                const data = res && res.json ? await res.json() : {};
                if (data && data.errors) setErrors(Object.values(data.errors));
            })
            .finally(() => setSubmitting(false));
    };

    if (isOwner) {
        return (
            <div className="booking-card">
                <div className="booking-price"><strong>{formatPrice(singleSpot.price)}</strong> night</div>
                <p className="booking-note">This is your listing. Guests will see a reservation form here.</p>
            </div>
        );
    }

    if (booked) {
        return (
            <div className="booking-card booking-success">
                <FiCheckCircle className="booking-success-icon" />
                <h3>You're going to {singleSpot.city}!</h3>
                <p className="muted">
                    {pluralize(nights, "night")} · {formatPrice(total)} total. Your host has been notified.
                </p>
                <Link to="/trips" className="btn btn-dark btn-block">View your trips</Link>
            </div>
        );
    }

    return (
        <div className="booking-card">
            <div className="booking-top">
                <div className="booking-price">
                    <strong>{formatPrice(singleSpot.price)}</strong> night
                </div>
                <div className="booking-rating">
                    <FaStar className="star-icon" /> {formatRating(singleSpot.avgStarRating)}
                    <span className="dot">·</span>
                    <span className="muted">{pluralize(singleSpot.numReviews, "review")}</span>
                </div>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
                <div className="date-box">
                    <label className="date-field">
                        <span className="date-label">Check-in</span>
                        <input
                            type="date"
                            value={startDate}
                            min={todayStr()}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                if (endDate && e.target.value >= endDate) setEndDate("");
                            }}
                            required
                        />
                    </label>
                    <label className="date-field">
                        <span className="date-label">Checkout</span>
                        <input
                            type="date"
                            value={endDate}
                            min={startDate || todayStr()}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </label>
                </div>

                {errors.length > 0 && (
                    <ul className="form-errors booking-errors">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                )}

                <button className="btn btn-primary btn-block reserve-button" type="submit" disabled={submitting}>
                    {sessionUser ? "Reserve" : "Log in to reserve"}
                </button>
            </form>

            <p className="booking-hint">You won't be charged yet</p>

            {nights > 0 && (
                <>
                    <div className="booking-line">
                        <u>{formatPrice(singleSpot.price)} x {pluralize(nights, "night")}</u>
                        <span>{formatPrice(total)}</span>
                    </div>
                    <hr className="divider" />
                    <div className="booking-line booking-total">
                        <span>Total before taxes</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </>
            )}
        </div>
    );
}
