import "./Booking.css"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllBookings, addBookingThunk } from "../../store/booking";
import { useHistory } from "react-router-dom";


export default function Booking({ spotId }) {
    const history = useHistory();
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const minDate=new Date()

    useEffect(async () => {
        await dispatch(getAllBookings(+spotId));
        setIsLoaded(true)
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBooking = {
            startDate,
            endDate
        }



        const data = await dispatch(addBookingThunk(newBooking, spotId))


        if (data && data.errors) setErrors(data.errors);
        

        history.push(`/spots/${spotId}`)



    }

    return (
        <>
            <form 
            className="booking-form"
              onSubmit={handleSubmit}
            >
                <ul className="red-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    <span>CHECK-IN</span>
                    <input
                        type="date"
                        placeholder="Add date"
                        value={startDate}
                        minDate={minDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    >

                    </input>
                </label>

                <label>
                    CHECKOUT </label>

                <input
                    type="date"
                    placeholder="Add date"
                    value={endDate}
                    minDate={minDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                >

                </input>


                <button type="submit">Check availability</button>

            </form>
        </>
    )
}