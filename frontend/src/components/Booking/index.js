import "./Booking.css"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings, addBookingThunk } from "../../store/booking";
import { useHistory } from "react-router-dom";


export default function Booking({ spotId }) {
    const history = useHistory();
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isLoaded, setIsLoaded] = useState(false);
    // const minDate = new Date()

    useEffect(() => {
        dispatch(getAllBookings(+spotId));
        setIsLoaded(true)
    }, [dispatch])



    const handleSubmit = (e) => {
        e.preventDefault();

        const newBooking = {
            startDate,
            endDate
        }



        dispatch(addBookingThunk(newBooking, spotId))
            // .catch(
            //     async (res) => {
            //         // console.log(res)
            //         const data = await res.json();
            //         if (data && data.errors) setErrors(data.errors);
            //     }
            // )
  





    }

    return (isLoaded && (

        <>
            <form
                className="booking-form"
                onSubmit={handleSubmit}
            >
                <ul className="red-errors">
                    {
                        
                        Object.values(errors).map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))
                    }
                </ul>
                <label>
                    <span>CHECK-IN</span>
                    <input
                        type="date"
                        placeholder="Add date"
                        value={startDate}
                        min={new Date().toISOString().split("T")[0]}
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
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                >

                </input>


                <button type="submit">Reserve</button>

            </form>
        </>
    )

    )
}